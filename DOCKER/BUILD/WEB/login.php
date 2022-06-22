<?php  
  # Necessary at the top of every page for session management
  session_start();
  
  # Includes the RAT configuration file
  include "config/config.php";

  # Establishes a connection to the RAT database
  # Uses variables from "config/config.php"
  # "SET NAMES utf8" is necessary to be Unicode-friendly
  $dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
?>
<?php
      # If the user clicked "Login"
      if (isset($_POST["submit"]))
      {
        $username = $_POST["username"]; # Username
        $password = $_POST["password"]; # Password
        
        # If all of the necessary fields are set
        if (isset($username) && !empty($username) && isset($password) && !empty($password))
        {
          # Determines if the username/password entered match a valid set of credentials
          
          $statement = $dbConnection->prepare("SELECT * FROM users");
          $statement->execute();

          $results = $statement->fetchAll();
          $ok = 0;
          foreach ($results as $row)
          {
            if (password_verify($password, $row["password"])){
              $ok = 1;
            }
          
          }

          # Kills database connection
          $statement->connection = null;
          # rowCount will be 1 if successful authentication
          if ($ok == 1)
          {
            # Successful authentication occurred
            # We now start a session
            $_SESSION["authenticated"] = 1;

            # Sets $_SESSION["username"] to the current logged in user
            # http://stackoverflow.com/questions/8703507/how-can-i-get-a-session-id-or-username-in-php
            $_SESSION["username"] = $username;

            # Redirects to index.php due to successful authentication
            header("Location: index.php");
          }
        }
      }
    ?>
<!DOCTYPE html>
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>P - X .Net</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>

<form class="box" action="login.php" method="post">
  <h1>Login</h1>
  <input type="text" name="username" placeholder="Username">
  <input type="password" name="password" placeholder="Password">
  <input type="submit" name="submit" value="Login">
</form>
<?php
      # If the user clicked "Login"
      if (isset($_POST["submit"]))
      {
        $username = $_POST["username"]; # Username
        $password = $_POST["password"]; # Password
        
        # If all of the necessary fields are set
        if (isset($username) && !empty($username) && isset($password) && !empty($password))
        {
          # Determines if the username/password entered match a valid set of credentials
          
          $statement = $dbConnection->prepare("SELECT * FROM users");
          $statement->execute();

          $results = $statement->fetchAll();
          $ok = 0;
          foreach ($results as $row)
          {
            if (password_verify($password, $row["password"])){
              $ok = 1;
            }
          
          }

          # Kills database connection
          $statement->connection = null;
          # rowCount will be 1 if successful authentication
          if ($ok == 1)
          {
            # Successful authentication occurred
            # We now start a session
            $_SESSION["authenticated"] = 1;

            # Sets $_SESSION["username"] to the current logged in user
            # http://stackoverflow.com/questions/8703507/how-can-i-get-a-session-id-or-username-in-php
            $_SESSION["username"] = $username;

            # Redirects to index.php due to successful authentication
            header("Location: index.php");
          }
          # Else failed authentication
          else
          {
            # Displays error message - "Invalid username or password"
            echo "<br><div class='alert alert-danger'>Invalid username or password.</div>";          
          }
        }
        # Not all fields were set
        else
        {
          # Displays error message - "Please fill out all fields."
          echo "<br><div class='alert alert-danger'>Please fill out all fields.</div>";
        }
      }
    ?>

  </body>
</html>
