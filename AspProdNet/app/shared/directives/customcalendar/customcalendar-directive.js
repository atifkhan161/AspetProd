define([], function () {
    var CustomCalendarDirective = function () {
        return {
            restrict: 'EA',
            transclude: true,
            scope: {
                modelField: '=',
                configOptions: '=',
                calendarClass: '@',
                iconClass: '@',
                dateName: '@',
                minDate: '=',
                maxDate: '=',
                isRequired: '@',
                onChangeEvent: '&',
                onFocus: '&'
            },
            link: function (scope, element, attrs) {
                angular.element('body').addClass('runreport');
                if (scope.configOptions.showWeeks) {
                    angular.element('body').removeClass('runreport');
                    scope.configOptions = _.omit(scope.configOptions, 'showWeeks');
                }
                scope.isRequired = scope.isRequired || false;
            },
            templateUrl: 'shared/directives/customcalendar/customcalendar-template.html',
            controller: ['$scope', '$timeout', function ($scope, $timeout) {
                if ($scope.configOptions) {
                    $scope.configOptions.showWeeks = $scope.configOptions && $scope.configOptions.showWeeks ? true : false;
                }
                else {
                    $scope.configOptions = { showWeeks: false };
                }
                $scope.openDatePicker = function () {
                    $scope.dateSelection = !$scope.dateSelection;
                }

                $scope.changeDate = function () {
                    $timeout(function () {
                        $scope.onChangeEvent({ dateObj: $scope.modelField });
                    }, 1000)
                    
                }
            }]
        };
    };
    return [CustomCalendarDirective];
});