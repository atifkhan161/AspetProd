'use strict';

define(['angular', "EMD.Error.ErrorController"], function (angular, ErrorController) {
        var errorModule = angular.module('EMD.Error', []);

        errorModule.config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider

                 .state('Error', {
                     url: '/Error',
                     templateUrl: 'shared/components/Error/views/error.html',
                     controller: 'EMD.Error.ErrorController',
                     params: { 'statusCode' : null, 'statusMessage' : null },
                 });
            }]);

        errorModule.controller('EMD.Error.ErrorController', ErrorController);
        return errorModule;
    });
