'use strict';

define([], function () {

    var TestFactory = function ($q,
        $window,
        TestModel) {
        return {

            functionFromFactory: function () {
                var test = new TestModel();
                return test.getModelBaseUrl();
            }
        };
    }
    return ['$q',
        '$window',
        'TestModelFact',
        TestFactory];
});