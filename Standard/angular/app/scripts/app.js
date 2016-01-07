'use strict';

/**
 * @ngdoc overview
 * @name calculateMyPaycheckApp
 * @description
 * # calculateMyPaycheckApp
 *
 * Main module of the application.
 */
angular
.module('calculateMyPaycheckApp', [
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMaterial',
  'ngResource',
  'ngRoute',
  'ngSanitize'
])
.controller('appCtrl', function($scope) {

  $scope.result = 0;

  var calculateResult = function() {
    $scope.result = $scope.rate * $scope.hours;

    if(isNaN($scope.result)) {
      $scope.result = 0;
    }
  };

  $scope.$watch('rate', function() {
    calculateResult();
  });
  $scope.$watch('hours', function() {
    calculateResult();
  });
});
