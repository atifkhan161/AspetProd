/// <reference path="../views/dashboard.html" />
'use strict';

define(['angular',
    "daily-quality-controller", "sched-record-calibration-controller", "rodent-control-report-controller", "daily-personal-hygiene-controller"
], function (angular, DailyQualityController, SchedRecordCalibrationController, rodentcontrolreportController, dailyPersonalHygieneController) {
    var MaintModule = angular.module('EMD.Maintainance', []);
    //MaintModule.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'cfpLoadingBarProvider', '$provide',
    //   function ($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider, $provide) {
    //       //Location for href update
    //       // $locationProvider.hashPrefix('!');

    //       // For any unmatched url, redirect to /state1
    //       $urlRouterProvider.otherwise(function ($injector) {
    //           var $state = $injector.get("$state");
    //           $state.go("dashboard");
    //       });

    //       $stateProvider            
    //       .state('master', {
    //           templateUrl: 'modules/shared/views/master-form-template.html'
    //       })
    //       .state('master.dailyQuality', {
    //           url: '/dailyQuality',
    //           templateUrl: 'modules/maintainance/daily-quality/views/daily-quality-complaint.html',
    //           parent: 'master'
    //       })


    //   }]);
    MaintModule.controller("EMD.Maintainance.DailyQualityController", DailyQualityController);
    MaintModule.controller("EMD.Maintainance.SchedRecordCalibrationController", SchedRecordCalibrationController);
    MaintModule.controller("EMD.Maintainance.rodentcontrolreportController", rodentcontrolreportController);
    MaintModule.controller("EMD.Maintainance.dailyPersonalHygieneController", dailyPersonalHygieneController);

    return MaintModule;
});

