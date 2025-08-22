<?php
/**
 * ARSA Token - Admin Properties Management
 * Uses unified database configuration
 */

// Load configurations
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/config.php';

// Set content type
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/**
 * Send JSON response
 */
function sendResponse($success, $data = null, $message = '', $status = 200) {
    http_response_code($status);
    echo json_encode([
        'success' => $success,
        'data' => $data,
        'message' => $message,
        'timestamp' => date('c')
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

try {
    $method = $_SERVER['REQUEST_METHOD'];
    $db = getDatabase();
    
    switch ($method) {
        case 'GET':
            // Get all properties
            $sql = "SELECT p.*, 
                           COUNT(pi.id) as image_count,
                           ROUND((p.sold_nfts / p.total_nfts) * 100, 1) as progress_percentage
                    FROM properties p
                    LEFT JOIN property_images pi ON p.id = pi.property_id
                    WHERE p.is_active = 1
                    GROUP BY p.id
                    ORDER BY p.created_at DESC";
            
            $stmt = $db->prepare($sql);
            $stmt->execute();
            $properties = $stmt->fetchAll();
            
            // Format properties
            $formattedProperties = array_map(function($property) {
                return [
                    'id' => (int)$property['id'],
                    'name' => $property['name'],
                    'description' => $property['description'] ?? '',
                    'city' => $property['city'],
                    'country' => $property['country'] ?? 'Germany',
                    'property_type' => $property['property_type'],
                    'total_value' => (float)$property['total_value'],
                    'nft_price' => (float)$property['nft_price'],
                    'total_nfts' => (int)$property['total_nfts'],
                    'sold_nfts' => (int)$property['sold_nfts'],
                    'available_nfts' => (int)$property['available_nfts'],
                    'monthly_rent' => (float)$property['monthly_rent'],
                    'annual_yield' => (float)$property['annual_yield'],
                    'status' => $property['status'],
                    'main_image' => $property['main_image'] ?? '',
                    'image_count' => (int)$property['image_count'],
                    'progress_percentage' => (float)$property['progress_percentage'],
                    'monthly_income_per_nft' => round(($property['monthly_rent'] / $property['total_nfts']), 2),
                    'created_at' => $property['created_at'],
                    'updated_at' => $property['updated_at']
                ];
            }, $properties);
            
            sendResponse(true, [
                'properties' => $formattedProperties,
                'total' => count($formattedProperties)
            ], 'Properties loaded successfully');
            break;
            
        case 'POST':
            // Add new property
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input || empty($input['name'])) {
                sendResponse(false, null, 'Property name is required', 400);
            }
            
            $sql = "INSERT INTO properties (
                        name, description, city, country, property_type,
                        total_value, nft_price, total_nfts, available_nfts,
                        monthly_rent, annual_yield, status, main_image
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            
            $totalNfts = (int)($input['total_nfts'] ?? 1000);
            
            $stmt = $db->prepare($sql);
            $result = $stmt->execute([
                $input['name'],
                $input['description'] ?? '',
                $input['city'] ?? '',
                $input['country'] ?? 'Germany',
                $input['property_type'] ?? 'Office',
                (float)($input['total_value'] ?? 0),
                (float)($input['nft_price'] ?? 100),
                $totalNfts,
                $totalNfts, // available_nfts = total_nfts initially
                (float)($input['monthly_rent'] ?? 0),
                (float)($input['annual_yield'] ?? 0),
                $input['status'] ?? 'Available',
                $input['main_image'] ?? ''
            ]);
            
            if ($result) {
                sendResponse(true, [
                    'id' => $db->lastInsertId()
                ], 'Property added successfully', 201);
            } else {
                sendResponse(false, null, 'Failed to add property', 500);
            }
            break;
            
        default:
            sendResponse(false, null, 'Method not allowed', 405);
            break;
    }
    
} catch (Exception $e) {
    error_log("Admin Properties Error: " . $e->getMessage());
    sendResponse(false, null, 'Internal server error', 500);
}
?>