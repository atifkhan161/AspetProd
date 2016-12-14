'use strict';

define(['angular',
    'auth-factory'
], function (angular, AuthFactory) {
    var authModule = angular.module('EMD.Auth', []);
    authModule.factory('EMD.Auth.AuthFactory', AuthFactory);

    return authModule;
});

