'use strict';

define(['angular',
    'test-factory',
    'test-model'
], function (angular, TestFactory, TestModel) {
    var testModule = angular.module('EMD.Test', []);
    testModule.factory('EMD.Test.TestFactory', TestFactory);
    testModule.factory('TestModelFact', TestModel);
    return testModule;
});

