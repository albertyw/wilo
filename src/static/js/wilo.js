// Angular App Setup
var wilo = angular.module('wilo', []);

// Set Angular to use {[{ instead of {{ so it doesn't conflict with Jinja/Flask
wilo.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
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
