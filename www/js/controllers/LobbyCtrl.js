angular.module('starter.controllers')
.controller('LobbyCtrl',['$scope', 'TKTestQuestionService', '$state', 'TKAnswersService', '$window', 'SSFUsersRest',

function($scope, TKTestQuestionService, $state, TKAnswersService, $window, SSFUsersRest) {
TKTestQuestionService.all();

 $scope.goToTest = function()
   {
        TKAnswersService.resetAnswers();
           $state.go('question',{questionID:1});
   };
 
   // Go to results function?
  $scope.goToHistory = function(){
  $state.go('history');
  };
   
 $scope.logout = function () {
  SSFUsersRest.logout($window.localStorage.token);
  $state.go('landing');
 };
 
}]);