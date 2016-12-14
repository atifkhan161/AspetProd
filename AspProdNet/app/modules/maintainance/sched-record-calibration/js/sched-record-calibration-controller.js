'use strict';

define([], function () {
    var SchedRecordCalibrationController = function ($scope, $rootScope) {

        $rootScope.$broadcast("loading-started");

        $scope.patientdata = [];
        $scope.gridapi = {};

        $scope.config = {
            colNames: ['wQtyComplantId', 'M/C No', 'Product', 'Weight', 'Color', 'Troubles', 'Date-Time'],
            colModel: [
                { name: 'wQtyComplantId', index: 'wQtyComplantId', hidden: true },
                { name: 'wMCno', index: 'wMCno', width: 100 },
                //{ name: 'sShift', index: 'sShift', width: 90 },
                { name: 'Product', index: 'Product', width: 90 },
                { name: 'Weight', index: 'Weight', width: 90 },
                { name: 'color', index: 'color', width: 90 },
                { name: 'Troubles', index: 'Troubles', width: 150 },
                { name: 'wDateTime', index: 'wDateTime', formatter: 'date', formatoptions: { srcformat: "ISO8601Long", newformat: "m/d/Y h:i A" }, width: 200 }
            ],
            caption: "Schedule & Record of Calibration",
            ondblClickRow: function (rowId) {
                var rowData = jQuery(this).getRowData(rowId);
                $scope.onDbClick(rowData);
            }
        };

        var modeldata = [{ },{}];

        $scope.loadrecord = function () {
            $scope.gridapi.insert($scope.modeldata);
        }

        $scope.patientdata = modeldata;

        $scope.onDbClick = function (rowData) {
            console.log(rowData);
        }

        $rootScope.$broadcast("loading-complete");
    };

    return ['$scope',
        "$rootScope",
        SchedRecordCalibrationController];
});