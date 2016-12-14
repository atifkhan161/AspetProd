define([], function () {
    var PageTitleDirective = function ($rootScope, $timeout, EMDConstant) {
        return function (scope, element) {
            var listener = function (event, toState) {
                var title = EMDConstant.DEFAULT_PAGE_TITLE;
                if (toState.data && toState.data.pageTitle)
                    title = toState.data.pageTitle + " - " + title;

                $timeout(function () {
                    element.text(title);
                }, 0, false);
            };

            $rootScope.$on('$stateChangeSuccess', listener);
        };
    }

    return ['$rootScope', '$timeout','EMD.EMDConstant', PageTitleDirective];
});