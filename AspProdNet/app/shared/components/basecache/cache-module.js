'use strict';

define(['angular', 'cache-factory', 'shared-util'], function (angular, CacheFactory, Utility) {
    var cacheModule = angular.module('BaseCache', []);
    cacheModule.factory('CacheFactory', CacheFactory);
    cacheModule.service('Utility', Utility);
    return cacheModule;
});