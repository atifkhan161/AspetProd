'use strict';

define(['angular', 'base-storage'], function (angular, BaseStorage) {
    var storageModule = angular.module('BaseStorage', []);
    storageModule.factory('StorageFactory', BaseStorage);
    return storageModule;
});