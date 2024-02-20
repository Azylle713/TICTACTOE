<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="index.css">
    <title>Tic Tac Toe Game</title>
    <script>
        function confirmLogout() {
            return confirm("Are you sure you want to log out?");
        }
    </script>
</head>

<body>

<div class="container">
    <?php
    if(isset($_SESSION['name']) && !empty($_SESSION['name'])) {
        echo "<p class='greeting'>Hello, " . $_SESSION['name'] . "</p>";
    } else {
        echo "<p class='greeting'>Hello, Guest</p>";
    }
    ?>
    
    <h1>TIC-TAC-TWO</h1>
    <a href="TIKTACTOE.php" class="button-link">Play Now</a>
    <a href="Login_page.php" class="button-link" onclick="return confirmLogout();">Log out</a>
    <p>CREATED BY: 
        <br>
        AVILA, SORIA, ILETO, GAMAZON, FRANSISCO</p>
</div>

</body>
</html>
