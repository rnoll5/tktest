angular.module('TKTestAnswers',[])
.service('TKAnswersService',['$window', 'TestResultsRest',
    function ($window, TestResultsRest) {
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
        test.userID=$window.localStorage.userID;
        // var tempTests = $window.localStorage.tests === undefined ? [] : JSON.parse($window.localStorage.tests);
        // tempTests.push(test);
        // $window.localStorage.tests = JSON.stringify(tempTests);
        TestResultsRest.save(test, $window.localStorage["token"])
        .then(function(response) {
            if (response.status == 200) {
            } else {
            alert("test did not save")
            }
            })
    };
    
    service.getTests = function(tests) {
        
        // TestResultsRest.getAll($window.localStorage["token"])//$window.localStorage.token
        //         var results = [];
        // // tests.forEach(function(tests){
        // //     //Search for tests with the specified token
        // //     if(tests.Test_Number == token)
        // //         results.push(tests);
        // // });
        // // return results    
        
    };
   
    service.setAnswers = function(answers)
    {
        answerCategories = answers;
    };
}]);