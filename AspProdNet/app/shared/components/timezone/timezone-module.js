'use strict';

define(['angular', 'moment','timezone-factory','timezone-filter'], function (angular, moment, Timezonefactory, Timezonefilter) {
    var timezoneModule = angular.module('timezone', []);
    timezoneModule.factory('timezonefactory', Timezonefactory);
    timezoneModule.filter('timezonefilter', Timezonefilter);
    return timezoneModule;
});