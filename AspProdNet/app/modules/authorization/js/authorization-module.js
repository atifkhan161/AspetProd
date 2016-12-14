'use strict';

define(['angular', 'authorization-factory'], function (angular, AuthorizationFactory) {
    var authorizationModule = angular.module('EMD.Authorization', ['permission']);
    authorizationModule.factory('EMD.Authorization.AuthorizationFactory', AuthorizationFactory);
  
    return authorizationModule;
});