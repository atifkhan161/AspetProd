'use strict';

define([], function () {

    var RequestContext = function () {
        // common RequestContext object to be shared across all http calls
        function RequestContext() {
            this.url = '';
            this.headerPayload = {};
            this.requestPayload = {};
            this.requestParams = {};
            this.allowCache = false;
            this.authExclusion = false;
            this.isLogOut = false;
            this.isTouchMD = false;
            this.isPrimary = true;
            this.isSpinner = false;
            this.forceBlockSpinner = false; //force fully start block spinner for GET requests
            this.contentType = "application/json";
            this.accept = "application/json";
            this.metadata = "";
            this.allowCacheFromCollection = false;
            this.responseType = "";
            // this is added for specific case as we need to collect data from cache for patients from cache collection
            this.collectionUrl = "";
            this.cacheFilter = {
                searchKey: '',
                searchValue: ''
            };
        }
        return RequestContext;
    }

    return [RequestContext];
});