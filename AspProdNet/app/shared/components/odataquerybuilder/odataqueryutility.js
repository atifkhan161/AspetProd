'use strict';

define([], function () {

      var OdataQueryUtility = function (OdataQueryBuilder) {
    
          return {

              /**
               * provides simple odata filter query with one filter
               * @param {String} filterField
               * @param {String} filterValue
               * @returns {Object} odata query
               */
              getFilterQuery: function (filterField, filterValue) {
                  var query = new OdataQueryBuilder();
                  var clause = new OdataQueryBuilder.FilterClause(filterField);
                  clause.eq(filterValue);
                  return query.filter(clause);
              },

              /**
               * provides simple odata equal filter clause with one filter
               * @param {String} filterField
               * @param {String} filterValue
               * @returns {Object} odata filter clause
               */
              getEqualFilterClause: function (filterField, filterValue) {
                  var clause = new OdataQueryBuilder.FilterClause(filterField);
                  clause.eq(filterValue);
                  return clause;
              }
          }
      }

    return [
        'oDataQueryBuilder',
        OdataQueryUtility
    ];
});