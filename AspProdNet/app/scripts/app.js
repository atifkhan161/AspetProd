'use strict';

define(
    [
    'angular',
    'angularAMD',
    'spinner-directive',
    'whenscrollbottom-directive',
    'shared-util',
    'msg-constant',
    'app-constant',
    'app-url-constant',
    'jq-grid-directive',
    "spinner-directive",
    'angular-ui-router',
    'ui-bootstrap-tpls',
    'angular-messages',
    'angular-resource',
    'angular-sanitize',
    'angular-animate',
    'angular-toastr-tpls',
    'infinite-scroll',
    'toastrmessages-module',
    'bootstrap',
    'angular-loading-bar',
    'angular-colorpicker',
    'angular-permission',
    'storage-module',
    "odataquerybuilder-module",
    "cache-module",
    "test-module",
    "request-module",
    "authorization-module",
    "auth-module",
    "dashboard-module",
    "maint-module",
    'angular-mask'
    ],

    function (angular,
        angularAMD,
        SpinnerDirective,
        WhenScrollDirective,
        Utility,
        MessageConstant,
        AppConstant,
        AppURLConstant,
        JqGridDirective,
        BlockSpinnerDirective) {

        var app = angular.module("AppName", [
           'ui.router',
           'permission',
           'ui.bootstrap',
           'ngMessages',
           'ngResource',
           'ngSanitize',
            'toastr',
            'infinite-scroll',
            'angular-loading-bar',
            'colorpicker.module',
            'EMD.ToastrMessage',
            'oDataQuery',
            'BaseCache',
            'BaseStorage',
            'BaseRequest',
            'EMD.Authorization',
            'EMD.Auth',
            'EMD.Test',
            'EMD.Dashboard',
            'EMD.Maintainance',
            'ngMask',
            'ngAnimate'
        ]);

        app.controller('AppContrl', ['$scope', 'EMD.Test.TestFactory', 'EMD.Authorization.AuthorizationFactory', function ($scope, TestFactory, AuthorizationFactory) {
            $scope.displayMsg = TestFactory.functionFromFactory();

            var authRole = AuthorizationFactory.setAllPermission();
        }]);
        app.run(['$rootScope', function ($rootScope) {
            $rootScope._ = _;
        }]);
        app.service('EMD.Utility', Utility);

        app.constant("URLS", AppURLConstant);

        app.constant("EMD.AppConstant", AppConstant);

        app.directive('blockSpinner', BlockSpinnerDirective);

        app.directive('ngJqgrid', JqGridDirective);

        return angularAMD.bootstrap(app);
    });