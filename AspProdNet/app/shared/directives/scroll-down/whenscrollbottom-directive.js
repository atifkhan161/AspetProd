
'use strict';

define([], function () {
    var WhenScrollDirective = function () {
        return function (scope, elem, attr) {
            var scrollBar = elem[0]
            elem.bind('scroll', function () {
                if (scrollBar.scrollTop + scrollBar.offsetHeight >= scrollBar.scrollHeight) {
                    scope.$apply(attr.whenScrollBottom);
                }
            })
        }
    };
    return [WhenScrollDirective];
});
