/**
 * Show the schedule for today's baseball gam
 **/

$(function(){
  getGiantsGame();
});

function getGiantsGame(){
  $.get('/giants_schedule', function(data) {
    var html = formatGame(data);
    $("#giants").html(html);
  }, 'json');
  setTimeout(getGiantsGame, 60 *  60 * 1000);
};

function formatGame(data){
  var html = '';
  for(var x=0; x<data.length; x++){
    game = data[x];
    html += 'Giants game at '+game['START_TIME']+' - '+game['END_TIME']+'<br />';
  }
  if(html === ''){
    html = 'No home Giants game today<br />';
  }
  return html;
}
