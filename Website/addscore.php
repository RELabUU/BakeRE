<?php
$servername = "localhost";
$username = "your_username_here";
$password = "your_password_here!";
$dbname = "your_database_name_here";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

// $uniqueID = $_GET['uniqueID'];
$name = $_GET['name'];
$score = $_GET['score'];
$score1 = $_GET['score1'];
$score2 = $_GET['score2'];
$score3 = $_GET['score3'];
$score4 = $_GET['score4'];
$score5 = $_GET['score5'];
$time01 = $_GET['time01'];
$time02 = $_GET['time02'];
$time11 = $_GET['time11'];
$time12 = $_GET['time12'];
$time13 = $_GET['time13'];
$time14 = $_GET['time14'];
$time15 = $_GET['time15'];
$time21 = $_GET['time21'];
$time22 = $_GET['time22'];
$time23 = $_GET['time23'];
$time24 = $_GET['time24'];
$time25 = $_GET['time25'];
$time26 = $_GET['time26'];
$time27 = $_GET['time27'];
$time31 = $_GET['time31'];
$time32 = $_GET['time32'];
$time33 = $_GET['time33'];
$time34 = $_GET['time34'];
$time35 = $_GET['time35'];
$time36 = $_GET['time36'];
$time37 = $_GET['time37'];
$time41 = $_GET['time41'];
$time42 = $_GET['time42'];
$time43 = $_GET['time43'];
$time44 = $_GET['time44'];
$time45 = $_GET['time45'];

$sql = "INSERT INTO scores (name, score, score1, score2, score3, score4, score5, time01, time02, time11, time12, time13, time14, time15, time21, time22, time23, time24, time25, time26, time27, time31, time32, time33, time34, time35, time36, time37, time41, time42, time43, time44, time45)
VALUES ($name, $score, $score1, $score2, $score3, $score4, $score5, $time01, $time02, $time11, $time12, $time13, $time14, $time15, $time21, $time22, $time23, $time24, $time25, $time26, $time27, $time31, $time32, $time33, $time34, $time35, $time36, $time37, $time41, $time42, $time43, $time44, $time45)
ON DUPLICATE KEY UPDATE
   score = $score, 
   score1 = $score1, score2 = $score2, score3 = $score3, score4 = $score4, score5 = $score5,
   time01 = $time01, time02 = $time02,
   time11 = $time11, time12 = $time12, time13 = $time13, time14 = $time14, time15 = $time15,
   time21 = $time21, time22 = $time22, time23 = $time23, time24 = $time24, time25 = $time25, time26 = $time26, time27 = $time27,
   time31 = $time31, time32 = $time32, time33 = $time33, time34 = $time34, time35 = $time35, time36 = $time36, time37 = $time37,
   time41 = $time41, time42 = $time42, time43 = $time43, time44 = $time44, time45 = $time45;";


if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

$conn->close();
?>