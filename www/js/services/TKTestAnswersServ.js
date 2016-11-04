angular.module('TKTestAnswers',[])
.service('TKAnswersService',['$window', 'TestResultsRest', '$state',
    function ($window, TestResultsRest, $state) {
    var service = this;
    var answerCategories = {
        "competing": 0,
        "collaborating": 0,
        "compromising": 0,
        "avoiding": 0,
        "accommodating": 0
    };
    var categoriesStack = [];
   
    service.getAnswers = function() {
        return answerCategories;
    };
   
    service.saveAnswer = function(answerCategory) {
        answerCategories[answerCategory.toLowerCase()]++;
        categoriesStack.push(answerCategory);
    };
   
    service.resetAnswers = function() {
        for (var property in answerCategories) {
            if (answerCategories.hasOwnProperty(property)) {
                answerCategories[property] = 0;
            }
        }
    };
   
    service.eraseLastAnswer = function() {
        answerCategories[categoriesStack.pop().toLowerCase()]--;
    };
   
    service.saveTest = function(test) {
        test.userID = $window.localStorage.userID;
        // var tempTests = $window.localStorage.tests === undefined ? [] : JSON.parse($window.localStorage.tests);
        // tempTests.push(test);
        // $window.localStorage.tests = JSON.stringify(tempTests);
        TestResultsRest.save(test, $window.localStorage["token"])
            .then(function(response) {
                if (response.status == 200) {}
                else {
                    alert("error: test did not save");
                    $state.go('lobby');
                }
            });
    };
    
    service.getTests = function() {
            return TestResultsRest.getAll($window.localStorage["token"], $window.localStorage.userID) //$window.localStorage.token
                .then(function(response) {
                        if (response.status == 200) {
                            return response.data; 
                        } else {
                            alert("error: test results did not load");
                            $state.go('lobby');
                        }
                });    
    };
   
    service.setAnswers = function(answers)
    {
        answerCategories = answers;
    };
}]);