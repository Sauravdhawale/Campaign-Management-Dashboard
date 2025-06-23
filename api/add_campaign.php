<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "No input data"]);
    exit;
}

$sql = "INSERT INTO campaigns (account_manager, status, project_id, campaign_type, campaign_name, client_name, start_date, end_date, allocation, leads_delivered, leads_pending, pacing)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "ssssssssiiis",
    $data['accountManager'],
    $data['status'],
    $data['projectId'],
    $data['campaignType'],
    $data['campaignName'],
    $data['clientName'],
    $data['startDate'],
    $data['endDate'],
    $data['allocation'],
    $data['leadsDelivered'],
    $data['leadsPending'],
    $data['pacing']
);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}
?>
