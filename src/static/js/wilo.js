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
    angular.forEach(stops, function(stop, index){
      var proximoUrl = 'http://proximobus.appspot.com/agencies/sf-muni/stops/'+stop.stop_id+'/predictions.json';
      $http.get(proximoUrl).success(function(data) {
        stop.times = parseTimes(data);
        stop.progress = calculateProgressBar(stop.times, 30);
      });
    });
    $timeout(getTimes, 30 * 1000);
  }
  stops = addDefaultTimes(stops);
  $scope.stops = stops;
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
 * Put default times in stops so that there isn't an error before the first AJAX request is finished
 */
function addDefaultTimes(stops) {
  for(var i=0; i<stops.length; i++){
    stops[i].times = [];
  }
  return stops;
}

/*
 * Parse the data returned from proximobus.appspot.com
 */
function parseTimes(proximoData) {
  proximoData = proximoData.items;
  var times = [];
  var min_time = undefined;
  for(var i=0; i<proximoData.length; i++){
    var time = proximoData[i].minutes;
    if(time < min_time){
      min_time = time;
    }
    times.push(time);
  }
  if(min_time != undefined && times.length == 0){
    times.push(min_time);
  }
  times.sort();
  return times;
}
/*
 * Find widths in order to make an arrival progress bar
 */
function calculateProgressBar(times, total_time){
  // Initialize time slots
  var time_slots = new Array(total_time);
  for(var i = 0; i < time_slots.length; i++){time_slots[i] = 'default';}

  // Populate time slots with values
  for(var i = 0; i < times.length; i++){
    var arrival = times[i];
    // Red
    for(var j=0; j < 2; j++){
      s = time_slots[arrival-j];
      if(s != 'warning' && s != 'success') time_slots[arrival-j] = 'danger';
    }
    // Yellow
    for(var j=2; j < 6; j++){
      s = time_slots[arrival-j];
      if(s != 'success') time_slots[arrival-j] = 'warning';
    }
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
