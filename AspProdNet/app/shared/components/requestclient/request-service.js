'use strict';

define([],
    function () {
        var RequestService = function ($q, $http, $resource, CacheFactory, RequestContext, Utility) {

            $q.config({ warnings: false }); // dont show warnings on console , ovveride bluebird config

            function RequestService() {
                RequestContext.call(this); // calling constructor for RequestContext
            }

            // inherit the methods
            RequestService.prototype = Object.create(RequestContext.prototype);

            // to make it available inside base model and to export requestContext in service
            this.requestContext = new RequestService();

            this.get = function () {
                return _processRequest.call(this, { method: 'GET', isArray: true }); // here this refers to the request service object
            };

            this.post = function () {
                return _processRequest.call(this, { method: 'POST', isArray: true }, _resourcDataHandler);
            }

            this.put = function () {
                return _processRequest.call(this, { method: 'PUT', isArray: true }, _resourcDataHandler);
            };

            this.delete = function () {
                return _processRequest.call(this, { method: 'DELETE', isArray: true });
            };

            this.patch = function () {
                return _processRequest.call(this, { method: 'PATCH', isArray: true }, _resourcDataHandler);
            };

            this.patchBatch = function (requestContexts, batchConfig) {
                return this.batch(requestContexts, batchConfig, { method: 'PATCH', isArray: true }, _batchRequest);
            };

            this.postBatch = function (requestContexts, batchConfig) {
                return this.batch(requestContexts, batchConfig, { method: 'POST', isArray: true }, _batchRequest);
            };

            this.deleteBatch = function (requestContexts, batchConfig) {
                return this.batch(requestContexts, batchConfig, { method: 'DELETE', isArray: true }, _batchRequest);
            };

            this.deleteHttp = function () {
                //calling the request
                var deferred = $q.defer();

                // call the common response handler to handle the response
                var requestHandler = _responseHandler.call(this, deferred);

                var config = _getHttpConfig.call(this);

                $http.delete(this.requestContext.url, config).success(requestHandler.successHandler)
                    .error(requestHandler.errorHandler);
                return deferred.promise;
            };
            this.postHttp = function () {
                //calling the request
                var deferred = $q.defer();

                // call the common response handler to handle the response
                var requestHandler = _responseHandler.call(this, deferred);

                var config = _getHttpConfig.call(this);

                $http.post(this.requestContext.url, config.data, { headers: config.headers }).success(requestHandler.successHandler)
                    .error(requestHandler.errorHandler);
                return deferred.promise;
            };

            this.patchHttp = function () {
                //calling the request
                var deferred = $q.defer();

                // call the common response handler to handle the response
                var requestHandler = _responseHandler.call(this, deferred);

                var config = _getHttpConfig.call(this);

                $http.patch(this.requestContext.url, config.data, { headers: config.headers }).success(requestHandler.successHandler)
                    .error(requestHandler.errorHandler);
                return deferred.promise;
            };

            this.deleteHttpBatch = function (requestContexts, batchConfig, batchRequestParams) {
                return this.batch(requestContexts, batchConfig, { method: 'DELETE', isArray: true }, _httpDeleteBatchRequest);
            };

            this.batch = function (requestContexts, batchConfig, batchRequestParams, batchCall) {
                var batchFunc = batchCall || _batchRequest;
                var deferredObj = $q.defer();
                var isCache = false;
                // create an array of promise objects to be called
                var promiseRequests = _.map(requestContexts, function (requestContext) {
                    _.extend(this.requestContext, requestContext);
                    var cachedData = _getCacheData(this.requestContext);
                    if (cachedData) {
                        isCache = true;
                        return cachedData;
                    }
                    return batchFunc.call(this, batchConfig, batchRequestParams);

                }, this);

                // call the common response handler to handle the response
                var requestHandler = _responseHandler.call(this, deferredObj, batchConfig);

                var batchSuccessHandler = (batchConfig && batchConfig.forceError) || isCache ? requestHandler.successHandler : requestHandler.batchSuccessHandler;
                // call the array of promises

                $q.all(promiseRequests).then(batchSuccessHandler, requestHandler.errorHandler);
                return deferredObj.promise;
            };

            var _getCacheData = function (requestContext) {
                var cachedData;
                // inject cachefactory here and resolve the promiseObj if cache gives the data
                if (requestContext.allowCacheFromCollection) {
                    cachedData = CacheFactory.resolve(requestContext);// request context to include the cache filter object to resolve from collection
                    return cachedData;
                }
            };

            var _processRequest = function (requestParam, resourceHandler) {

                _extendRequestParam.call(this, requestParam);

                //calling the request
                var deferred = $q.defer();

                // call the common response handler to handle the response
                var requestHandler = _responseHandler.call(this, deferred);

                var cachedData = _getCacheData.call(this, this.requestContext);
                if (cachedData) {
                    deferred.resolve([cachedData]);
                    return deferred.promise;
                }
                if (this.requestContext.responseType != "") {
                    requestParam.responseType = this.requestContext.responseType;
                }                
                var resourcePromise = $resource(this.requestContext.url, this.requestContext.requestParams, { 'exec': requestParam });
                resourceHandler = resourceHandler || _resourceHandler;
                resourceHandler.call(this, resourcePromise, requestHandler);
                return deferred.promise;
            };

            // prepare a promise object for particluar requestContext
            var _batchRequest = function (batchConfig, batchRequestParams) {
                var requestParam = batchRequestParams || { method: 'GET', isArray: true };
                _extendRequestParam.call(this, requestParam);
                var promiseObj = $resource(this.requestContext.url, this.requestContext.requestParams, { 'query': requestParam }).query(this.requestContext.requestPayload).$promise;
                return batchConfig && batchConfig.forceError ? promiseObj : promiseObj.reflect();
            };

            var _httpDeleteBatchRequest = function (batchConfig, batchRequestParams) {
                var config = _getHttpConfig.call(this);
                var promiseObj = $http.delete(this.requestContext.url, config);
                return batchConfig && batchConfig.forceError ? promiseObj : promiseObj.reflect();
            };

            var _resourcDataHandler = function (resourcePromise, requestHandler) {
                return resourcePromise.exec(this.requestContext.requestPayload, requestHandler.successHandler, requestHandler.errorHandler);
            };

            var _resourceHandler = function (resourcePromise, requestHandler) {
                return resourcePromise.exec(requestHandler.successHandler, requestHandler.errorHandler);
            };

            //common response/error handler
            var _responseHandler = function (deferredObj, batchConfig) {

                var successHandler = function (response) {
                    deferredObj.resolve(response);
                };

                var batchSuccessHandler = function (response) {
                    var filteredResponse = _.map(response, function (res) {

                        if (res.isFulfilled()) {
                            return res.value();
                        }

                        if (batchConfig && batchConfig.resolveError) {
                            var reason = res.reason();
                            return {
                                iserror: true,
                                status: reason ? reason.status : '',
                                statusText: reason ? reason.statusText : '',
                                errorMessage: reason  && reason.data ? reason.data.Message : '',
                            }
                        }
                        //else we can handle the error
                    });
                    deferredObj.resolve(filteredResponse);
                };

                var errorHandler = function (err) {
                    deferredObj.reject(err);
                };

                return {
                    successHandler: successHandler,
                    batchSuccessHandler: batchSuccessHandler,
                    errorHandler: errorHandler
                };
            };

            var _extendRequestParam = function (requestParam) {

                // extend the requestParams with cache set
                if (this.requestContext.allowCache) {
                    _.extend(requestParam, { cache: CacheFactory.getCache() });
                }

                // extend the requestParams headers with extra configurations
                _.extend(requestParam, {
                    headers: {
                        requestHeader: {
                            authExclusion: this.requestContext.authExclusion,
                            isLogOut: this.requestContext.isLogOut,
                            isTouchMD: this.requestContext.isTouchMD,
                            isPrimary: this.requestContext.isPrimary,
                            isSpinner: this.requestContext.isSpinner,
                            contentType: this.requestContext.contentType,
                            accept: this.requestContext.accept,
                            responseType: this.requestContext.responseType,
                            metaData: this.requestContext.metaData,
                            forceBlockSpinner: this.requestContext.forceBlockSpinner
                        }
                    }
                });
            }

            var _getHttpConfig = function () {
                var config = {
                    data: this.requestContext.requestPayload
                };
                var url = Utility.replaceKeys(this.requestContext.url, this.requestContext.requestParams);
                this.requestContext.url = url;
                _extendRequestParam.call(this, config);
                return config;
            };

        }
        return ['$q', '$http', '$resource', 'CacheFactory', 'RequestContext', 'EMD.Utility', RequestService];
    });



