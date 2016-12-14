'use strict';

define([
    'angular',
    'odataquerybuilder',
    'odataqueryutility'
], function (angular,
    odataquerybuilder,
    OdataQueryUtility) {

    var QueryBuilderModule = angular.module('oDataQuery', []);
    QueryBuilderModule.factory('oDataQueryBuilder', odataquerybuilder);
    QueryBuilderModule.factory('oDataQueryUtility', OdataQueryUtility);

    return QueryBuilderModule;
})

