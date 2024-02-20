<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['username']) && isset($_POST['password'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];

        // Connect to the database
        $conn = new mysqli("localhost", "root", "", "registration_db");

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $stmt = $conn->prepare("SELECT * FROM reg_tbl WHERE Username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();

        if ($result->num_rows == 1 && password_verify($password, $row['Password'])) {
            $_SESSION['name'] = $row['Username'];
            echo "Login successful"; // Add this for debugging
            header("Location: index.php");
            exit();
        } else {
            $_SESSION['login_error'] = "Invalid username or password.";
            header("Location: login_page.php");
            exit();
        }

        $stmt->close();
        $conn->close();
    }
}
?>
