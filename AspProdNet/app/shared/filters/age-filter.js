define(['moment'], function (moment) {
    var AgeFilter = function () {

        function calculateAge(birthday) { // birthday is a date
            if (!_.isEmpty(birthday) || birthday) {
                var date = moment(birthday);
                return moment().diff(date, 'years');
            }
            return "NA";
        }

        return function (birthdate) {
            return calculateAge(birthdate);
        };
    };
    return [AgeFilter];
});
