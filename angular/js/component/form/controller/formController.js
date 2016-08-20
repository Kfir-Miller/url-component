app.controller("formController", ['$scope','$http', function ($scope,$http) {
    //form data
    $scope.form = {
        answer:{
            url:""
        },
        id:40
    };
    $scope.submitForm = function(){
        if (!$scope.urlForm.$valid) {
            console.log("invalid");
            return;
        }
        $http.post("http://localhost:3000/answers/" + $scope.form.id, $scope.form).then(function (response) {
                alert("Verzonden!");
            },function(){
                alert("Er is iets fout gegaan");
            });
    }
}]);