define([], function () {
    var SpinnerDirective = function () {
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            template: '<div id="spinner" class="splinLoader"></div>',
            link: function (scope, element, attrs) {
                scope.$on("loading-started", function (e) {
                    element.show();
                });
                scope.$on("loading-complete", function (e) {
                    element.fadeOut("slow");
                });
            }
        };
    }

    return [SpinnerDirective];
});