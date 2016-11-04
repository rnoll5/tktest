angular.module('starter.controllers')
.controller('loginCtrl', [ '$scope', '$window', '$state', 'SSFUsersRest',
  function ($scope, $window, $state, SSFUsersRest) {
  
  $scope.user={};  
  
  $scope.loginForm = function(form) { 
    if(form.$invalid) return alert("Please complete the form before proceeding.");
    
  SSFUsersRest.login($scope.user)
  .then(function(response) {
    //   handle different responses and decide what happens next
     $window.localStorage.token=response.data.id; 
     $window.localStorage.userID=response.data.userId; 
     
     if (response.data === null) {
      return alert("user is offline");
     } else if (response.status === 200) {
         $scope.user={};
      $state.go("lobby");
     }
  }, function(error) {
     // inform the user of any known problems that arose, otherwise give a generic 
     // failed message
     if (error.status === 404) {
      return alert("not found"); 
     } else if (error.status ===500) {
       return alert("server is offline");
     } else {
         alert("failed");
     }
    });
  };
}])