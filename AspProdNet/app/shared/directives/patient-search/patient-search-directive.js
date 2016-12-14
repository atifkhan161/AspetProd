define(['EMD.PatientSearchController'], function (PatientSearchController) {
    var PatientSearchDirective = function () {
        return {
            restrict: 'EA',
            scope: {
                referralId: '=',
                keywords: '=',
                disableInput: '=',
                patientCallback: '&',
                searchCallback: '&',
                searchShow:"="
            },
            replace: true,
            transclude: true,
            controller: "EMD.PatientSearchController",
            templateUrl: 'shared/directives/patient-search/patient-search-template.html',           
        };
    };
    return [PatientSearchDirective];
});