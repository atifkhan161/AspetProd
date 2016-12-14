define([], function () {
    var RoundFilter = function () {
        return function (input) {
            return Math.round(input);
        };
    };
    return [RoundFilter];
});