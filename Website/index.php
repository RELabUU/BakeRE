<html>
	<head>
		<link rel='stylesheet' type='text/css' href='style.css'>
		<link href='https://fonts.googleapis.com/css?family=Dosis' rel='stylesheet'>
	</head>
	<body>
		<?php
		$servername = "localhost";
		$username = "your_username_here";
		$password = "your_password_here!";
		$dbname = "your_database_name_here";

		$page = $_SERVER['PHP_SELF'];
		$sec = "10";
		header("Refresh: $sec; url=$page");

		// Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);
		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		} 

		$sql = "SELECT name, score FROM scores ORDER BY score DESC";
		$result = $conn->query($sql);
		$index = 1;

		echo '<div><h1><b>BakeRE Highscores</b></h1>';

		if ($result->num_rows > 0) {
		    echo '<table class"highscore"><tr><th>Place</th><th>Name</th><th>Score</th></tr>';
		    // output data of each row
		    while($row = $result->fetch_assoc()) {
		        echo '<tr><td>'.$index.'</td><td>'.$row["name"].'</td><td>'.$row["score"].'</td></tr>';
		        $index++;
		    }
		    echo '</table>';
		} else {
		    echo "0 results";
		}

		echo '</div>';

		$conn->close();
		?>
	</body>
</html>