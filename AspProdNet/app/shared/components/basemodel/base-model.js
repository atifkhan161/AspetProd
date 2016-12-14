'use strict';

define(['request-context', 'request-service', 'base-storage', 'underscore', 'shared-util', 'odataquerybuilder'], function () {

    var BaseFactory = function ($q, RequestService, RequestContext, StorageFactory, Utility, OdataQueryBuilder) {

        function BaseFactory(storageObjectsArr) {
            //call the requestContext constructor as base constructor
            RequestContext.call(this);
            _defineStorageProperties.call(this, storageObjectsArr);

            /* holds odata filter query for url parameter */
            this.odataQuery = null;

            /* Contains parameters/fields required for infinite scroll feature for collection of any model */
            this.pagingParams = {
                clientPageItemSize: 20, //default
                serverPageItemSize: 60, //default
                clientPageCounter: 0, //do not update this manually, for internal use only
                serverPageCounter: 0, //do not update this manually, for internal use only
                dataArray: [],
                isRequesting: false,
                fullDataLoaded: false, //flag indicates that all data for particular request is loaded from server
                pageDataCallback: null, //callback should be assigned here,
                dataUrl: null,
                serverSidePaging: true,
            };
        }

        // inherit the methods
        BaseFactory.prototype = Object.create(RequestContext.prototype);

        /*
         * resets paging params by originalvalues
         */
        BaseFactory.prototype.resetPagingParams = function () {
            this.pagingParams.clientPageItemSize = 20;
            this.pagingParams.serverPageItemSize = 60;
            this.pagingParams.clientPageCounter = 0;
            this.pagingParams.serverPageCounter = 0;
            this.pagingParams.dataArray = [];
            this.pagingParams.isRequesting = false;
            this.pagingParams.fullDataLoaded = false;
        }

        /*
         * sets filter string for url
         * @param {Object} Odata query
         */
        BaseFactory.prototype.setODataQuery = function (query) {
            this.odataQuery = query || "";
        }

        /*
         * provides odata filter for url
         * @returns {Object} odata query
         */
        BaseFactory.prototype.getODataQuery = function () {
            return this.odataQuery;
        }


        BaseFactory.prototype.get = function () {
            return processResponseHandler.apply(this, [function () {
                return RequestService.get();
            }]);
        };

        BaseFactory.prototype.post = function () {
            return processResponseHandler.apply(this, [function () {
                return RequestService.post();
            }]);
        };

        BaseFactory.prototype.delete = function () {
            return processResponseHandler.apply(this, [function () {
                return RequestService.delete();
            }]);
        };

        BaseFactory.prototype.deleteHttp = function () {
            return processResponseHandler.apply(this, [function () {
                return RequestService.deleteHttp();
            }]);
        };
        BaseFactory.prototype.postHttp = function () {
            return processResponseHandler.apply(this, [function () {
                return RequestService.postHttp();
            }]);
        };

        BaseFactory.prototype.patchHttp = function () {
            return processResponseHandler.apply(this, [function () {
                return RequestService.patchHttp();
            }]);
        };

        BaseFactory.prototype.update = function () {
            return processResponseHandler.apply(this, [function () {
                return RequestService.put();
            }]);
        };

        BaseFactory.prototype.patch = function () {
            return processResponseHandler.apply(this, [function () {
                return RequestService.patch();
            }]);
        };

        // batch method accepting collection of request contexts
        BaseFactory.prototype.batch = function (requestContexts, batchConfig) {
            var newRequestContexts = _extendRequestParams.call(this, requestContexts);
            return processResponseHandler.apply(this, [function () {
                return RequestService.batch(newRequestContexts, batchConfig);
            }]);
        };


        BaseFactory.prototype.patchBatch = function (requestContexts, batchConfig) {
            var newRequestContexts = _extendRequestParams.call(this, requestContexts);
            return processResponseHandler.apply(this, [function () {
                return RequestService.patchBatch(newRequestContexts, batchConfig);
            }]);
        };

        BaseFactory.prototype.postBatch = function (requestContexts, batchConfig) {
            var newRequestContexts = _extendRequestParams.call(this, requestContexts);
            return processResponseHandler.apply(this, [function () {
                return RequestService.postBatch(newRequestContexts, batchConfig);
            }]);
        };

        BaseFactory.prototype.deleteBatch = function (requestContexts, batchConfig) {
            var newRequestContexts = _extendRequestParams.call(this, requestContexts);
            return processResponseHandler.apply(this, [function () {
                return RequestService.deleteBatch(newRequestContexts, batchConfig);
            }]);
        };

        BaseFactory.prototype.deleteHttpBatch = function (requestContexts, batchConfig) {
            var newRequestContexts = _extendRequestParams.call(this, requestContexts);
            return processResponseHandler.apply(this, [function () {
                return RequestService.deleteHttpBatch(newRequestContexts, batchConfig);
            }]);
        };

        /**
        * Provides next page data for model collection on the basis of page counter and page size
        */
        BaseFactory.prototype.getNextPageData = function () {

            if (!this.pagingParams.isRequesting) { //simply avoiding the new request if there is any running request exist due to unnecessary scroll event
                this.pagingParams.isRequesting = true;

                var self = this;

                /* getting leads for next page from local array */
                var nextPageData = _getCollectionByPage.apply(this);

                if ((nextPageData.length < this.pagingParams.clientPageItemSize) && !this.pagingParams.fullDataLoaded) {

                    var query = this.getODataQuery() || new OdataQueryBuilder();
                    if (this.pagingParams.serverSidePaging)
                    {
                        query.skip((this.pagingParams.serverPageCounter * this.pagingParams.serverPageItemSize)).top(this.pagingParams.serverPageItemSize);
                    }
                    // fallback on base url if data url is not specified in model
                    this.pagingParams.dataUrl = this.pagingParams.dataUrl || this.getModelBaseUrl();
                    this.url = this.pagingParams.dataUrl + query.toString();
             
                    /* if no more leads present in local array then calling the next server page */
                    this.get().then(function (response) {

                        self.pagingParams.isRequesting = false;

                        /* setting full data loaded flag */
                        if (response.length < self.pagingParams.serverPageItemSize || !(self.pagingParams.serverSidePaging)) {
                            self.pagingParams.fullDataLoaded = true;
                        }

                        _.each(response, function (item) {
                            self.pagingParams.dataArray.push(item);
                        });

                        nextPageData = _getCollectionByPage.apply(self);

                        /* updating counters */
                        self.pagingParams.serverPageCounter++;
                        self.pagingParams.clientPageCounter++;

                        self.pagingParams.pageDataCallback(nextPageData);
                     }).catch(function (error) {
                        self.pagingParams.pageDataCallback([]);
                        self.pagingParams.isRequesting = false;
                    });
                } else {
                    if (nextPageData.length > 0) {
                        this.pagingParams.clientPageCounter++;
                    }

                    this.pagingParams.pageDataCallback(nextPageData);
                    this.pagingParams.isRequesting = false;
                }

            }
        }

        /**
        * getCollectionByPage provides subset of model collection/array according to current page counter and page size of pageingParams
        * helpful with infinite scroll implementation for large data collection.
        * @return {Array} array subset
        */
        var _getCollectionByPage = function () {
            return Utility.arraySubSet(this.pagingParams.dataArray, (this.pagingParams.clientPageCounter * this.pagingParams.clientPageItemSize), this.pagingParams.clientPageItemSize);
        };

        // common response handler for all single request - get, post, put , delete
        var processResponseHandler = function (serviceHandler) {
            _.extend(RequestService.requestContext, this);

            var containsPracticeId = this.url.indexOf(":practiceId") !== -1 ? true : false;

            if (containsPracticeId) {
                _.extend(RequestService.requestContext.requestParams, {
                    practiceId: JSON.parse(StorageFactory.get("Presentation")).Id
                });
            }

            var deferredObj = $q.defer();

            serviceHandler()
                .then(function (response) {
                    deferredObj.resolve(response);
                })
                .catch(function (error) {
                    deferredObj.reject(error);
                });

            return deferredObj.promise;
        }

        // set and get methods for local storage accepting the storage properties array
        var _defineStorageProperties = function (storageObjectsArr) {

            _.each(storageObjectsArr, function (obj) {
                Object.defineProperty(this, obj.property, {
                    enumerable: true,
                    get: function () {
                        return StorageFactory.get(obj.property)
                    },
                    set: function (value) {
                        StorageFactory.set(obj.property, value)
                    },

                });
            }, this);

        };

        var _extendRequestParams = function (requestContexts) {

            var newRequestContexts = _.map(requestContexts, function (requestContext) {
                return _extendRequestContext.call(this, requestContext);
            });

            return newRequestContexts;
        };

        var _extendRequestContext = function (requestContext) {
            var containsPracticeId = requestContext.url.indexOf(":practiceId") !== -1 ? true : false;

            if (containsPracticeId) {
                _.extend(requestContext.requestParams, {
                    practiceId: JSON.parse(StorageFactory.get("Presentation")).Id
                });
            }
            return requestContext;
        };

        return BaseFactory;
    };

    return ['$q', 'RequestService', 'RequestContext', 'StorageFactory', 'EMD.Utility', 'oDataQueryBuilder', BaseFactory];
});
