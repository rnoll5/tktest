angular.module("RESTServices")
.service('TestResultsRest', function($http, $window) {
    var TestResultsRest = this;
   TestResultsRest.save = function(test, token) {
       return $http({
           url: "https://strongloop-backend-rnoll.c9users.io/api/TestResults",
           method: 'POST',
           data: test,
           Headers:{
                 Authorization: token
            }
       });
   };
    TestResultsRest.getAll = function(token) {
       return $http({
           Headers:{
                 Authorization: token
            },
           url: "https://strongloop-backend-rnoll.c9users.io/api/TestResults",
           method: 'GET',
       });
    };
   });