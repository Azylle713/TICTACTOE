<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic Tac Toe Game Login</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="web.css">

    <?php

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
            $_SESSION['username'] = $username;
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

</head>
<body>
    <div class="container">
        <h2 class="text-center">Welcome back!</h2>
        <form action="loginprocess.php" method="POST">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" class="form-control" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" id="password" name="password" required>
            </div>
            <?php
            if(isset($_SESSION['login_error'])) {
                echo '<div class="alert alert-danger" role="alert">' . $_SESSION['login_error'] . '</div>';
                unset($_SESSION['login_error']);
            }
            ?>
            <button type="submit" class="btn btn-primary btn-block">Login</button>

    <div class="form-group play-as-guest-button">
        <a href="playasguest.php" class="btn btn-secondary btn-block" style="margin-top: 10px;">Play as guest</a>
    </div>
    <div class="text-center mt-3">
        <p>Don't have an account? <a href="register.php"><br>Register here</a></p>
    </div>

</body>
</html>
