'use strict';

define([], function () {

    var AuthFactory = function ($q, $window, URLS, StorageFactory, Utility) {
        //var user = new User();

        return {
            logIn: function () {
                var location = $window.location;
                $window.location.href = Utility.format('{0}{1}&redirectURL={2}', [URLS.loginUrl, URLS.applicationToken, location.origin]);
            },

            logOut: function () {
                user = new User();
                user.isLogOut = true;
                user.isSpinner = true;
                user.authExclusion = true;
                user.url = URLS.logoutUrl;
                return user.post();
            },

            isAuthenticated: function () {
                var token = user.AccessToken;
                if (!_.isEmpty(token)) {
                    var now = Date.parse(Date());
                    if (now < Date.parse(user.Expires)) {
                        return true;
                    }
                    else {
                        user.AccessToken = "";
                    }
                }
                return false;
            },

            checkUrlParam: function () {
                var accessToken = Utility.getUrlParameter('AccessToken', $window.location.search);

                if (accessToken) {
                    user.AccessToken = accessToken;
                    var expiry = Utility.getUrlParameter('Expires', $window.location.search);
                    user.Expires = expiry;
                    $window.location.search = "";
                    return true;
                }
                else
                    return false;
            },

            clearToken: function () {
                StorageFactory.clear();
            },
            clearAccessToken: function () {
                StorageFactory.clear();
                //  user.AccessToken = "";
            },

            getUserContextBatch: function () {
                var deferred = $q.defer();
                var requestUrls = [{ url: user.getModelBaseUrl() + "?$filter=Id eq myuserid()" }, { url: URLS.presentationUrl }];

                var requestContexts = _.map(requestUrls, function (requestContext) {
                    var user = new User();
                    user.isTouchMD = true,
                    user.authExclusion = true,
                    user.url = requestContext.url;
                    user.isPrimary = false;
                    return user;
                }, this);

                var batchConfig = {
                    forceError: true
                };

                user.batch(requestContexts)
                    .then(function (response) {
                        var userResponse = _.first(_.first(response));
                        var presentationResponse = _.first(_.last(response));
                        deferred.resolve([userResponse, presentationResponse]);
                    })
                    .catch(function (err) {
                        deferred.reject(err);
                    });
                return deferred.promise;
            },

            isPresentationSelected: function () {
                return StorageFactory.get("Presentation");
            }
        }
    };

    return ['$q', '$window', 'URLS', 'StorageFactory', 'EMD.Utility', AuthFactory];

});
