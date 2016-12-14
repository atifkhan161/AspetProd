'use strict';

define([], function () {
    var rodentcontrolreportController = function ($scope, $rootScope) {

        $rootScope.$broadcast("loading-started");

        $scope.patientdata = [];
        $scope.gridapi = {};

        $scope.config = {
            colNames: ['Road Box no', 'Department/Location', 'No of Rats Trapped', 'Date-Time'],
            colModel: [                
                { name: 'RoadBoxno', index: 'RoadBoxno', width: 100 },
                //{ name: 'sShift', index: 'sShift', width: 90 },
                { name: 'Dept', index: 'Dept', width: 130 },
                { name: 'NoOfRts', index: 'NoOfRts', width: 120 },
                { name: 'wDateTime', index: 'wDateTime', formatter: 'date', formatoptions: { srcformat: "ISO8601Long", newformat: "m/d/Y h:i A" }, width: 100 }
            ],
            caption: "Rodent Control Log Book",
            ondblClickRow: function (rowId) {
                var rowData = jQuery(this).getRowData(rowId);
                $scope.onDbClick(rowData);
            }
        };

        var modeldata = [{}, {}];

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
        rodentcontrolreportController];
});