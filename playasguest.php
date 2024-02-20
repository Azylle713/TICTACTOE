<?php
session_start();

// Unset the 'name' session variable if it is set
if(isset($_SESSION['name'])) {
    unset($_SESSION['name']);
}

// Redirect to the index page
header("Location: index.php");
exit();
?>
