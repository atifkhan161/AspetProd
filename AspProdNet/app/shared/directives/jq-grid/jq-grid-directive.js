define(["jqGrid", "grid.locale-en"], function () {
    var JqGridDirective = function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                config: '=',
                modeldata: '=',
                insert: '=?',
                api: '=?',
                addnew: "="
            },
            link: function (scope, element, attrs) {
                var table, div;
                //Config options
                var gridConfig = {
                    datatype: "local",
                    colNames: [],
                    colModel: [],
                    multiselect: false,
                    rowNum: 20,
                    rowList: [20, 50, 100],
                    sortorder: "desc",
                    gridview: true,
                    rownumbers: true,
                    viewrecords: true,
                    height: 340,
                 //   width: 500,
                    caption: "Select",
                    ignoreCase: true,
                    beforeRequest: function () {
                        setTimeout(function () {
                            table.jqGrid('setGridWidth', element.parent().width() - 5, true);
                        });
                    }
                };


                scope.$watch('config', function (value) {

                    gridConfig = _.extend(gridConfig, value);

                    element.children().empty();
                    table = angular.element('<table id="' + attrs.gridid + '"></table>');
                    element.append(table);
                    if (attrs.pagerid) {
                        gridConfig.pager = '#' + attrs.pagerid;
                        var pager = angular.element(gridConfig.pager);
                        if (pager.length == 0) {
                            div = angular.element('<div id="' + attrs.pagerid + '"></div>');
                            element.append(div);
                        }
                    }
                    table.jqGrid(gridConfig);
                    //if (scope.addnew == true)
                    //{
                    table.jqGrid("inlineNav", '#' + attrs.pagerid, { addParams: { position: "last" } });
                    //}
                    // Variadic API – usage:
                    //   view:  <ng-jqgrid … vapi="apicall">
                    //   ctrl:  $scope.apicall('method', 'arg1', …);
                    scope.vapi = function () {
                        var args = Array.prototype.slice.call(arguments, 0);
                        return table.jqGrid.apply(table, args);
                    };
                    // allow to insert(), clear(), refresh() the grid from 
                    // outside (e.g. from a controller). Usage:
                    //   view:  <ng-jqgrid … api="gridapi">
                    //   ctrl:  $scope.gridapi.clear();
                    scope.api = {
                        insert: function (rows) {
                            if (rows) {
                                for (var i = 0; i < rows.length; i++) {
                                    scope.modeldata.push(rows[i]);
                                }
                                table.jqGrid('setGridParam', { data: scope.modeldata })
                                     .trigger('reloadGrid');
                            }
                        },
                        clear: function () {
                            scope.modeldata.length = 0;
                            table.jqGrid('clearGridData', { data: scope.modeldata })
                                .trigger('reloadGrid');
                        },
                        refresh: function () {
                            table
                                .jqGrid('clearGridData')
                                .jqGrid('setGridParam', { data: scope.modeldata })
                                .trigger('reloadGrid');
                        }
                    };
                });
                scope.$watch('modeldata', function (value) {
                    table.jqGrid('setGridParam', { data: value })
                         .trigger('reloadGrid');
                });
            }
        };
    };
    return [JqGridDirective];
});