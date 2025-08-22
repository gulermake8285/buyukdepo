<?php
/**
 * ARSA Token API - Main Entry Point
 * Simplified and clean API structure
 */

// CORS Headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database configuration - UPDATE WITH YOUR ACTUAL CREDENTIALS
$DB_CONFIG = [
    'host' => 'localhost',
    'name' => 'u2368732_arsanew',
    'user' => 'u2368732_arsa', 
    'pass' => 'R0DE034jvc56!!!',
    'charset' => 'utf8mb4'
];

// Helper function for JSON responses
function sendResponse($success, $data = null, $message = '', $status = 200) {
    http_response_code($status);
    echo json_encode([
        'success' => $success,
        'data' => $data,
        'message' => $message,
        'timestamp' => date('c'),
        'api_version' => '1.0.0'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Database connection
function getDatabase() {
    global $DB_CONFIG;
    
    try {
        $dsn = "mysql:host={$DB_CONFIG['host']};dbname={$DB_CONFIG['name']};charset={$DB_CONFIG['charset']}";
        $pdo = new PDO($dsn, $DB_CONFIG['user'], $DB_CONFIG['pass'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
        return $pdo;
    } catch (PDOException $e) {
        sendResponse(false, null, 'Database connection failed', 500);
    }
}

// Simple routing
$request = $_SERVER['REQUEST_URI'];
$path = parse_url($request, PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Remove base path
$basePath = dirname($_SERVER['SCRIPT_NAME']);
if ($basePath !== '/') {
    $path = substr($path, strlen($basePath));
}

try {
    switch ($path) {
        case '/':
        case '/health':
            // Health check
            sendResponse(true, [
                'status' => 'ok',
                'message' => 'ARSA API is running',
                'endpoints' => [
                    'GET /health' => 'API health check',
                    'GET /properties' => 'Get all properties',
                    'GET /properties/{id}' => 'Get single property',
                    'POST /properties' => 'Add new property (admin only)'
                ]
            ]);
            break;
            
        case '/properties':
            if ($method === 'GET') {
                // Get all properties
                $db = getDatabase();
                
                $sql = "SELECT 
                            id, name, description, city, country, property_type,
                            total_value, nft_price, total_nfts, sold_nfts, available_nfts,
                            monthly_rent, annual_yield, status, main_image, created_at
                        FROM properties 
                        WHERE is_active = 1 
                        ORDER BY created_at DESC";
                
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
                        'created_at' => $property['created_at']
                    ];
                }, $properties);
                
                sendResponse(true, [
                    'properties' => $formattedProperties,
                    'total' => count($formattedProperties)
                ], 'Properties loaded successfully');
                
            } elseif ($method === 'POST') {
                // Add new property (simplified - no auth check for now)
                $input = json_decode(file_get_contents('php://input'), true);
                
                if (!$input) {
                    sendResponse(false, null, 'Invalid JSON data', 400);
                }
                
                $db = getDatabase();
                
                $sql = "INSERT INTO properties (
                            name, description, city, country, property_type,
                            total_value, nft_price, total_nfts, available_nfts,
                            monthly_rent, annual_yield, status, main_image
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                
                $stmt = $db->prepare($sql);
                $stmt->execute([
                    $input['name'] ?? '',
                    $input['description'] ?? '',
                    $input['city'] ?? '',
                    $input['country'] ?? 'Germany',
                    $input['property_type'] ?? 'Office',
                    $input['total_value'] ?? 0,
                    $input['nft_price'] ?? 100,
                    $input['total_nfts'] ?? 1000,
                    $input['total_nfts'] ?? 1000, // available_nfts = total_nfts initially
                    $input['monthly_rent'] ?? 0,
                    $input['annual_yield'] ?? 0,
                    $input['status'] ?? 'Available',
                    $input['main_image'] ?? ''
                ]);
                
                sendResponse(true, [
                    'id' => $db->lastInsertId()
                ], 'Property added successfully', 201);
            }
            break;
            
        default:
            // Check if it's a property detail request (/properties/123)
            if (preg_match('/^\/properties\/(\d+)$/', $path, $matches)) {
                $propertyId = $matches[1];
                
                $db = getDatabase();
                $sql = "SELECT * FROM properties WHERE id = ? AND is_active = 1";
                $stmt = $db->prepare($sql);
                $stmt->execute([$propertyId]);
                $property = $stmt->fetch();
                
                if ($property) {
                    sendResponse(true, $property, 'Property loaded successfully');
                } else {
                    sendResponse(false, null, 'Property not found', 404);
                }
            } else {
                sendResponse(false, null, 'Endpoint not found', 404);
            }
            break;
    }
    
} catch (Exception $e) {
    error_log("API Error: " . $e->getMessage());
    sendResponse(false, null, 'Internal server error', 500);
}
?>