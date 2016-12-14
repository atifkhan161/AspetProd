'use strict';
define([], function () {
    var baseUrl = "https://***.***.com";
    var practiceBaseUrl = "https://***.net/";
    return {
        "applicationInsightsKey": '',
        "baseUrl": baseUrl,
        "presentationUrl": baseUrl + "/Presentations",
        "userUrl": baseUrl + "/Users",
        "practiceBaseUrl": practiceBaseUrl,
        "PracticeLogoUrl": baseUrl + "/Practices/{0}/PublicLogo",
        "practiceUrl": practiceBaseUrl + "Practices/:practiceId",
        "loginUrl": "https://***/?applicationToken=",
        "applicationToken": "Z1RTTk9RMXpnanJwU3ZDUm5GZ3I4Y0VibE9EVTBHekxKMXRyQ3pkVVl2MUVqT25jb1J6ZG9hK1hWcit0cExneC9xcVpOalk3ZTI3WER6Q2lNeWJSaWdBQkFBQUEvLy8vL3dFQUFBQUFBQUFBQmdFQUFBQWtZbVJtTnpoaVpUa3ROekV3WlMwME9EWmlMVGszTkdJdFpEYzNNMlF5WkdJNU5tTTVDdz09",
        "logoutUrl": "https://***/RPC/Logout",
        "tokenVerificationUrl": "https://***/Verify"
    };
})
