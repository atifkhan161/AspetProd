'use strict';

define(['angular-toastr-tpls'], function () {

    var ToastrMessageFactory = function (toastr) {

        return {
            success: function (message) {
                toastr.success(message);
            },
            error: function (message) {
                if (message.data !== undefined && message.data.Message !== undefined) {
                    toastr.error(message.data.Message);
                } else if (!message.hasOwnProperty('data') && !_.isEmpty(message)) {
                    toastr.error(message);
                }
            },
            warning: function (message) {
                toastr.warning(message);
            },
            info: function (message) {
                toastr.info(message);
            },
            clear: function () {
                toastr.clear();
            },
        }
    };

    return ['toastr', ToastrMessageFactory];

});
