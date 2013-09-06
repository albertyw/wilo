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
          <a href="http://www.nextbus.com/predictor/prediction.shtml?a=mit&r=saferidebostonw&s=manc58">
            Saferide Boston West
          </a>
          <br />
          <div class="saferideprediction">
            <?php
              $url = 'http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=mit&r=saferidebostonw&s=manc58';
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
