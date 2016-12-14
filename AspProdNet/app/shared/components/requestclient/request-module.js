'use strict';

define([
    'angular',
    'request-service',
    'base-model',
    'status-code',
    'request-interceptor',
    'request-context',
    'shared-util',
    'cache-module',
    'angular-resource',
    'angular-bluebird'    
    ],function (angular, RequestService, BaseFactory, StatusCode, AuthInterceptor, RequestContext, Utility) {

        var requestModule = angular.module('BaseRequest', ['mwl.bluebird', 'BaseCache']);

        requestModule.factory('BaseFactory', BaseFactory);
        requestModule.factory('RequestContext', RequestContext);
        requestModule.service('RequestService', RequestService);
        requestModule.factory('AuthInterceptor', AuthInterceptor);
        requestModule.factory('StatusCode', StatusCode);
        requestModule.config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
        }]);
        return requestModule;
    });

