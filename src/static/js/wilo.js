// Angular App Setup
var wilo = angular.module('wilo', []);

// Set Angular to use {[{ instead of {{ so it doesn't conflict with Jinja/Flask
wilo.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

// Controller for stop times
wilo.controller('StopsController', function($scope, $http, $timeout) {
  var getTimes = function() {
    $http.get('data/times.json').success(function(data) {
      $scope.stops = data;
    });
    $timeout(getTimes, 30 * 1000);
  }
  getTimes();
});

// Filter format time array into string
wilo.filter('formatted_times', function() {
  return function(times) {
    formatted_times = times.join(', ');
    if(times.length == 0) formatted_times = 'Unknown';
    return formatted_times;
  };
});
