var app = angular.module("myApp", []);

app.controller("MainController", function ($scope) {

    // User model
    $scope.user = {};

    // Message to display on button click
    $scope.message = "";

    // Click Event for Form Submission
    $scope.submitForm = function () {
        if ($scope.userForm.$valid) {
            $scope.message = "Form Submitted Successfully!";
        } else {
            $scope.message = "Form has errors. Please fix them.";
        }
    };

    // Blur Event for Name Input
    $scope.onBlur = function () {
        console.log("Name input field lost focus.");
    };

    // Change Event for Role Selection
    $scope.onRoleChange = function () {
        console.log("Role changed to: " + $scope.user.role);
    };
});
