'use strict';

define(['moment', 'jspdf', 'jspdfautotable'], function (moment, jspdf, jspdfAutotable) {
    var SharedUtilityService = function (OdataQueryBuilder, StorageFactory) {
        this.getUrlParameter = function getUrlParameter(param, url) {
            var sPageURL = url.substring(1),
                sURLVariables = sPageURL.split(/[&||?]/),
                res;

            for (var i = 0; i < sURLVariables.length; i += 1) {
                var paramName = sURLVariables[i],
                    sParameterName = (paramName || '').split('=');

                if (sParameterName[0] === param) {
                    res = sParameterName[1];
                }
            }
            return res;
        }

        this.format = function (template, values) {
            if (!values || !values.length || !template) {
                return template;
            }
            return toFormattedString(false, template, values);
        };

        var toFormattedString = function (useLocale, format, values) {
            var result = '';

            for (var i = 0; ;) {
                // Find the next opening or closing brace
                var open = format.indexOf('{', i);
                var close = format.indexOf('}', i);
                if ((open < 0) && (close < 0)) {
                    // Not found: copy the end of the string and break
                    result += format.slice(i);
                    break;
                }
                if ((close > 0) && ((close < open) || (open < 0))) {

                    if (format.charAt(close + 1) !== '}') {
                        throw new Error('format stringFormatBraceMismatch');
                    }

                    result += format.slice(i, close + 1);
                    i = close + 2;
                    continue;
                }

                // Copy the string before the brace
                result += format.slice(i, open);
                i = open + 1;

                // Check for double braces (which display as one and are not arguments)
                if (format.charAt(i) === '{') {
                    result += '{';
                    i++;
                    continue;
                }

                if (close < 0) throw new Error('format stringFormatBraceMismatch');

                // Find the closing brace

                // Get the string between the braces, and split it around the ':' (if any)
                var brace = format.substring(i, close);
                var colonIndex = brace.indexOf(':');
                var argNumber = parseInt((colonIndex < 0) ? brace : brace.substring(0, colonIndex), 10);

                if (isNaN(argNumber)) throw new Error('format stringFormatInvalid');

                var argFormat = (colonIndex < 0) ? '' : brace.substring(colonIndex + 1);

                var arg = values[argNumber];
                if (typeof (arg) === "undefined" || arg === null) {
                    arg = '';
                }

                // If it has a toFormattedString method, call it.  Otherwise, call toString()
                if (arg.toFormattedString) {
                    result += arg.toFormattedString(argFormat);
                } else if (useLocale && arg.localeFormat) {
                    result += arg.localeFormat(argFormat);
                } else if (arg.format) {
                    result += arg.format(argFormat);
                } else
                    result += arg.toString();

                i = close + 1;
            }

            return result;
        };

        var _emitXmlHeader = function (testTypes) {
            var headerRow = '<ss:Row ss:StyleID="s1">\n';
            for (var colName in testTypes) {
                headerRow += '  <ss:Cell>\n';
                headerRow += '    <ss:Data ss:Type="String">';
                headerRow += colName + '</ss:Data>\n';
                headerRow += '  </ss:Cell>\n';
            }
            headerRow += '</ss:Row>\n';
            return '<?xml version="1.0"?>\n' +
            '<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n' +
                '<ss:Styles>\n' +
                    '<ss:Style ss:ID="s1">\n' +
                        '<ss:Font ss:Bold="1" ss:Color="white"/>' +
                        '<ss:Interior ss:Color="#000000" ss:Pattern="Solid"/>' +
                    '</ss:Style>\n' +
                   '</ss:Styles>\n' +
            '<ss:Worksheet ss:Name="Sheet1">\n' +
            '<ss:Table>\n\n' + headerRow;
        };

        var _emitXmlFooter = function () {
            return '\n</ss:Table>\n' +
                   '</ss:Worksheet>\n' +
                   '</ss:Workbook>\n';
        };

        var _jsonToSsXml = function (jsonObject) {
            var row;
            var col;
            var xml;
            var data = typeof jsonObject != "object" ? JSON.parse(jsonObject) : jsonObject;

            xml = _emitXmlHeader(jsonObject[0]);

            for (row = 0; row < data.length; row++) {
                xml += '<ss:Row>\n';

                for (col in data[row]) {
                    xml += '  <ss:Cell>\n';
                    xml += '    <ss:Data ss:Type="String">';
                    xml += data[row][col] + '</ss:Data>\n';
                    xml += '  </ss:Cell>\n';
                }

                xml += '</ss:Row>\n';
            }

            xml += _emitXmlFooter();
            return xml;
        };

        var _download = function (content, filename, contentType) {
            //Get IE and its version
            var ie = navigator.userAgent.match(/MSIE\s([\d.]+)/),
            ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/),
            ieEDGE = navigator.userAgent.match(/Edge/g),
            ieVer = (ie ? ie[1] : (ie11 ? 11 : (ieEDGE ? 12 : -1)));
            if (ie && ieVer < 10) {
                console.log("No blobs on IE ver<10");
                return;
            }

            if (!contentType) contentType = 'application/octet-stream';
            var blob = new Blob([content], {
                'type': contentType
            });
            //Check if browser is IE
            if (ieVer > -1) {
                window.navigator.msSaveBlob(blob, filename);
            }
            else {
                //else all browser support this code
                var a = document.createElement("a");
                a.href = window.URL.createObjectURL(blob);
                a.download = filename;
                //this part will append the anchor tag and remove it after automatic click
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        };


        /**
        * Provides subset of array according to provided inputs, if original array did not have items more that itemCount it returns 
        * whatever it have.
        * @param {Array} data - source array
        * @param {Number} startIndex - start index for array subset
        * @param {Number} itemCount - item numbers needed for subset
        * @return {Array} subset
        */
        this.arraySubSet = function (data, startIndex, itemCount) {
            var tempLast = _.last(data, (data.length - startIndex));
            return _.first(tempLast, itemCount);
        };


        this.getWeekHours = function (startTime, endTime, step) {
            var collection = [];
            var dt = new Date();
            var currentMinutes = 0;
            var d = new Date(dt.getFullYear(), dt.getMonth(), dt.getDay(), startTime, currentMinutes, 0);
            while (d.getHours() < endTime) {
                d = new Date(dt.getFullYear(), dt.getMonth(), dt.getDay(), startTime, currentMinutes, 0);
                var minutes = d.getMinutes() === 0 ? "00" : d.getMinutes();
                var hours = d.getHours();
                if (hours < 12) {
                    collection.push(hours + ":" + minutes + "am");
                } else if (hours === 12) {
                    collection.push(hours + ":" + minutes + "pm");
                } else {
                    var currenthours = hours - 12;
                    collection.push(currenthours + ":" + minutes + "pm");
                }
                currentMinutes += step;
            }
            return collection;
        };

        //convert UTC dateTime 
        this.getUtcDateTime = function (date, time) {
            date = moment(date).format('YYYY-MM-DD');
            time = moment(time, ["h:mm A"]).format("HH:mm:ss");
            var dateTime = moment(date + " " + time).utc().format();
            return dateTime;
        },
        //convert browser dateTime 
        this.getDateTime = function (date, time) {
            date = moment(date).format('YYYY-MM-DD');
            time = moment(time, ["h:mm A"]).format("HH:mm:ss");
            var dateTime = moment(date + " " + time).format();
            return dateTime;
        },


        /*
         * provides moment date object 
         * @param {Integer} date
         * @param {Integer} month
         * @param {Integer} year
         * @returns {Object} data object
         */
        this.getDateObject = function (date, month, year) {
            var dt = moment();
            dt.date(date);
            dt.month(month);
            dt.year(year);
            return dt;
        },

        /*
             * provides odata query object array with or clause for provided key name in sets
             * @param {Array} dataSet
             * @param {String} key - filter key name
             * @param {Integer} set item number count
             */
        this.getOdataOrQuerySet = function (dataSet, key, setItemCount) {

            var querySet = [];

            // splitting data set array into subset according to item count
            var dataSetList = _.groupBy(dataSet, function (item, index) {
                return Math.floor(index / setItemCount);
            });

            // iterating over dataSetList
            _.each(dataSetList, function (listItem) {

                var query = new OdataQueryBuilder();
                _.each(listItem, function (item, index) {
                    var clause = new OdataQueryBuilder.FilterClause(key);
                    if (index === 0) {
                        query = query.filter(clause.eq(item));
                    } else {
                        query.orFilter(clause.eq(item));
                    }
                });
                querySet.push(query);
            });

            return querySet;
        };

        /*
         * provides array objects matching with provided property
         * @param {Array} collection array
         * @param {String} id
         * @param {Array} collection values
         * @returns {Array} array of filtered object
         */
        this.findByValues = function (collection, property, values) {
            return _.filter(collection, function (item) {
                return _.contains(values, item[property]);
            });
        },

        /**
         * provides sum of all integer values of array
         * @params {Array} integer array
         * @returns {Ingeger} sum of array elements
         */
        this.getSum = function (integerArray) {
            return _.reduce(integerArray, function (memo, num) {
                return memo + num;
            }, 0);
        },

        /**
         * provides text and object of inpute element 
         * @params {String}, {Object}HTML element object
         */
         this.insertText = function (text, input) {
             if (input == undefined) {
                 return;
             }
             var scrollPos = input.scrollTop;
             var pos = 0;
             var browser = ((input.selectionStart || input.selectionStart == "0") ?
                            "ff" : (document.selection ? "ie" : false));
             if (browser == "ie") {
                 input.focus();
                 var range = document.selection.createRange();
                 range.moveStart("character", -input.value.length);
                 pos = range.text.length;
             }
             else if (browser == "ff") { pos = input.selectionStart };

             var front = (input.value).substring(0, pos);
             var back = (input.value).substring(pos, input.value.length);
             input.value = front + text + back;
             pos = pos + text.length;
             if (browser == "ie") {
                 input.focus();
                 var range = document.selection.createRange();
                 range.moveStart("character", -input.value.length);
                 range.moveStart("character", pos);
                 range.moveEnd("character", 0);
                 range.select();
             }
         },
        //Opens url To new Tab 
        this.gotoUrl = function (url) {
            window.open(url, '_blank');
        },
        //Replace practiceId from Url
        this.replacePresentationUrl = function (url) {
            return this.format(url, [JSON.parse(StorageFactory.get("Presentation")).Id]);
        }
        this.gotoPresentationUrl = function (url) {
            this.gotoUrl(this.replacePresentationUrl(url));
        },
        this.gotoPatientUrl = function (url, patientId) {
            var presentationUrl = this.format(url, [JSON.parse(StorageFactory.get("Presentation")).Id, patientId]);
            this.gotoUrl(presentationUrl);
        }
        /*
         * provides a recurrance pattern string 
         * @param {Object} of Recurrance
         * @returns {string}
         */
        this.getRecurrencePatternString = function (recurrObj) {

            if (recurrObj.RecurrencePattern.indexOf('Year') > -1) {
                return this.format('{0} {1} {2} (s)', ["Every", recurrObj.RecurrenceFrequency, "Year"]);
            } else if (recurrObj.RecurrencePattern.indexOf('Month') > -1) {
                return this.format('{0} {1} {2} (s)', ["Every", recurrObj.RecurrenceFrequency, "Month"]);
            } else if (recurrObj.RecurrencePattern.indexOf('Week') > -1) {
                return this.format('{0} {1} {2} (s)', ["Every", recurrObj.RecurrenceFrequency, "Week"]);
            } else {
                return this.format('{0} {1} {2} (s)', ["Every", recurrObj.RecurrenceFrequency, "Day"]);
            }
        }

        /*
         * provides a recurrance pattern string 
         * @param {Object} of Recurrance
         * @returns {string}
         */
        this.getRecurrencePatternStringForRunReport = function (recurrObj) {

            if (recurrObj.RecurrencePattern.indexOf('Year') > -1) {
                return this.format("{0} time(s) a {1}", [recurrObj.RecurrenceFrequency, "Year"]);
            } else if (recurrObj.RecurrencePattern.indexOf('Month') > -1) {
                return this.format("{0} time(s) a {1}", [recurrObj.RecurrenceFrequency, "Month"]);
            } else if (recurrObj.RecurrencePattern.indexOf('Week') > -1) {
                return this.format("{0} time(s) a {1}", [recurrObj.RecurrenceFrequency, "Week"]);
            } else {
                return this.format("{0} time(s) a {1}", [recurrObj.RecurrenceFrequency, "Day"]);
            }
        }

        /*Provide collection of all value that increment by particular difference 
         * @params {start} start value
         * @params {end} end value
         * @params {diff} difference
          */
        this.hoursOption = function (start, end, diff) {
            var collection = [];
            var id = 0;
            while (start < end) {
                var obj = {};
                id = id + 1;
                start = start + diff;
                obj.Id = id;
                obj.value = start.toFixed(2);
                collection.push(obj);
            }
            return collection;

        }


        this.filterByValue = function (collection, value, key) {
            var resultCollection = _.find(collection, function (item) {
                return item[key] == value;
            });
            return resultCollection;
        }

        this.getValueFromFilter = function (byValue, value, collection, name) {
            var resultValue = _.pluck(_.filter(collection, function (res) {
                return res[byValue] == value
            }), name);
            return resultValue;
        };

        this.getGroupBy = function (collection, n) {
            var tempCollection = _.groupBy(collection, function (element, index) {
                return Math.floor(index / n);
            });
            return tempCollection;
        }

        this.replaceKeys = function (text, objToReplace) {
            var keys = _.keys(objToReplace);
            var url = text;
            _.each(keys, function (key) {
                var regExp = new RegExp(":" + key)
                text = text.replace(regExp, objToReplace[key]);
            }, this);
            return text;
        };
        /*
        * Calculate Percent
        * @param: "first" is divident
        * @param: "last" is diviser
        */
        this.calculatePercent = function (first, last) {
            return first > 0 ? (last / first) * 100 : 0;
        };

        // Return median of the elements 
        // if the object element number is odd the median is the 
        // object in the "middle" of a sorted array
        // in case of an even number, the arithmetic mean of the two elements
        // in the middle (in case of characters or strings: obj[n/2-1] ) is returned.
        // if an iterator function is provided, it is applied before
        this.getMedian = function (obj, iterator, context) {
            if (_.isEmpty(obj)) return Infinity;
            var tmpObj = [];
            if (!iterator && _.isArray(obj)) {
                tmpObj = _.clone(obj);
                tmpObj.sort(function (f, s) { return f - s; });
            } else {
                _.isArray(obj) && each(obj, function (value, index, list) {
                    tmpObj.push(iterator ? iterator.call(context, value, index, list) : value);
                    tmpObj.sort();
                });
            };
            return tmpObj.length % 2 ? tmpObj[Math.floor(tmpObj.length / 2)] : (_.isNumber(tmpObj[tmpObj.length / 2 - 1]) && _.isNumber(tmpObj[tmpObj.length / 2])) ? (tmpObj[tmpObj.length / 2 - 1] + tmpObj[tmpObj.length / 2]) / 2 : tmpObj[tmpObj.length / 2 - 1];
        }




        this.downloadAsFile = function (data, type, filename) {

            var blob = new Blob([data[0]], { type: type });
            if (window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveBlob(blob, filename);
            }
            else {
                var elem = window.document.createElement('a');
                elem.href = window.URL.createObjectURL(blob);
                elem.download = filename;
                document.body.appendChild(elem)
                elem.click();
                document.body.removeChild(elem);

                //TODO: To open in new TAb
                //var reader = new FileReader();
                //reader.addEventListener("load", function () {
                //    window.open(reader.result,'pdf');
                //}, false);
                //reader.readAsDataURL(blob);
            }
        }

        /*
       * Convert JSON To CSV
       */
        this.convertJSONToCSV = function (JSONData, ReportTitle, ShowLabel) {

            //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
            var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

            var CSV = '';

            //Set Report title in first row or line
            CSV += ReportTitle + '\r\n\n';

            //This condition will generate the Label/Header
            if (ShowLabel) {
                var row = "";

                //This loop will extract the label from 1st index of on array
                for (var index in arrData[0]) {

                    //Now convert each value to string and comma-seprated
                    row += index + ',';
                }

                row = row.slice(0, -1);

                //append Label row with line break
                CSV += row + '\r\n';
            }

            //1st loop is to extract each row
            for (var i = 0; i < arrData.length; i++) {
                var row = "";

                //2nd loop will extract each column and convert it in string comma-seprated
                for (var index in arrData[i]) {
                    row += '"' + arrData[i][index] + '",';
                }

                row.slice(0, row.length - 1);

                //add a line break after each row
                CSV += row + '\r\n';
            }

            if (CSV == '') {
                alert("Invalid data");
                return;
            }

            //Generate a file name
            var fileName = "MyReport_";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += ReportTitle.replace(/ /g, "_");

            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

            // Now the little tricky part.
            // you can use either>> window.open(uri);
            // but this will not work in some browsers
            // or you will not get the correct file extension    

            //this trick will generate a temp <a /> tag
            var link = document.createElement("a");
            link.href = uri;

            //set the visibility hidden so it will not effect on your web-layout
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";

            //this part will append the anchor tag and remove it after automatic click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        this.sortByToLowerCase = function (collection, key) {
            var result = _.sortBy(collection, function (row) {
                return row[key].toLowerCase();
            });
            return result;
        }

        /*
        * Convert JSON To XLS
        * @param: "JSONData" is json array
        * @param: "filename" is filename will download
        */
        this.convertJSONToXLS = function (JSONData, fileName) {

            //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
            var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

            _download(_jsonToSsXml(arrData), fileName + '.xls', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        }

        this.convertJSONToPDF = function (table, title, fileName, fromDate, toDate) {
            var top = 0;
            var left = 0;
            var doc = new jsPDF('l', 'pt');
            var source = doc.autoTableHtmlToJson(table[0]);
            doc.autoTable(source.columns, source.data, {
                styles: {
                    fontSize: 12,
                    startY: 370,
                    overflow: 'linebreak',
                    overflowColumns: false,
                    tableWidth: 'auto'
                },
                columnStyles: {
                    id: { fillColor: 255 }

                },
                margin: { top: 60 },
                createdHeaderCell: function (cell, data) {
                    cell.styles.fontSize = 8;
                },
                beforePageContent: function (data) {
                    doc.setFontType("bold");

                    doc.setFontSize(12);
                    top = 30;
                    left = 350;
                    doc.text(title, left, top);

                    doc.setFontSize(8);
                    top = 50;
                    left = 365;
                    doc.text(fromDate + " - " + toDate, left, top);

                    doc.setFontSize(10);
                    top = 30;
                    left = 640;
                    doc.text("Generated on: " + moment().format('YYYY-MM-DD') + " at " + moment().format('hh:mm A'), left, top);
                    doc.setFontType("normal");
                },
                pageBreak: 'auto', // 'auto', 'avoid' or 'always'
            });



            doc.save(fileName + '.pdf');
        }

        this.htmlToPlaintext = function (text) {
            return text ? String(text).replace(/<[^>]+>/gm, '') : '';
        }

        this.omitNullValues = function (collection) {
            var result = _.omit(collection, function (value) {
                return _.isNull(value);
            });
            return result;
        }

        this.getUniqueList = function (collection, key) {
            var result = _.uniq(collection, function (value) {
                return value[key];
            });
            return result;
        },

        /*
         * provides alphabet array 
         * @param {Character} start character
         * @param {Character} end character
         * @returns {Array} alphabet array
         */
        this.getAlphabetArray = function (start, end) {
            var alphabetArray = [], i = start.charCodeAt(0), j = end.charCodeAt(0);
            for (; i <= j; ++i) {
                alphabetArray.push(String.fromCharCode(i));
            }
            return alphabetArray;
        };

        //Remove white spaces from string 
        this.trimString = function (str) {
            return str.replace(/\s+/g, " ").replace(/^\s|\s$/g, "");
        };

        //convert date format to yyyy-mm-dd.
        //Possible acceptable format mm-dd-yyyy or mm/dd/yyyy. Out pur format  yyyy-mm-dd
        this.getFormattedDOB = function (dob) {
            var year;
            var month;
            var day;
            var formatedDOB;
            var dobArr = [];
            dobArr = dob.split("/");
            if (dobArr.length < 3) {
                dobArr = dob.split("-");
                if (dobArr.length < 3) {
                    return dob.replace("/", "-");
                }
            }

            month = dobArr[0];
            day = dobArr[1];
            year = dobArr[2];

            formatedDOB = year + "-" + month + "-" + day;

            return formatedDOB;
        };
    }
    return ['oDataQueryBuilder',
        'StorageFactory',
        SharedUtilityService]
})