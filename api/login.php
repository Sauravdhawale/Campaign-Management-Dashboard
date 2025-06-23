<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include 'config.php';

// Read the raw POST body
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

// Check if the JSON is valid and contains required fields
if (!$data || !isset($data['email']) || !isset($data['password'])) {
    echo json_encode(["success" => false, "message" => "Missing email or password"]);
    exit;
}

$email = $data['email'];
$password = $data['password'];

// SQL to check login
$sql = "SELECT id, name, email, password, role FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
    if ($user["password"] === $password) {
        unset($user["password"]); // Remove password before returning
        echo json_encode($user);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid credentials"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
}
?>
