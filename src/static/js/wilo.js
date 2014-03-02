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
      angular.forEach($scope.stops, function(stop, index){
        stop.progress = calculateProgressBar(stop.times, 30);
      });
    });
    $timeout(getTimes, 30 * 1000);
  }
  getTimes();
});

// Filter format time array into string
wilo.filter('formatted_times', function() {
  return function(times) {
    times.sort(function(a,b){return parseInt(a)-parseInt(b)});
    formatted_times = times.join(', ');
    if(times.length == 0) formatted_times = 'Unknown';
    return formatted_times;
  };
});

/*
 * Find widths in order to make an arrival progress bar
 */
function calculateProgressBar(times, total_time){
  // Initialize time slots
  var time_slots = new Array(total_time);
  for(var i = 0; i < time_slots.length; i++){time_slots[i] = 'default';}

  times.sort();

  // Populate time slots with values
  for(var i = 0; i < times.length; i++){
    var arrival = times[i];
    // Red
    for(var j=0; j < 2; j++){ time_slots[arrival-j] = 'danger';}
    // Yellow
    for(var j=2; j < 6; j++){ time_slots[arrival-j] = 'warning';}
    // Green
    for(var j=6; j < 10; j++){ time_slots[arrival-j] = 'success';}
  }

  // Find lengths of times
  var time_lengths = [];
  var current_length = 0;
  var current_color = time_slots[0];
  for(var i=0; i<time_slots.length; i++){
    if(time_slots[i] != current_color){
      time_lengths.push([current_color, current_length]);
      current_color = time_slots[i+1];
      current_length = 0;
    }
    current_length += 1;
  }
  time_lengths.push([current_color, current_length]);

  // Convert lengths into percentages
  for(var i=0; i<time_lengths.length; i++){
    time_lengths[i][1] = 100 * time_lengths[i][1] / total_time;
  }
  return time_lengths;
}
