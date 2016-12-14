define([], function () {
    var PhoneNumberMask = function () {
        return function (cellPhoneNumber) {
            if (!cellPhoneNumber) { return ''; }

            var value = cellPhoneNumber.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return cellPhoneNumber;
            }

            var city, number;

            if (value.length >= 10){
                  city = value.slice(0, 3);
                  number = value.slice(3);
                        
            }else{
                return cellPhoneNumber
            }

           number = number.slice(0, 3) + '-' + number.slice(3);

            return (" (" + city + ") " + number).trim();
        };
       
    };
    return [PhoneNumberMask];
});