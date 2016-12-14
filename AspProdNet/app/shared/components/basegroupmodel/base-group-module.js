'use strict';

define(['angular', 'base-group-model'], function (angular, BaseGroupModel) {
    var baseGroupModule = angular.module('BaseGroup', []);
    baseGroupModule.factory('BaseGroupModel', BaseGroupModel);
    return baseGroupModule;
});