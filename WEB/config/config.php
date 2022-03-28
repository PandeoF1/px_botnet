<?php
# RAT configuration file
$downloadsPath = "";

# Don't change
$dbHost = "localhost";

# Don't change
$dbName = "db";

# Don't change
$dbUser = "user";

# Change
$dbPass = "pass";

$dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
// Reset connected bot if date += 30 secondes
$timezone  = 1;
$date = gmdate("Y-m-d H:i:s", (time() + 3600*($timezone+date("I"))) - 30);
$dbConnection->query("UPDATE hosts SET status = 'disconnected' WHERE date < '".$date ."'");
$date = gmdate("Y-m-d H:i:s", (time() + 3600*($timezone+date("I"))));
$dbConnection = NULL;
?>