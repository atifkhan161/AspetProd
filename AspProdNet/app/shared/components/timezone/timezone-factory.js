'use strict';
define(['moment'], function (moment) {
    var Timezoneutil = function () {
        var invalidDateMessage = "invalid date";
        var emptyDateMessage = "No Date Found";
        return {
            checkOffset: function () {
                //TODO : check zone object for offset
                return moment().utcOffset();
            },
            getCurrentTimestamp: function () {
                return moment.utc().valueOf();
            },
            getUtcTime: function () {
                return moment.utc().format();
            },
            getTimestamp: function (value) {
                return moment.utc(value).valueOf();
            },
            getTimeDiffrence: function (cDate) {

                if (_.isEmpty(cDate)) {
                    return emptyDateMessage;
                }

                if (!moment(cDate).isValid()) {
                    return invalidDateMessage;
                }

                var getoffset = this.checkOffset();
                var getmindatearray = moment(this.getTimestamp(cDate)).utcOffset(getoffset).toArray();
                var getmaxdatearray = moment(this.getCurrentTimestamp()).utcOffset(getoffset).toArray();
                var mindate = moment(getmindatearray);
                var maxdate = moment(getmaxdatearray);

                if (!mindate.diff(maxdate) >= 0) {
                    return maxdate.to(mindate);
                }

                return invalidDateMessage;
            },
            getTimeAndDateUseOffset: function (dateTime) {
                var getoffset = this.checkOffset();
                var timeAndDate = moment(this.getTimestamp(dateTime)).utcOffset(getoffset);
                return timeAndDate;
            }

        }

    }
    return [Timezoneutil];
});