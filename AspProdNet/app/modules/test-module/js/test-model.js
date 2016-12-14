'use strict';

define([], function () {

    var User = function (BaseFactory, URLS) {
        function User() {
            var storageObjectsArr = [{ property: "AccessToken" }, { property: "Expires" }, { property: "userContext" }];
            BaseFactory.call(this, storageObjectsArr);
        }

        User.prototype = Object.create(BaseFactory.prototype);

        User.prototype.getModelBaseUrl = function () {
            return URLS.userUrl;
        };
        User.prototype.getModelBaseUrlById = function () {
            return URLS.userUrl + "/:userId";
        };
        User.prototype.getLoggedInUserUrl = function () {
            return this.getModelBaseUrl() + "?$filter=Id eq myuserid()";
        };
        User.prototype.getUserPhoneNoUrl = function () {
            return this.getModelBaseUrl() + "/:userId" + "/PhoneNumbers";
        };

        return User;
    };
    return ['BaseFactory', 'URLS', User];
});
