require.config({
    waitSeconds: 60,
    //path to base url
    baseUrl: "",
    // Paths for just the core application and its controllers/factories/services
    paths: {
        "appName": "scripts/app",
        //jquery
        "jquery": [
            "https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min",
            "libs/jquery/js/jquery.min" //fallback in case CDN fails
        ],
        //angular
        "angular": [
            "https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min",
            "libs/angular/1.4.8/js/angular.min" //fallback in case CDN fails
        ],
        "angularAMD": "libs/angularAMD/0.2.1/js/angularAMD.min",
        "angular-ui-router": "libs/angular-ui-router/0.2.15/js/angular-ui-router.min",
        "angular-resource": "libs/angular-resource/1.4.8/js/angular-resource.min",
        "angular-sanitize": "libs/angular-sanitize/1.4.8/js/angular-sanitize.min",
        "angular-animate": "libs/angular-animate/1.4.8/js/angular-animate.min",

        "infinite-scroll": "libs/ngInfiniteScroll/1.2.0/js/ng-infinite-scroll.min",

        //underscore
        "underscore": "libs/underscore/1.8.3/js/underscore-min",
        //toaster
        //"angular-toastr": "libs/angular-toastr/1.7.0/js/angular-toastr.min",
        "angular-toastr-tpls": "libs/angular-toastr/1.7.0/js/angular-toastr.tpls.min",

        "angular-applicationinsights": "libs/angular-applicationinsights/0.2.6/js/angular-applicationinsights.min",

        //bluebird
        "bluebird": "libs/bluebird/3.1.5/js/bluebird.core.min",
        "angular-bluebird": "libs/angular-bluebird-promises/1.0.1/js/angular-bluebird-promises.min",

        //bootstrap js
        "bootstrap": "libs/bootstrap/js/bootstrap.min",

        //Angular Bootstrap UI
        "ui-bootstrap-tpls": "libs/angular-bootstrap/0.14.1/js/ui-bootstrap-tpls.min",

        //angular Bootstarp Color picker
        "angular-colorpicker": "libs/angular-bootstrap-colorpicker/3.0.24/js/bootstrap-colorpicker-module.min",

        //angular ui-calendar
        //  "angular-ui-calendar": "libs/angular-ui-calendar/1.0.1/js/calendar",
        //   "full-calendar": "libs/fullcalendar/2.3.1/js/fullcalendar.min",

        //angular permission
        "angular-permission": "libs/angular-permission/2.1.3/js/angular-permission.min",

        //moment
        "moment": "libs/moment/js/moment.min",

        //input mask
        "angular-mask": "libs/ngMask/3.0.16/js/ngMask.min",

        //jsPDF
        "jspdf": "libs/jspdf/js/jspdf.min",
        "jspdfautotable": "libs/jspdf-autotable/js/jspdf.plugin.autotable",

        //angular-messages
        "angular-messages": "libs/angular-messages/1.4.0/js/angular-messages.min",

        //angular loading bar
        "angular-loading-bar": "libs/angular-loading-bar/js/loading-bar.min",

        //TextAngular
        //"rangy-core": "libs/rangy/1.3.0/js/rangy-core.min",
        //"rangy-selectionsave": "libs/rangy/1.3.0/js/rangy-selectionsaverestore.min",
        //"textAngular-sanitize": "libs/textAngular/1.5.0/js/textAngular-sanitize.min",
        //"textAngular": "libs/textAngular/1.5.0/js/textAngular.min",

        //chart
        //"angular-chart": "libs/angular-chart.js/0.9.0/js/angular-chart.min",
        //"chart": "libs/Chart.js/1.0.2/js/Chart.min",

        //Simple ScrollBar
        //   "ss-container-directive": "shared/directives/simple-scrollbar/simple-scrollbar-directive",

        //Slide Menu
        //  "angular-lateral-slide-menu": "shared/utility/angular-ap-lateral-slide-menu",

        //shared storage
        "base-storage": "shared/components/basestorage/base-storage",
        "storage-module": "shared/components/basestorage/storage-module",

        // cache module
        "cache-factory": "shared/components/basecache/cache-factory",
        "cache-module": "shared/components/basecache/cache-module",

        //oData Query Builder module
        "odataquerybuilder": "shared/components/odataquerybuilder/odataquerybuilder",
        "odataquerybuilder-module": "shared/components/odataquerybuilder/odataquerybuilder-module",
        "odataqueryutility": "shared/components/odataquerybuilder/odataqueryutility",

        // request module
        "request-interceptor": "shared/components/requestclient/request-interceptor",
        "request-context": "shared/components/requestclient/request-context",
        "request-service": "shared/components/requestclient/request-service",
        "request-module": "shared/components/requestclient/request-module",
        "base-model": "shared/components/basemodel/base-model",

        "app-url-constant": "shared/config/app-url-constant",
        "msg-constant": "shared/config/msg-constant",
        "app-constant": "shared/config/app-constant",
        "shared-util": "shared/utility/shared-util",
        //  "datetime-util": "shared/utility/datetime-util",

        //Error modules
        "status-code": "shared/components/errorcode/status-code",
        "error-module": "shared/components/error/js/error-module",
        "EMD.Error.ErrorController": "shared/components/error/js/error-controller",

        //Timezone module
        //"timezone-module": "shared/components/timezone/timezone-module",
        //"timezone-factory": "shared/components/timezone/timezone-factory",
        //"timezone-filter": "shared/components/timezone/timezone-filter",

        ////base group module
        //"base-group-model": "shared/components/basegroupmodel/base-group-model",
        //"base-group-module": "shared/components/basegroupmodel/base-group-module",

        //authentication module
        "auth-factory": "modules/authentication/js/auth-factory",
        "auth-module": "modules/authentication/js/auth-module",

        //toastrmessage Module
        "toastrmessages-module": "shared/components/toastr-messages/js/toastrmessages-module",
        "toastrmessages-factory": "shared/components/toastr-messages/js/toastrmessages-factory",

        "spinner-directive": "shared/directives/spinner/spinner-directive",
        //  "page-title-directive": "shared/directives/page-title/page-title-directive",
        "whenscrollbottom-directive": "shared/directives/scroll-down/whenscrollbottom-directive",



        //filters
        //"age-filter": "shared/filters/age-filter",
        //"unique-filter": "shared/filters/unique-filter",
        //"round-filter": "shared/filters/round-filter",
        //"phonenumber-format-filter": "shared/filters/phonenumber-format-filter",


        //shared modal 
        "modal-directive": "shared/directives/modal/modal-directive",
        "modal-module": "shared/directives/modal/modal-module",
        //shared calender
       // "customcalendar-directive": "shared/directives/customcalendar/customcalendar-directive",
       // "customcalendar-module": "shared/directives/customcalendar/customcalendar-module",

        //file model
       // "filemodel-directive": "shared/directives/file-model/filemodel-directive",
       // "filemodel-module": "shared/directives/file-model/filemodel-module",

        //Authorization module
        "authorization-factory": "modules/authorization/js/authorization-factory",
        "authorization-module": "modules/authorization/js/authorization-module",

        //Test Module
        "test-module": "modules/test-module/js/test-module",
        "test-factory": "modules/test-module/js/test-factory",
        "test-model": "modules/test-module/js/test-model",

        //AtIcons
        "ATicon": "../Scripts/ATicon.js",
        //Dashboard module
        "dashboard-module": "modules/dashboard/js/dashboard-module",

        //Dashboard module
        "maint-module": "modules/maintainance/js/maint-module",
        "daily-quality-controller": "modules/maintainance/daily-quality/js/daily-quality-controller",
        "sched-record-calibration-controller": "modules/maintainance/sched-record-calibration/js/sched-record-calibration-controller",
        "rodent-control-report-controller": "modules/maintainance/rodent-control-report/js/rodent-control-report-controller",
        "daily-personal-hygiene-controller": "modules/maintainance/daily-personal-hygeine-report/js/daily-personal-hygiene-controller",

        //Jqgrid Directive
        "jqGrid": "../Scripts/jquery.jqGrid.src",
        "grid.locale-en": "../Scripts/grid.locale-en",
        "jq-grid-directive": "shared/directives/jq-grid/jq-grid-directive"
    },
    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        "appName": ["angular", "angular-applicationinsights"],
        "angular-applicationinsights": ["angular", "jquery"],
        //Tell requirejs to pipe in angular's return variable as "angular"
        "angular": {
            exports: "angular",
            deps: ["jquery"]
        },
        "jspdf": {
            exports: "jsPDF"
        },
        "jqGrid": ["jquery"],
        "ATicon":["jquery"],
        "bootstrap": ["jquery"],
        "angularAMD": ["angular"],
        "ngload": ['angularAMD'],
        "angular-ui-router": ["angular"],
        "angular-resource": ["angular"],
        "angular-sanitize": ["angular"],
        "angular-animate": ["angular"],
        "infinite-scroll": ["angular"],
        "bluebird": ["angular"],
        "angular-bluebird": ["bluebird"],
        "ui-bootstrap-tpls": ["angular"],
        "angular-lateral-slide-menu": ["angular"],
        "angular-messages": ["angular"],
        //"angular-toastr": ["angular"],
        "angular-toastr-tpls": ["angular"],
        "datetimepicker": ["angular", "moment"],
        "datetimepicker-templates": ["datetimepicker", "angular", "moment"],
        "angular-loading-bar": ["angular"],
        "angular-colorpicker": ["angular"],
        //"angular-ui-calendar": ["angular", "moment"],
        //"full-calendar": ["angular-ui-calendar"],
        "angular-permission": ["angular", "angular-ui-router"],
        //"rangy-selectionsave": ['rangy-core'],
        //"textAngular-sanitize": ['angular'],
        //"textAngular": ['angular', 'textAngular-sanitize'],
        //"chart": ['angular'],
        //"angular-chart": ['chart'],
        "jspdfautotable": ['jspdf'],
        "angular-mask": ["angular"]
    }
});

require(['appName'], function (appName) { });
