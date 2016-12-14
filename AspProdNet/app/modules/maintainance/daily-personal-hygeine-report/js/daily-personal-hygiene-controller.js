'use strict';

define([], function () {
    var dailyPersonalHygieneController = function ($scope, $rootScope) {

        $rootScope.$broadcast("loading-started");

        $scope.patientdata = [];
        $scope.gridapi = {};

        $scope.config = {
            colNames: ['Name the Personnel', 'Clean Clothes & Body', 'Hair Beard', 'Nails', 'Cuts & Wounds', 'Coughing & Sneezing', 'Perfume & Jewellery', 'Date-Time'],
            colModel: [
                { name: 'name', index: 'name', width: 200 },
                { name: 'cleanClothes', index: 'cleanClothes', width: 150 },
                { name: 'hair', index: 'hair', width: 120 },
                { name: 'nails', index: 'nails', width: 90 },
                { name: 'cuts', index: 'cuts', width: 150 },
                { name: 'cough', index: 'cough', width: 150 },
                { name: 'perfume', index: 'perfume', width: 150 },
                { name: 'wDateTime', index: 'wDateTime', formatter: 'date', formatoptions: { srcformat: "ISO8601Long", newformat: "m/d/Y h:i A" }, width: 200 }
            ],
            caption: "Daily Personal Hygiene Report",
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
        dailyPersonalHygieneController];
});