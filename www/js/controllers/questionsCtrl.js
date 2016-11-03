angular.module('starter.controllers')
.controller('QuestionsCtrl',['$scope', '$stateParams', 'testInfo', 'TKAnswersService', '$state', '$ionicHistory', 'TKResultsButtonService',
function($scope, $stateParams, testInfo, TKAnswersService, $state, $ionicHistory, TKResultsButtonService) {
    $scope.qNumber = $stateParams.questionID;
    
    testInfo.forEach(function(infoDict) {
     if(infoDict.Answer_ID === "A")
          $scope.questionA = infoDict;
     if(infoDict.Answer_ID === "B")
          $scope.questionB = infoDict;
});

$scope.buttonClicked = function (answersDict) {
        var category = $scope["question" + answersDict].Style;
        TKAnswersService.saveAnswer(answersDict);
       
        if($scope.qNumber == 30) {
           performRequest();
        }
        else {
          var nextqNumber = Number($scope.qNumber) + 1;
          $state.go('question', {questionID: nextqNumber});
        }
};

$scope.goBack = function() {
      if($scope.qNumber >1)
        TKAnswersService.eraseLastAnswer();
      $ionicHistory.goBack();
 };
 
 function performRequest() {
    var answersDict = angular.copy(TKAnswersService.getAnswers());
    var date = new Date();
    answersDict["createDate"] = date.toUTCString();
    TKAnswersService.saveTest(answersDict);
    TKResultsButtonService.setShouldShowMenuButton(true);
    $ionicHistory.nextViewOptions({
         historyRoot: true
    });
    $state.go('results');
}
    $scope.ptorQuestionGoA = 'ptor-question-go-a' + $stateParams.questionID;
    $scope.ptorQuestionGoB = 'ptor-question-go-b' + $stateParams.questionID;
    $scope.ptorQuestionTextA = 'ptor-question-text-a' + $stateParams.questionID;
    $scope.ptorQuestionTextB = 'ptor-question-text-b' + $stateParams.questionID;
    
}]); 