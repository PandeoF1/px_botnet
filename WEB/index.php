<?php
# Necessary at the top of every page for session management
session_start();

# If the RAT user isn't authenticated
if (!isset($_SESSION["authenticated"])) {
	# Redirects them to 403.php page
	header("Location: 403.php");
}
# Else they are authenticated
else {
	# Includes the RAT configuration file
	include "config/config.php";

	# Establishes a connection to the RAT database
	# Uses variables from "config/config.php"
	# "SET NAMES utf8" is necessary to be Unicode-friendly
	$dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
}
?>

<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
	<title>P - X .Net</title>
	<link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i">
	<link rel="stylesheet" href="assets/fonts/fontawesome-all.min.css">
	<link rel="stylesheet" href="assets/fonts/font-awesome.min.css">
	<link rel="stylesheet" href="assets/fonts/fontawesome5-overrides.min.css">
	<link rel="stylesheet" href="assets/css/untitled-1.css">
	<link rel="stylesheet" href="assets/css/untitled.css">
	<link rel="stylesheet" href="assets/css/jquery-jvectormap-2.0.5.css" type="text/css" media="screen" />
	<script src="assets/js/jquery.min.js"></script>
	<script src="assets/bootstrap/js/bootstrap.min.js"></script>
	<script src="assets/js/chart.min.js"></script>
	<script src="assets/js/bs-init.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.js"></script>
	<script src="assets/js/theme.js"></script>
	<script src="assets/js/jquery.js"></script>
	<script src="assets/js/jquery-jvectormap-2.0.5.min.js"></script>
	<script src="assets/js/jquery-jvectormap-world-mill-en.js"></script>
</head>

