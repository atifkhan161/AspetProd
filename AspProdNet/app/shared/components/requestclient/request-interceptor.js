'use strict';

define([], function () {
    var HttpInterceptor = function ($q, $rootScope, StorageFactory) {
        var numLoadings = 0;
        return {
            // On request success
            request: function (config) {

                //Read requestHeader for the particular request
                if (config.headers && config.headers.requestHeader) {
                    var requestHeader = config.headers.requestHeader;
                    config.useXDomain = true;
                    //Look for authExclusion object
                    if (!requestHeader.authExclusion || requestHeader.isTouchMD) {
                        config.headers['Authorization'] = "Bearer " + StorageFactory.get('AccessToken'); //'allinone';//'qastaffadminaabbbb'
                        config.headers['Content-Type'] = requestHeader.contentType;
                        config.headers['Accept'] = requestHeader.accept;

                        config.headers['X-Metadata'] = requestHeader.metaData;
                    }
                    else if (requestHeader.isLogOut) {
                        config.headers['X-AccessToken'] = StorageFactory.get('AccessToken');
                    }

                }

                //Start Loader
                var forceBlockSpinner = config.headers.requestHeader && config.headers.requestHeader.forceBlockSpinner;
                if (config.method != "GET" || forceBlockSpinner) {
                    if (config.headers.requestHeader && config.headers.requestHeader.isSpinner) {
                        if (numLoadings === 0) {
                            // show loader
                            $rootScope.$broadcast('loading-started');
                        }
                        numLoadings++;
                    }
                }
                // Return the config or wrap it in a promise if blank.
                return config || $q.when(config);
            },

            // On request failure
            requestError: function (rejection) {

                //Stop loader
                var forceBlockSpinner = rejection.config.headers.requestHeader && rejection.config.headers.requestHeader.forceBlockSpinner;
                if (rejection.config.method != "GET" || forceBlockSpinner) {
                    if (rejection.config.headers.requestHeader && rejection.config.headers.requestHeader.isSpinner) {
                        if ((--numLoadings) === 0) {
                            // Hide loader
                            $rootScope.$broadcast('loading-complete');
                        }
                    }
                }
                // Return the promise rejection.
                return $q.reject(rejection);
            },

            // On response success
            response: function (response) {
                //update response if object is return
                if (_.isObject(response.data) && !_.isArray(response.data)) {
                    var respArr = [];
                    respArr.push(response.data);
                    response.data = respArr;
                }

                if (response.config.headers.Accept == "application/pdf") {
                    response.data = [response.data];

                }

                //Stop loader
                var forceBlockSpinner = response.config.headers.requestHeader && response.config.headers.requestHeader.forceBlockSpinner;
                if (response.config.method != "GET" || forceBlockSpinner) {
                    if (response.config.headers.requestHeader && response.config.headers.requestHeader.isSpinner) {
                        if ((--numLoadings) === 0) {
                            // Hide loader
                            $rootScope.$broadcast('loading-complete');
                        }
                    }
                }

                // Return the response or promise.
                return response || $q.when(response);
            },

            // On response failture
            responseError: function (rejection) {

                //Stop loader
                var forceBlockSpinner = rejection.config.headers.requestHeader && rejection.config.headers.requestHeader.forceBlockSpinner;
                if (rejection.config.method != "GET" || forceBlockSpinner) {
                    if (rejection.config.headers.requestHeader && rejection.config.headers.requestHeader.isSpinner) {
                        if ((--numLoadings) === 0) {
                            // Hide loader
                            $rootScope.$broadcast('loading-complete');
                        }
                    }
                }
                //ToDo 
                ////Redirect to error page if isprimary returns true
                //if (rejection.config.headers.requestHeader && rejection.config.headers.requestHeader.isPrimary) {
                //    //Evalue Status message
                //   StatusCode.redirectStatus(rejection);
                //}

                // Return the promise rejection.
                return $q.reject(rejection);
            }
        };
    };

    return ['$q', '$rootScope', 'StorageFactory', HttpInterceptor];
});

