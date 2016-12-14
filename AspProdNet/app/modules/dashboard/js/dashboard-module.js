/// <reference path="../views/dashboard.html" />
'use strict';

define(['angular'
], function (angular) {
    var DashModule = angular.module('EMD.Dashboard', []);

    DashModule.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'cfpLoadingBarProvider', '$provide',
       function ($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider, $provide) {
           //Location for href update
           // $locationProvider.hashPrefix('!');

           // For any unmatched url, redirect to /state1
           $urlRouterProvider.otherwise(function ($injector) {
               var $state = $injector.get("$state");
               $state.go("dashboard");
           });

           $stateProvider
             .state('dashboard', {
                 url: '/dashboard',
                 templateUrl: 'modules/dashboard/views/dashboard.html'
             })
           .state('master', {
               url: '/master',
               templateUrl: 'modules/shared/views/master-form-template.html'
           })
           .state('master.dailyQuality', {
               url: '/dailyQuality',
               templateUrl: 'modules/maintainance/daily-quality/views/daily-quality-complaint.html',
               controller: "EMD.Maintainance.DailyQualityController"
           })           
           .state('master.dailymaint', {
               url: '/dailymaint',
               templateUrl: 'modules/maintainance/daily-maint/views/maintenance-checklist-daily.html',
               //controller: "EMD.Maintainance.DailyQualityController"
           })
           .state('master.weeklymaint', {
               url: '/weeklymaint',
               templateUrl: 'modules/maintainance/weekly-maint/views/preventive-maintenance-wk.html',
               // controller: "EMD.Maintainance.DailyQualityController"
           })
            .state('master.schedrecordcalibration', {
                url: '/schedrecordcalibration',
                templateUrl: 'modules/maintainance/sched-record-calibration/views/sched-record-calibration.html',
                controller: "EMD.Maintainance.SchedRecordCalibrationController"
            })
           .state('master.dailypersonalhygeinereport', {
               url: '/dailypersonalhygeinereport',
               templateUrl: 'modules/maintainance/daily-personal-hygeine-report/views/daily-personal-hygiene.html',
               controller: "EMD.Maintainance.dailyPersonalHygieneController"
           })
           .state('master.rodentcontrolreport', {
               url: '/rodentcontrolreport',
               templateUrl: 'modules/maintainance/rodent-control-report/views/rodent-control-report.html',
               controller: "EMD.Maintainance.rodentcontrolreportController"
           })
           //Excluding Loading BAr
           cfpLoadingBarProvider.includeBar = false;

       }]);

    return DashModule;
});

