/**
 * Rotate backgrounds through backgrounds.json, from https://github.com/dconnolly/Chromecast-Backgrounds
 **/


var backgrounds = [];
$(function(){
  $.getJSON('/static/backgrounds.json', function(data) {
    backgrounds = data;
    rotateBackground();
  });
});

function rotateBackground(){
  if(backgrounds.length !== 0){
    var index = Math.floor(Math.random() * backgrounds.length);
    var backgroundImage = backgrounds[index]['url'];
    $("#background").attr('src', backgroundImage);
  }
  setTimeout(rotateBackground, 5 * 60 * 1000);
};
