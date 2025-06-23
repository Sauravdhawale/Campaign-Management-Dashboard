<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['id'])) {
    echo json_encode(["success" => false, "error" => "Invalid data"]);
    exit;
}

$id = (int) $data['id'];
$accountManager = $data['accountManager'];
$status = $data['status'];
$projectId = $data['projectId'];
$campaignType = $data['campaignType'];
$campaignName = $data['campaignName'];
$clientName = $data['clientName'];
$startDate = $data['startDate'];
$endDate = $data['endDate'];
$allocation = (int) $data['allocation'];
$leadsDelivered = (int) $data['leadsDelivered'];
$leadsPending = (int) $data['leadsPending'];
$pacing = $data['pacing'];

$sql = "UPDATE campaigns SET 
    account_manager = ?, status = ?, project_id = ?, campaign_type = ?, campaign_name = ?, 
    client_name = ?, start_date = ?, end_date = ?, allocation = ?, leads_delivered = ?, 
    leads_pending = ?, pacing = ? 
    WHERE id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "ssssssssiiisi",
    $accountManager,
    $status,
    $projectId,
    $campaignType,
    $campaignName,
    $clientName,
    $startDate,
    $endDate,
    $allocation,
    $leadsDelivered,
    $leadsPending,
    $pacing,
    $id
);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}
