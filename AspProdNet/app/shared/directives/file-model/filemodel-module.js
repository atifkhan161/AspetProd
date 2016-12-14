'use strict';

define(['angular', "filemodel-directive"], function (angular, FileModalDirective) {
    var fileModalModule = angular.module('EMD.FileModel', []);

    fileModalModule.directive('fileModel', FileModalDirective);
    return fileModalModule;
});
