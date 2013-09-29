<html>
  <head>
    <title>What's It Like Outside?</title>
    <script type="text/javascript" src="backend/domaincheck.js"></script>
    <link rel="STYLESHEET" type="text/css" href="backend/default.css" />
  </head>
  <body>
    <table>
      <tr>

        <td id="rides">
          <?php include('backend/saferide.php'); ?>
        </td>

        <td id="weather">
          <?php include('backend/weather.php'); ?>
        </td>
      </tr>
    </table>
  </body>
</html>
