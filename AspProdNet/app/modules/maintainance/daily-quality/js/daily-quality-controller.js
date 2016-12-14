'use strict';

define([], function () {
    var DailyQualityController = function ($scope, $rootScope) {

        $rootScope.$broadcast("loading-started");

        $scope.patientdata = [];
        $scope.gridapi = {};

        $scope.config = {
            colNames: ['wColorId', 'Color Shade', 'Truck No', 'Date-Time'],
            colModel: [
                { name: 'wColorId', index: 'wColorId', hidden: true },
                { name: 'ColorShade', index: 'ColorShade', width: 100 },
                { name: 'TruckNo', index: 'TruckNo', width: 90 },
                { name: 'wDateTime', index: 'wDateTime', formatter: 'date', formatoptions: { srcformat: "ISO8601Long", newformat: "d/m/Y h:i A" } }
            ],
            caption: "Color",
            ondblClickRow: function (rowId) {
                var rowData = jQuery(this).getRowData(rowId);
                $scope.onDbClick(rowData);
            }
        };

        var modeldata = [{ wColorId: "1", ColorShade: "0", TruckNo: "7888", wDateTime: "28/11/2015 12:31 PM" }];

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
        DailyQualityController];
});