<?php
$host = 'localhost';
$user = 'root';      // default for XAMPP
$pass = '';          // blank if you didn’t set one
$db   = 'demo';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die(json_encode(["error" => $conn->connect_error]));
}
?>
