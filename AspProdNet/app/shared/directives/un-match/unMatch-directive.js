define([], function () {
    var unMatchDirective = function () {
        return {
            require: 'ngModel',
            scope:{
                unMatch:"="
            },
            link: function (scope, elem, attrs, ctrl) {
                var collectiondata = scope.unMatch;
                elem.add(elem).on('keyup', function () {
                    scope.$apply(function () {
                        ismatch = _.where(scope.unMatch, { value: elem[0].value });
                        ctrl.$setValidity('unmatch',ismatch.length==0, ctrl);
                    });
                });
            }
        }
    };
    return [unMatchDirective];
});

