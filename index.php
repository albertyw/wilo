<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require('backend/parser_php5.php');
?>
<html>
<head>
<title>What's It Like Outside?</title>
<script type="text/javascript" src="clock.js"></script>
<link rel="STYLESHEET" type="text/css" href="/codes/wilo/default.css" />
</head>
<body onload="updateClock(); setInterval('updateClock()', 1000 )">
<div id="currentTime">
</div>

<table>
<tr>

<td id="rides">
<?php
/*<a href="http://www.nextbus.com/predictor/prediction.shtml?a=mit&r=saferidebostonw&d=mass84&s=manc58&ts=here32">
Saferide Boston West</a><br />
<div class="saferideprediction">
<?php
$url = 'http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=mit&r=saferidebostonw&d=mass84&s=manc58&ts=here32';
include('backend/saferide.php');
?>
</div>
*/
?>
<a href="http://www.nextbus.com/predictor/prediction.shtml?a=mit&r=saferidebostonall&d=manc58&s=beac528&ts=487comm">
Saferide Boston All</a><br />
<div class="saferideprediction">
<?php
$url = 'http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=mit&r=saferidebostonall&d=manc58&s=beac528&ts=487comm';
include('backend/saferide.php');
?>
</div>
<a href="#">Green Line Inbound</a><br />
<div class="greenlineprediction">
<?php
include('backend/greenline.php');
?>
</div>
</td>

<td id="weather1">
<?php include('backend/weather.php'); ?>
</td>

<!--
<td id="googlelatitude">
<iframe src="http://www.google.com/latitude/apps/badge/api?user=7266308918458089555&type=iframe&maptype=roadmap" width="400" height="400" frameborder="0"></iframe>
</td>
!-->
</tr>
</table>
<br />
<br />
</body>
</html>
