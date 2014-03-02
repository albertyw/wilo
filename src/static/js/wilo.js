// Angular App Setup
var wilo = angular.module('wilo', []);

// Set Angular to use {[{ instead of {{ so it doesn't conflict with Jinja/Flask
wilo.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

// Controller for stop times
wilo.controller('StopsController', function($scope, $http) {
  $http.get('data/times.json').success(function(data) {
    for(var i=0; i<data.length; i++){
      data[i].formatted_times = data[i].times.join(', ')
    }
    $scope.stops = data;
  });
});

