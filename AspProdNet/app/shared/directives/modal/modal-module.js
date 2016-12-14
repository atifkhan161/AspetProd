'use strict';

define(['angular', "modal-directive"], function (angular, ModalDirective) {
        var modalModule = angular.module('EMD.Modal', []);

        modalModule.directive('emdModal', ModalDirective);
        return modalModule;
    });