<body id="page-top">
	<div id="wrapper">
		<nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0" style="background: #23272a;">
			<div class="container-fluid d-flex flex-column p-0"><a class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
					<div class="sidebar-brand-icon rotate-n-15"><i class="fas fa-network-wired"></i></div>
					<div class="sidebar-brand-text mx-3"><span>P - X .NET</span></div>
				</a>
				<hr class="sidebar-divider my-0">
				<ul class="nav navbar-nav text-light" id="accordionSidebar">
					<li class="nav-item"><a class="nav-link active" href="index.php"><i class="fas fa-tachometer-alt"></i><span>&nbsp; Dashboard</span></a></li>
					<li class="nav-item"><a class="nav-link" href="hosts.php"><i class="fas fa-user"></i><span>&nbsp; Bot</span></a></li>
					<li class="nav-item"><a class="nav-link" href="tasks.php"><i class="fas fa-table"></i><span>&nbsp; Task</span></a></li>
					<li class="nav-item"><a class="nav-link" href="output.php"><i class="fas fa-exclamation-circle"></i><span>&nbsp; Log</span></a></li>
					<li class="nav-item"><a class="nav-link" href="account.php"><i class="fas fa-window-maximize"></i><span>&nbsp; Account Management</span></a><a class="nav-link" href="network.php"><i class="fa fa-eercast"></i><span>&nbsp; Network Management</span></a></li>
				</ul>
				<div class="text-center d-none d-md-inline"><button class="btn rounded-circle border-0" id="sidebarToggle" type="button"></button></div>
			</div>
		</nav>
		<div class="d-flex flex-column" id="content-wrapper">
			<div id="content">
				<nav class="navbar navbar-expand shadow topbar static-top" style="background: #2c2f33;">
					<div class="container-fluid"><button class="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i class="fas fa-bars"></i></button>
						<form class="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
							<div class="input-group"></div>
						</form>
						<ul class="navbar-nav flex-nowrap ms-auto">
							<li class="nav-item dropdown d-sm-none no-arrow"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><i class="fas fa-search"></i></a>
								<div class="dropdown-menu dropdown-menu-end p-3 animated--grow-in" aria-labelledby="searchDropdown">
									<form class="me-auto navbar-search w-100">
										<div class="input-group"><input class="form-control border-0 small" type="text" placeholder="Search for ...">
											<div class="input-group-append"><button class="btn btn-primary py-0" type="button"><i class="fas fa-search"></i></button></div>
										</div>
									</form>
								</div>
							</li>
							<li class="nav-item dropdown no-arrow mx-1">
								<div class="nav-item dropdown no-arrow"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><span class="badge bg-danger badge-counter"></span></a>
									<div class="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
										<h6 class="dropdown-header">alerts center</h6><a class="dropdown-item d-flex align-items-center" href="#">
											<div class="me-3">
												<div class="bg-primary icon-circle"><i class="fas fa-file-alt text-white"></i></div>
											</div>
											<div><span class="small text-gray-500">December 12, 2019</span>
												<p>A new monthly report is ready to download!</p>
											</div>
										</a><a class="dropdown-item d-flex align-items-center" href="#">
											<div class="me-3">
												<div class="bg-success icon-circle"><i class="fas fa-donate text-white"></i></div>
											</div>
											<div><span class="small text-gray-500">December 7, 2019</span>
												<p>$290.29 has been deposited into your account!</p>
											</div>
										</a><a class="dropdown-item d-flex align-items-center" href="#">
											<div class="me-3">
												<div class="bg-warning icon-circle"><i class="fas fa-exclamation-triangle text-white"></i></div>
											</div>
											<div><span class="small text-gray-500">December 2, 2019</span>
												<p>Spending Alert: We've noticed unusually high spending for your account.</p>
											</div>
										</a><a class="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
									</div>
								</div>
							</li>
							<li class="nav-item dropdown no-arrow mx-1">
								<div class="nav-item dropdown no-arrow"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"></a>
									<div class="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
										<h6 class="dropdown-header">alerts center</h6><a class="dropdown-item d-flex align-items-center" href="#">
											<div class="dropdown-list-image me-3"><img class="rounded-circle" src="assets/img/avatars/avatar4.jpeg">
												<div class="bg-success status-indicator"></div>
											</div>
											<div class="fw-bold">
												<div class="text-truncate"><span>Hi there! I am wondering if you can help me with a problem I've been having.</span></div>
												<p class="small text-gray-500 mb-0">Emily Fowler - 58m</p>
											</div>
										</a><a class="dropdown-item d-flex align-items-center" href="#">
											<div class="dropdown-list-image me-3"><img class="rounded-circle" src="assets/img/avatars/avatar2.jpeg">
												<div class="status-indicator"></div>
											</div>
											<div class="fw-bold">
												<div class="text-truncate"><span>I have the photos that you ordered last month!</span></div>
												<p class="small text-gray-500 mb-0">Jae Chun - 1d</p>
											</div>
										</a><a class="dropdown-item d-flex align-items-center" href="#">
											<div class="dropdown-list-image me-3"><img class="rounded-circle" src="assets/img/avatars/avatar3.jpeg">
												<div class="bg-warning status-indicator"></div>
											</div>
											<div class="fw-bold">
												<div class="text-truncate"><span>Last month's report looks great, I am very happy with the progress so far, keep up the good work!</span></div>
												<p class="small text-gray-500 mb-0">Morgan Alvarez - 2d</p>
											</div>
										</a><a class="dropdown-item d-flex align-items-center" href="#">
											<div class="dropdown-list-image me-3"><img class="rounded-circle" src="assets/img/avatars/avatar5.jpeg">
												<div class="bg-success status-indicator"></div>
											</div>
											<div class="fw-bold">
												<div class="text-truncate"><span>Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...</span></div>
												<p class="small text-gray-500 mb-0">Chicken the Dog · 2w</p>
											</div>
										</a><a class="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
									</div>
								</div>
								<div class="shadow dropdown-list dropdown-menu dropdown-menu-end" aria-labelledby="alertsDropdown"></div>
							</li>
							<li class="nav-item dropdown no-arrow">
								<div class="nav-item dropdown no-arrow"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><span class="d-none d-lg-inline me-2 text-gray-600 small"><?php echo $_SESSION["username"] ?></span></a>
									<div class="dropdown-menu shadow dropdown-menu-end animated--grow-in"><a class="dropdown-item" href="#"><i class="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Profile</a><a class="dropdown-item" href="#"><i class="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Settings</a><a class="dropdown-item" href="#"><i class="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Activity log</a>
										<div class="dropdown-divider"></div><a class="dropdown-item" href="#"><i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Logout</a>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</nav>
				<div class="container-fluid" style="background: #2c2f33;">
					<div class="d-sm-flex justify-content-between align-items-center mb-4">
						<h3 class="text-light mb-0">Dashboard</h3>
					</div>
					<div class="row">
						<div class="col-md-6 col-xl-4 col-xxl-4 mb-4">
							<div class="card shadow border-start-primary py-2">
								<div class="card-body">
									<div class="row align-items-center no-gutters">
										<div class="col me-2">
											<div class="text-uppercase text-primary fw-bold text-xs mb-1"><span>bot connected</span></div>
											<?php
											$statement = $dbConnection->prepare("SELECT * FROM hosts where status = 'connected'");
											$statement->execute();

											$bot = $statement->rowCount();

											$statement = $dbConnection->prepare("SELECT * FROM hosts");
											$statement->execute();

											$allbots = $statement->rowCount();

											$botdisconnected = $allbots - $bot;

											$statement = $dbConnection->prepare("SELECT * FROM hosts where status = 'deleted'");
											$statement->execute();

											$botdeleted = $statement->rowCount();
											?>
											<div class="text-dark font-weight-bold h5 mb-0" name="botconnected" id="botconnected"><span><?php echo $bot, "/", $botdisconnected; ?></span></div>
										</div>
										<div class="col-auto">
											<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" class="bi bi-cpu fa-2x text-gray-300">
												<path fill-rule="evenodd" d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"></path>
											</svg>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-xl-4 col-xxl-4 mb-4">
							<div class="card shadow border-start-success py-2">
								<div class="card-body">
									<div class="row align-items-center no-gutters">
										<div class="col me-2">
											<div class="text-uppercase text-success fw-bold text-xs mb-1"><span>Uptime</span></div>
											<div class="row no-gutters align-items-center">
												<div class="col-auto">
													<?php
													$str   = @file_get_contents('/proc/uptime');
													$num   = floatval($str);
													$secs  = fmod($num, 60);
													$num = intdiv($num, 60);
													$mins  = $num % 60;
													$num = intdiv($num, 60);
													$hours = $num % 24;
													$num = intdiv($num, 24);
													$days  = $num;
													?>

													<div class="text-dark font-weight-bold h5 mb-0 mr-3"><span><strong><?php echo $days;
																														echo ":";
																														echo $hours;
																														echo ":";
																														echo $mins;
																														echo ":";
																														echo round($secs) ?></strong><br></span></div>
												</div>
											</div>
										</div>
										<div class="col-auto"><a href="world/"><i class="fas fa-globe-europe fa-2x text-gray-300"></i></a></div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-xl-4 col-xxl-4 mb-4">
							<div class="card shadow border-start-info py-2">
								<div class="card-body">
									<div class="row align-items-center no-gutters">
										<div class="col me-2">
											<?php
											$statement = $dbConnection->prepare("SELECT * FROM hosts where status = 'connected'");
											$statement->execute();

											$bot = $statement->rowCount();
											$statement = $dbConnection->prepare("SELECT * FROM hosts");
											$statement->execute();

											$allbots = $statement->rowCount();
											if ($allbots == 0)
												$percentage = 0;
											else
												$percentage = round((($bot / $allbots) * 100), 0);
											?>
											<div class="text-uppercase text-info fw-bold text-xs mb-1"><span>Connected bot / Total bot</span></div>
											<div class="row g-0 align-items-center">
												<div class="col-auto">
													<div class="text-dark fw-bold h5 mb-0 me-3"><span><?php echo $percentage . "%"; ?></span></div>
												</div>
												<div class="col">
													<div class="progress progress-sm">
														<div class="progress-bar" role="progressbar" style="width: <?php echo $percentage . "%"; ?>;" aria-valuenow="<?php echo $bot; ?>" aria-valuemin="0" aria-valuemax="<?php echo $allbots; ?>"></div>
													</div>
												</div>
											</div>
										</div>
										<div class="col-auto"><i class="fas fa-clipboard-list fa-2x text-gray-300"></i></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-7 col-xl-8 col-xxl-8">
							<div class="card shadow mb-4">
								<div class="card-header d-flex justify-content-between align-items-center">
									<h6 class="text-primary fw-bold m-0">Latest</h6>
									<div class="dropdown no-arrow"><button class="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button"></button>
										<div class="dropdown-menu shadow dropdown-menu-end animated--fade-in">
											<p class="text-center dropdown-header">dropdown header:</p><a class="dropdown-item" href="#">&nbsp;Action</a><a class="dropdown-item" href="#">&nbsp;Another action</a>
											<div class="dropdown-divider"></div><a class="dropdown-item" href="#">&nbsp;Something else here</a>
										</div>
									</div>
								</div>
								<div class="card-body" style="height: 460px;">
									<div class="chart-area">
										<?php
										date_default_timezone_set('Asia/Kolkata');
										function count_array_values($my_array, $match)
										{
											$count = 0;
											$match = date('Y-m-d', strtotime($match));

											foreach ($my_array as $key => $value) {
												$value = date('Y-m-d', strtotime($value['date-create']));
												if ($value == $match) {
													$count++;
												}
											}

											return $count;
										}

										$d0 = date("Y-m-d H:i:s");
										$d1 = date("Y-m-d H:i:s", strtotime("-1 days"));
										$d2 = date("Y-m-d H:i:s", strtotime("-2 days"));
										$d3 = date("Y-m-d H:i:s", strtotime("-3 days"));
										$d4 = date("Y-m-d H:i:s", strtotime("-4 days"));
										$d5 = date("Y-m-d H:i:s", strtotime("-5 days"));
										$d6 = date("Y-m-d H:i:s", strtotime("-6 days"));
										$statement = $dbConnection->prepare("SELECT `date-create` FROM hosts");
										$statement->execute();
										$results = $statement->fetchAll();
										$d0 = count_array_values($results, $d0);
										$d1 = count_array_values($results, $d1);
										$d2 = count_array_values($results, $d2);
										$d3 = count_array_values($results, $d3);
										$d4 = count_array_values($results, $d4);
										$d5 = count_array_values($results, $d5);
										$d6 = count_array_values($results, $d6);
										?>
										<canvas id="botschart" style="width:100%"></canvas>
										<script>
											var ctxL = document.getElementById("botschart").getContext('2d');
											var canvas = document.getElementById('botschart');
											var heightRatio = 1.5;
											canvas.height = canvas.width * heightRatio;
											var botschart = new Chart(ctxL, {
												type: 'line',
												data: {
													labels: ["<?php echo date("m/d", strtotime("-6 days")) ?>",
														"<?php echo date("m/d", strtotime("-5 days")) ?>",
														"<?php echo date("m/d", strtotime("-4 days")) ?>",
														"<?php echo date("m/d", strtotime("-3 days")) ?>",
														"<?php echo date("m/d", strtotime("-2 days")) ?>",
														"<?php echo date("m/d", strtotime("-1 days")) ?>",
														"<?php echo date("m/d") ?>"
													],
													datasets: [{
														label: "Latest week new bots",
														data: [<?php echo $d6 ?>,
															<?php echo $d5 ?>,
															<?php echo $d4 ?>,
															<?php echo $d3 ?>,
															<?php echo $d2 ?>,
															<?php echo $d1 ?>,
															<?php echo $d0 ?>
														],
														backgroundColor: [
															'rgba(0, 137, 132, .2)',
														],
														borderColor: [
															'rgba(0, 10, 130, .7)',
														],
														borderWidth: 2
													}]
												},
												options: {
													responsive: true,
													legend: {
														display: false,
													}
												}
											});
										</script>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-5 col-xl-4">
							<div class="card shadow mb-4">
								<div class="card-header d-flex justify-content-between align-items-center">
									<h6 class="text-primary fw-bold m-0">BOTS</h6>
									<div class="dropdown no-arrow"><button class="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button"></button>
										<div class="dropdown-menu shadow dropdown-menu-end animated--fade-in">
											<p class="text-center dropdown-header">dropdown header:</p><a class="dropdown-item" href="#">&nbsp;Action</a><a class="dropdown-item" href="#">&nbsp;Another action</a>
											<div class="dropdown-divider"></div><a class="dropdown-item" href="#">&nbsp;Something else here</a>
										</div>
									</div>
								</div>
								<div class="card-body" style="height: 460px;">
									<!--
									<div class="chart-area"><canvas data-bss-chart="{&quot;type&quot;:&quot;doughnut&quot;,&quot;data&quot;:{&quot;labels&quot;:[&quot;Connecté&quot;,&quot;Déconnecté&quot;],&quot;datasets&quot;:[{&quot;label&quot;:&quot;&quot;,&quot;backgroundColor&quot;:[&quot;#32cd32&quot;,&quot;#ff0000&quot;],&quot;borderColor&quot;:[&quot;#ffffff&quot;,&quot;#ffffff&quot;],&quot;data&quot;:[&quot;<?php echo $bot ?>&quot;,&quot;<?php echo $botdisconnected ?>&quot;]}]},&quot;options&quot;:{&quot;maintainAspectRatio&quot;:false,&quot;legend&quot;:{&quot;display&quot;:false,&quot;labels&quot;:{&quot;fontStyle&quot;:&quot;normal&quot;}},&quot;title&quot;:{&quot;fontStyle&quot;:&quot;normal&quot;}}}"></canvas></div>
									<div class="text-center small mt-4"><span class="me-2"><i class="fas fa-circle text-success"></i>&nbsp;Connecté</span><span class="me-2"><i class="fas fa-circle text-danger"></i>&nbsp;Déconnecté</span></div>
									-->
									<iframe src="world/" style="height: 100%; width: 100%;"></iframe>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-12 col-xl-12">
							<div class="card shadow mb-4">
								<div class="card-header py-3" style="color: rgb(133, 135, 150);">
									<div class="row">
										<h6 class="text-primary fw-bold m-0 col-10">Maps</h6>
										<button class="btn btn-primary col-2 btn-sm" onclick="showhide();">Other map</button>&nbsp;
									</div>
								</div>
								<div class="card-body">

									<!--MAP 1-->
									<div id="map_1" style="width: 100%; height: 600px;">
										<script>
											var list = [];
											$(function() {
												$('#map_1').vectorMap({
													map: 'world_mill_en',
													onMarkerClick: function(event, index) {
														for (var i in list) {
															if (i == index) {
																test = list[i];
																test = `https://www.google.com/maps/place/${test}`;
																console.log(test);
																window.open(test);

															}
														}


													},
													normalizeFunction: 'polynomial',
													hoverOpacity: 0.7,
													hoverColor: false,
													markerStyle: {
														initial: {
															fill: '#32cd32',
															stroke: '#383f47'
														}
													},
													backgroundColor: '#383f47',
													markers: [
														<?php

														$statement = $dbConnection->prepare("SELECT * FROM hosts where status = 'connected'");
														$statement->execute();
														$hosts = $statement->fetchAll();

														$statement->connection = null;

														foreach ($hosts as $row) {
															if (isset($row["geoloc"])) { ?>
														<?php
																echo "{latLng: [" . $row["geoloc"] . "], name: ['" . $row["hostname"] . "']},";
															}
														}
														?>
													]
												})
											});
											<?php

											$statement = $dbConnection->prepare("SELECT * FROM hosts");
											$statement->execute();
											$hosts = $statement->fetchAll();

											$statement->connection = null;

											foreach ($hosts as $row) {
												if (isset($row["geoloc"])) { ?>
													list.push("<?php echo $row["geoloc"] ?>");
											<?php
												}
											}
											?>
										</script>
									</div>

									<!--MAP 2-->
									<div id="map_2" style="width: 100%; height: 600px;">
										<script>
											var list = [];
											$(function() {
												$('#map_2').vectorMap({
													map: 'world_mill_en',
													onMarkerClick: function(event, index) {
														for (var i in list) {
															if (i == index) {
																test = list[i];
																test = `https://www.google.com/maps/place/${test}`;
																console.log(test);
																window.open(test);

															}
														}


													},
													normalizeFunction: 'polynomial',
													hoverOpacity: 0.7,
													hoverColor: false,
													markerStyle: {
														initial: {
															fill: '#ff0000',
															stroke: '#383f47'
														}
													},
													backgroundColor: '#383f47',
													markers: [
														<?php

														$statement = $dbConnection->prepare("SELECT * FROM hosts where status = 'disconnected'");
														$statement->execute();
														$hosts = $statement->fetchAll();

														$statement->connection = null;

														foreach ($hosts as $row) {
															if (isset($row["geoloc"])) { ?>
														<?php
																echo "{latLng: [" . $row["geoloc"] . "], name: ['" . $row["hostname"] . "']},";
															}
														}
														?>
													]
												})
											});
											<?php

											$statement = $dbConnection->prepare("SELECT * FROM hosts");
											$statement->execute();
											$hosts = $statement->fetchAll();

											$statement->connection = null;

											foreach ($hosts as $row) {
												if (isset($row["geoloc"])) { ?>
													list.push("<?php echo $row["geoloc"] ?>");
											<?php
												}
											}
											?>
										</script>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<footer class="sticky-footer" style="background: #2c2f33;">
				<div class="container my-auto">
					<div class="text-center my-auto copyright"><span>Copyright © Brand 2022</span></div>
				</div>
			</footer>
		</div><a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a>
	</div>
	<script src="assets/bootstrap/js/bootstrap.min.js"></script>
	<script src="assets/js/chart.min.js"></script>
	<script src="assets/js/script.min.js"></script>
	<script>
		function showhide() {
			if (document.getElementById("map_1").hidden) {
				document.getElementById("map_1").hidden = false;
				document.getElementById("map_2").hidden = true;
			} else {
				document.getElementById("map_1").hidden = true;
				document.getElementById("map_2").hidden = false;
			}
		}

		function sleep(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}
		async function load() {
			await sleep(10);
			showhide();
			showhide();
		}
		load();
	</script>
</body>

</html>