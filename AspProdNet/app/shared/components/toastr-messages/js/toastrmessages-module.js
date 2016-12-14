'use strict';

define([
    'angular',
    'toastrmessages-factory'
], function (
    angular,
    MessageFactory
    ) {
    var toastrMessageModule = angular.module('EMD.ToastrMessage', []);
    toastrMessageModule.factory('EMD.ToastrMessage.ToastrMessageFactory', MessageFactory);
    return toastrMessageModule;
});
    
    