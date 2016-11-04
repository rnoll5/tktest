angular.module("RESTServices")
    .service('QuestionsRest', function($http, $window) {
        var QuestionsRest = this;

        // $window.localStorage.questions=response.data.questions;

        QuestionsRest.get = function(token) {
            $window.localStorage[token];
            return $http({
                headers: {
                    authorization: token
                },
                url: "https://strongloop-backend-rnoll.c9users.io/api/Questions",
                method: "GET",
            });
        };

    });
