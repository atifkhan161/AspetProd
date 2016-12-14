
define([], function () {
    var ModalDirective = function () {
        return {
            restrict: 'A',
            replace:true,
            scope: {
                modalTemplate: "@",
                modalSize: "@",
                modalClass: "@",
                modalController: "@",
                modalInputData: '=', //additional input data for controller, if modalController is provided
                modalDrop:"@"
            },
            link:function(scope, element, attrs){
                element.bind('click', function () {
                    scope.openPopUp();
                });
            },
            
            controller: ['$scope', '$uibModal', function ($scope, $uibModal) {

                $scope.openPopUp = function () {
                    var size = 'md';//md for medium
                    var modalClass = 'common-modal';
                    if (!_.isUndefined($scope.modalClass)) {
                        modalClass = $scope.modalClass;
                    }
                    var modalProperties = {
                        animation: true,
                        templateUrl: $scope.modalTemplate,
                        size: $scope.modalSize || size,
                        windowClass: modalClass,
                        scope: $scope.$parent
                        
                    };
                    if ($scope.modalDrop) {
                        modalProperties.backdrop = 'static';
                    }
                    //adding properties
                    if ($scope.modalController) {
                        modalProperties.controller = $scope.modalController;
                        modalProperties.bindToController = true;
                        if($scope.modalInputData) {
                            modalProperties.scope.modalInputData = $scope.modalInputData; //new scope property for input data
                        }
                    }
                    var modalInstance = $uibModal.open(modalProperties);
                    modalInstance.result.then(function (selectedItem) {
                        $scope.selected = selectedItem;
                    });
                };
            }]
        };
    };
    return [ModalDirective];
});