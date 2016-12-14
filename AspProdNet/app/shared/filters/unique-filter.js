define([], function () {
    var UniqueFilter = function () {

        function filterUnique(input, key) {
            var unique = {};
            var uniqueList = [];
            for (var i = 0; i < input.length; i++) {
                if (typeof unique[input[i][key]] === "undefined") {
                    unique[input[i][key]] = "";
                    uniqueList.push(input[i]);
                }
            }
            return uniqueList;
        }

        return function (input, key) {
            return filterUnique(input, key);
        };
    };
    return [UniqueFilter];
});
