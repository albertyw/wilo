<?php
require('db.php');

$curTime = date('G')*60 + date('i');
$result = mysql_query("SELECT departure FROM times WHERE departure>='$curTime' LIMIT 3") or die(mysql_error());
$i = 1;
while($row = mysql_fetch_array($result)){
    $hour = floor($row['departure']/60)%12;
    $minute = $row['departure']%60;
    if($minute<10){
        $minute = '0'.$minute;
    }
    echo $hour.':'.$minute;
    if($row['departure'] >= 720){
        echo 'PM';
    }else{
        echo 'AM';
    }
    if($i < 3) echo ' - ';
    $i++;
}
