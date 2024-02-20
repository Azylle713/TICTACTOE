<?php
// Connect to the database
$conn = new mysqli("localhost", "root", "", "registration_db");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Select query
$sql = "SELECT * FROM reg_tbl";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data of each row
    while($row = $result->fetch_assoc()) {
        echo "Email: " . $row["email"]. " - Username: " . $row["username"]. "<br>";
    }
} else {
    echo "0 results";
}
$conn->close();
?>
