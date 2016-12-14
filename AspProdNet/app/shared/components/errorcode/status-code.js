'use strict';

define([], function () {
    var statusCode = function ($injector) {
        return {
            redirectStatus: function (errorResponse) {
               
                var $state = $injector.get("$state");       
               
                var statusMessage = errorResponse.statusText;

                    //Custom message for 500 internal error 
                if (errorResponse.status === 500) {
                        statusMessage = "Something went wrong!!";
                    }//Custom message for -1 Server timeout
                else if (errorResponse.status === - 1) {
                        statusMessage = "Server timeout!!";
                    }
                    //redirect to error page
                $state.go("Error", { "statusCode": errorResponse.status, "statusMessage": statusMessage });
            }
        }
    }
    return ['$injector', statusCode];
});