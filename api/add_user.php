<?php
header("Access-Control-Allow-Origin: *"); // Allow all domains (or specify your React app's origin)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'config.php'; // your DB connection


// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['name']) || !isset($data['email']) || !isset($data['password']) || !isset($data['role'])) {
    echo json_encode(["success" => false, "error" => "Missing required fields"]);
    exit;
}

// Escape inputs to prevent SQL injection (better yet, use prepared statements)
$name = $conn->real_escape_string($data['name']);
$email = $conn->real_escape_string($data['email']);
$password = $conn->real_escape_string($data['password']);
$role = $conn->real_escape_string($data['role']);

// Insert into database
$sql = "INSERT INTO users (name, email, password, role) VALUES ('$name', '$email', '$password', '$role')";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}
?>
