'use strict';

define([], function () {
    var BaseStorage = function ($window) {
        return {
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key) {
                var value = $window.localStorage[key] || '';
                return value;
            },
            clear: function () {
                $window.localStorage.clear();
            }
        }
    }
    return ['$window', BaseStorage]
});
