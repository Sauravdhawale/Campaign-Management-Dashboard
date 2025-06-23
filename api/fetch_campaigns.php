<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include 'config.php';

$sql = "SELECT * FROM campaigns";
$result = $conn->query($sql);
$campaigns = [];

while ($row = $result->fetch_assoc()) {
    $campaigns[] = $row;
}

echo json_encode($campaigns);
?>
