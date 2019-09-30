'use strict';

var mainApp = angular.module("mainApp", []);

mainApp.controller('questionController', function ($scope) {
  $scope.select2Options = {
    allowClear: true
  };
  $scope.selectChange = function () {
   
  };
});
