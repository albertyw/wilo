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
    angular.forEach($scope.stops, function(stop, index){
      var proximoUrl = 'http://proximobus.appspot.com/agencies/sf-muni/stops/'+stop.stop_id+'/predictions.json';
      $http.get(proximoUrl).success(function(data) {
        stop.times = parseTimes(data);
        stop.progress = calculateProgressBar(stop.times, 30);
        chime(index, $scope.nextTime[index], stop.times[0]);
        $scope.nextTime[index] = stop.times[0];
      });
    });
    $timeout(getTimes, 30 * 1000);
  };
  $scope.stops = stops;
  $scope.nextTime = [];
  getTimes();
});

// Filter format time array into string
wilo.filter('formatted_times', function() {
  return function(times) {
    var formatted_times = times.join(', ');
    if(times.length === 0) { formatted_times = 'Unknown'; }
    return formatted_times;
  };
});

wilo.controller('ClockController', function($scope, $timeout, $sce) {
  var getHour = function(date){
    return ((date.getHours()+11)%12+1);
  };
  var getSeparator = function(date){
    var separator = ':';
    if(date.getSeconds() % 2 === 1) { separator = '<span style="visibility:hidden">'+separator+'</span>'; }
    return separator;
  };
  var getMinute = function(date){
    var minute = date.getMinutes();
    if(minute < 10) { minute = '0'+minute; }
    return minute;
  };
  var getClock = function() {
    var date = new Date();
    var clock = getHour(date) + getSeparator(date) + getMinute(date);
    $scope.clock = $sce.trustAsHtml(clock);
    $timeout(getClock, 1000);
  };
  getClock();
});

/*
 * Parse the data returned from proximobus.appspot.com
 */
function parseTimes(proximoData) {
  proximoData = proximoData.items;
  var times = [];
  for(var i=0; i<proximoData.length; i++){
    times.push(parseInt(proximoData[i].minutes));
  }
  times.sort(function(x,y){return x-y;});
  return times;
}

var colors = [2, 4, 7];
/*
 * Find widths in order to make an arrival progress bar
 */
function calculateProgressBar(times, total_time){
  // Initialize time slots
  var time_slots = new Array(total_time);
  for(var i = 0; i < time_slots.length; i++){time_slots[i] = 'default';}

  // Populate time slots with values
  var arrival, s;
  for(i = 0; i < times.length; i++){
    arrival = times[i];
    // Red
    for(var j=0; j<colors[0]; j++){
      if(arrival-j < 0 || arrival-j > total_time-1){ continue; }
      s = time_slots[arrival-j];
      if(s !== 'warning' && s !== 'success') { time_slots[arrival-j] = 'danger'; }
    }
    // Yellow
    for(j=colors[0]; j<colors[1]; j++){
      if(arrival-j < 0 || arrival-j > total_time-1){ continue; }
      s = time_slots[arrival-j];
      if(s !== 'success') { time_slots[arrival-j] = 'warning'; }
    }
    // Green
    for(j=colors[1]; j<colors[2]; j++){
      if(arrival-j < 0 || arrival-j > total_time-1){ continue; }
      time_slots[arrival-j] = 'success';
    }
  }

  // Find lengths of times
  var time_lengths = [];
  var current_length = 0;
  var current_color = time_slots[0];
  for(i=0; i<time_slots.length; i++){
    if(time_slots[i] !== current_color){
      time_lengths.push([current_color, current_length]);
      current_color = time_slots[i+1];
      current_length = 0;
    }
    current_length += 1;
  }
  time_lengths.push([current_color, current_length]);

  // Convert lengths into percentages
  for(i=0; i<time_lengths.length; i++){
    time_lengths[i][1] = 100 * time_lengths[i][1] / total_time;
  }
  return time_lengths;
}

function chime(index, oldTime, newTime) {
  if(index === 0 && oldTime > 5 && newTime <= 5) {
    var audio = new Audio("/static/chime.mp3");
    audio.play();
  }
}
