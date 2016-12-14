'use strict';
define(['angular', "customcalendar-directive"], function (angular, CustomCalendarDirective) {
    var customCalendarModule = angular.module('EMD.CustomCalendar', []);
    customCalendarModule.directive('emdCustomCalendar', CustomCalendarDirective);
    return customCalendarModule;
});