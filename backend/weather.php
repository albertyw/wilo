<link rel="STYLESHEET" type="text/css" href="http://forecast.weather.gov/afm/main.css" />
<link rel="STYLESHEET" type="text/css" href="/codes/wilo/backend/PointClick.css" />
<?php
$noaa_url = 'http://forecast.weather.gov/afm/PointClick.php?site=box&zmx=1&zmy=1&map.x=202&map.y=116';

$noaa_page = file_get_contents($noaa_url);

$start_index = strpos($noaa_page, '<a name="Today"></a>');
$end_index = strpos($noaa_page, '<div class="daydivider"></div>');
$end_index = strpos($noaa_page, '<div class="daydivider"></div>', $end_index+30);

$forecast = substr($noaa_page, $start_index, $end_index+29-$start_index);
$forecast = str_replace('src="image', 'src="http://forecast.weather.gov/afm/image', $forecast);
$forecast = str_replace('background:url(image/', 'background:url(http://forecast.weather.gov/afm/image/', $forecast);
$forecast = str_replace('<div class="clear"></div><div class="daydivider"></div>', '</td><td id="weather2">', $forecast);
echo $forecast;

