<?php
$xml = file_get_contents($url);
$parser = new XMLParser($xml);

//Work the magic...
$parser->Parse();


$hasPredictions = false;
foreach($parser->document->predictions[0]->tagChildren as $tag){
  if($tag->tagName=='message'){
    if($tag->tagAttrs['text'] == 'Contact Info:Parking office 617-258-6510 Saferide office (After 6pm) 617-253-2997')
      continue;
    echo '<div class="saferidemessage">';
    echo $tag->tagAttrs['text'];
    echo '</div>';
  }
  if($tag->tagName=='direction')
    $hasPredictions = true;
}
if($hasPredictions){
  foreach($parser->document->predictions[0]->direction[0]->prediction as $prediction){
    $seconds = $prediction->tagAttrs['seconds'];
    echo floor($seconds/60).' Minutes '.($seconds%60).' Seconds<br />';
  }
}else{
  echo 'No Current Prediction';
}
/*


$url = 'http://www.nextbus.com/predictor/fancyBookmarkablePredictionLayer.shtml?a=mit&r=saferidebostonall&d=manc58&s=beac528&ts=487comm';
$fileContents = file_get_contents($url);

$prediction_location = strpos($fileContents, 'predictionNumberForFirstPred') + 72;
$prediction_location_end = strpos($fileContents, '</td>', $prediction_location);
$prediction = substr($fileContents, $prediction_location, $prediction_location_end - $prediction_location);
echo $prediction;
*/
