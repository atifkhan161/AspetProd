'use strict';

define([], function () {
    //Get the error code and message from Interceptor
    var ErrorController = function ($scope, $stateParams, $state) {
       
        $scope.statusCode=$stateParams.statusCode;
        $scope.statusMessage=$stateParams.statusMessage;
    };   
    return ['$scope', '$stateParams', '$state', ErrorController];
});