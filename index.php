<?php
  error_reporting(E_ALL);
  ini_set('display_errors', '1');
  require('backend/parser_php5.php');
?>
<html>
  <head>
    <title>What's It Like Outside?</title>
    <script type="text/javascript" src="clock.js"></script>
    <link rel="STYLESHEET" type="text/css" href="default.css" />
  </head>
  <body onload="updateClock(); setInterval('updateClock()', 1 * 1000 )">
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
            Saferide Boston All
          </a>
          <br />
          <div class="saferideprediction">
            <?php
              $url = 'http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=mit&r=saferidebostonall&d=manc58&s=beac528&ts=487comm';
              include('backend/saferide.php');
            ?>
          </div>
        </td>

        <td id="weather1">
          <?php include('backend/weather.php'); ?>
        </td>
      </tr>
    </table>
    <br />
    <br />
  </body>
</html>
