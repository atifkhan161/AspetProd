'use strict';

define([], function () {

    var CacheFactory = function ($cacheFactory, Utility) {
        var cache = $cacheFactory('EMDCache');
        return {
            set: function (key, value) {
                cache.put(key, value);
            },
            get: function (key) {
                var value = cache.get(key) || '{}';                
                return JSON.parse(value);
            },
            getCache : function() {
                return cache;
            },
            getCollection: function (requestContext) {
                var cacheUrl = requestContext.collectionUrl;
                cacheUrl = Utility.replaceKeys(cacheUrl, requestContext.requestParams);
                return cache.get(cacheUrl);                
            },
            resolve: function (requestContext) {
                var cacheUrl = requestContext.collectionUrl;
                cacheUrl = Utility.replaceKeys(cacheUrl, requestContext.requestParams);
                var cacheResponse = cache.get(cacheUrl);

                //conditions for checking if cache was available or not
                if (!_.isArray(cacheResponse)) {
                    return;
                }

                if (!cacheResponse[1]) {
                    return;
                }

                var data = JSON.parse(cacheResponse[1])
                var searchKey = requestContext.cacheFilter.searchKey; 
                var searchValue = requestContext.cacheFilter.searchValue;
                var cachedData;

                if (!searchKey || !searchValue) { // if no key found return the collection
                    cachedData = data;
                    return cachedData;
                }

                cachedData = _.find(data, function (item) {
                    return item[searchKey] == searchValue;
                });
                return cachedData;
            },
            remove: function (key) {
                return cache.remove(key);
            },
            removeAll: function () {
                return cache.removeAll();
            }

        }
    }

    return ['$cacheFactory', 'Utility', CacheFactory];
});


