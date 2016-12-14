'use strict';

define(['angular', "patient-search-directive", "EMD.PatientSearchController"], function (angular, PatienSearchDirective, PatientSearchController) {
        var patientSearchModule = angular.module('EMD.PatientSearch', []);
        patientSearchModule.directive('patientsearch', PatienSearchDirective);
        patientSearchModule.controller('EMD.PatientSearchController', PatientSearchController);
        return patientSearchModule;
    });
