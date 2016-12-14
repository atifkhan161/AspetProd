'use strict';

define(['datetime-util'], function () {
    var PatientSearchController = function ($scope, PatientSearchFactory,DateTimeUtility, EMDConstant) {
        $scope.patientList = [];
        $scope.status = "";
        $scope.searchShow = false;
        $scope.searchPatient=function () {

            if (_.isUndefined($scope.keywords) || _.isEmpty($scope.keywords) || $scope.disableInput) {
                $scope.patientList = [];
                $scope.searchShow = false;
                return;
            }
           
            $scope.bShowRows = true;
            $scope.searchShow = true;
            $scope.patientList = [];
            $scope.status = EMDConstant.fetchStatus.Loading;
            PatientSearchFactory.getPatients($scope.keywords).then(function (response) {
                if (response.length > 0) {                   
                    $scope.patientList = response;
                } else {
                    $scope.status = EMDConstant.fetchStatus.NotAvailable;
                }
            }).catch(function () {
                $scope.patientList = [];
                $scope.status = EMDConstant.fetchStatus.NotAvailable;
            });
            // callback needed during searchPatient
            if ($scope.searchCallback) {
                $scope.searchCallback();
            }
        };
        $scope.searchReset = function () {
            if (_.isUndefined($scope.keywords) || _.isEmpty($scope.keywords)) {
                $scope.patientList = [];
                $scope.searchShow = false;
            }
            return;
        };
        $scope.selectPatient = function (id, fName, lName) {
            $scope.searchShow = false;
            $scope.referralId = id;
            $scope.keywords = fName + " " + lName;
            if ($scope.patientCallback) {
                $scope.patientCallback({ patientId: id });
            }

        };
    };
    return ['$scope', 'EMD.Headerbar.PatientSearchFactory', 'EMD.DateTimeUtility', 'EMD.EMDConstant', PatientSearchController];
});