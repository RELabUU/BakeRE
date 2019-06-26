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

$sql = "SELECT uniqueID FROM scores";
$result = $conn->query($sql);

if ($result=mysqli_query($conn,$sql))
  {
  // Fetch one and one row
  while ($row=mysqli_fetch_row($result))
    {
    printf ("%s@", $row[0]);
    }
  // Free result set
  mysqli_free_result($result);
}

$conn->close();
?>