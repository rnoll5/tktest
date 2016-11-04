angular.module("RESTServices")
.service('TestResultsRest', function($http, $window) {
    var TestResultsRest = this;
   TestResultsRest.save = function(test, token) {
       return $http({
           url: "https://strongloop-backend-rnoll.c9users.io/api/TestResults",
           method: 'POST',
           data: test,
           headers:{
                 authorization: token
            }
       });
   };
    TestResultsRest.getAll = function(token, userID) {
       return $http({
           headers:{
                 authorization: token
            },
           url: "https://strongloop-backend-rnoll.c9users.io/api/TestResults?filter[where][userID]=" + userID,
           method: 'GET',
       });
    };
   });