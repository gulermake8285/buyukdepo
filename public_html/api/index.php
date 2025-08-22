<?php
/**
 * ARSA Token API - Simplified Main Entry Point
 * Clean and organized API structure
 */

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);

// CORS Headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Load unified database configuration
require_once __DIR__ . '/../config/database.php';

// Helper function for JSON responses
function sendResponse($success, $data = null, $message = '', $status = 200) {
    http_response_code($status);
    echo json_encode([
        'success' => $success,
        'data' => $data,
        'message' => $message,
        'timestamp' => date('c'),
        'api_version' => '2.0.0'
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// Database connection with error handling
function getDatabase() {
    static $pdo = null;
    
    if ($pdo === null) {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
            $pdo = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES " . DB_CHARSET
            ]);
        } catch (PDOException $e) {
            error_log("Database connection error: " . $e->getMessage());
            sendResponse(false, null, 'Database connection failed', 500);
        }
    }
    
    return $pdo;
}

// Simple routing system
$request = $_SERVER['REQUEST_URI'];
$path = parse_url($request, PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Remove base path
$basePath = dirname($_SERVER['SCRIPT_NAME']);
if ($basePath !== '/') {
    $path = substr($path, strlen($basePath));
}

// Clean path
$path = rtrim($path, '/');
if (empty($path)) {
    $path = '/';
}

try {
    switch (true) {
        // Health check
        case ($path === '/' || $path === '/health'):
            sendResponse(true, [
                'status' => 'healthy',
                'message' => 'ARSA Token API v2.0 is running',
                'database' => testDatabaseConnection(),
                'endpoints' => [
                    'GET /health' => 'API health check',
                    'GET /properties' => 'Get all properties',
                    'GET /properties/{id}' => 'Get single property',
                    'POST /properties' => 'Add new property (admin only)',
                    'GET /admin/dashboard' => 'Admin dashboard stats',
                    'POST /admin/login' => 'Admin authentication'
                ]
            ]);
            break;
            
        // Properties endpoints
        case ($path === '/properties'):
            handlePropertiesEndpoint($method);
            break;
            
        // Single property endpoint
        case (preg_match('/^\/properties\/(\d+)$/', $path, $matches)):
            handleSinglePropertyEndpoint($method, $matches[1]);
            break;
            
        // Admin endpoints
        case ($path === '/admin/dashboard'):
            handleAdminDashboard($method);
            break;
            
        case ($path === '/admin/login'):
            handleAdminLogin($method);
            break;
            
        // 404 - Not found
        default:
            sendResponse(false, null, 'Endpoint not found', 404);
            break;
    }
    
} catch (Exception $e) {
    error_log("API Error: " . $e->getMessage());
    sendResponse(false, null, 'Internal server error', 500);
}

// Test database connection
function testDatabaseConnection() {
    try {
        $db = getDatabase();
        $stmt = $db->query('SELECT 1');
        return 'connected';
    } catch (Exception $e) {
        error_log("Database test error: " . $e->getMessage());
        return 'failed';
    }
}

// Handle properties endpoint
function handlePropertiesEndpoint($method) {
    if ($method === 'GET') {
        $db = getDatabase();
        
        $sql = "SELECT 
                    p.id, p.name, p.description, p.city, p.country, p.property_type,
                    p.total_value, p.nft_price, p.total_nfts, p.sold_nfts, p.available_nfts,
                    p.monthly_rent, p.annual_yield, p.status, p.main_image, p.created_at,
                    COUNT(pi.id) as image_count
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
                'progress_percentage' => round(($property['sold_nfts'] / $property['total_nfts']) * 100, 1),
                'monthly_income_per_nft' => round(($property['monthly_rent'] / $property['total_nfts']), 2),
                'created_at' => $property['created_at']
            ];
        }, $properties);
        
        sendResponse(true, [
            'properties' => $formattedProperties,
            'total' => count($formattedProperties),
            'stats' => [
                'total_value' => array_sum(array_column($formattedProperties, 'total_value')),
                'total_nfts' => array_sum(array_column($formattedProperties, 'total_nfts')),
                'sold_nfts' => array_sum(array_column($formattedProperties, 'sold_nfts'))
            ]
        ], 'Properties loaded successfully');
        
    } elseif ($method === 'POST') {
        // Add new property (simplified - basic validation)
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input || empty($input['name'])) {
            sendResponse(false, null, 'Property name is required', 400);
        }
        
        $db = getDatabase();
        
        $sql = "INSERT INTO properties (
                    name, description, city, country, property_type,
                    total_value, nft_price, total_nfts, available_nfts,
                    monthly_rent, annual_yield, status, main_image
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        $totalNfts = (int)($input['total_nfts'] ?? 1000);
        
        $stmt = $db->prepare($sql);
        $stmt->execute([
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
        
        sendResponse(true, [
            'id' => $db->lastInsertId()
        ], 'Property added successfully', 201);
    } else {
        sendResponse(false, null, 'Method not allowed', 405);
    }
}

// Handle single property endpoint
function handleSinglePropertyEndpoint($method, $propertyId) {
    if ($method === 'GET') {
        $db = getDatabase();
        
        $sql = "SELECT p.*, 
                       GROUP_CONCAT(
                           JSON_OBJECT(
                               'id', pi.id,
                               'image_url', pi.image_url,
                               'image_title', pi.image_title,
                               'is_main', pi.is_main,
                               'sort_order', pi.sort_order
                           )
                       ) as images
                FROM properties p
                LEFT JOIN property_images pi ON p.id = pi.property_id
                WHERE p.id = ? AND p.is_active = 1
                GROUP BY p.id";
        
        $stmt = $db->prepare($sql);
        $stmt->execute([$propertyId]);
        $property = $stmt->fetch();
        
        if ($property) {
            // Parse images
            $images = [];
            if ($property['images']) {
                $imageData = explode(',', $property['images']);
                foreach ($imageData as $img) {
                    $images[] = json_decode($img, true);
                }
            }
            
            $formattedProperty = [
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
                'progress_percentage' => round(($property['sold_nfts'] / $property['total_nfts']) * 100, 1),
                'monthly_income_per_nft' => round(($property['monthly_rent'] / $property['total_nfts']), 2),
                'images' => $images,
                'created_at' => $property['created_at']
            ];
            
            sendResponse(true, $formattedProperty, 'Property loaded successfully');
        } else {
            sendResponse(false, null, 'Property not found', 404);
        }
    } else {
        sendResponse(false, null, 'Method not allowed', 405);
    }
}

// Handle admin dashboard
function handleAdminDashboard($method) {
    if ($method === 'GET') {
        $db = getDatabase();
        
        // Get dashboard statistics
        $stats = [];
        
        // Total properties
        $stmt = $db->query("SELECT COUNT(*) as count FROM properties WHERE is_active = 1");
        $stats['total_properties'] = $stmt->fetch()['count'];
        
        // Total investors (unique emails from transactions)
        $stmt = $db->query("SELECT COUNT(DISTINCT user_email) as count FROM nft_transactions WHERE status = 'completed'");
        $stats['total_investors'] = $stmt->fetch()['count'];
        
        // Total NFTs sold
        $stmt = $db->query("SELECT SUM(sold_nfts) as total FROM properties WHERE is_active = 1");
        $stats['total_nfts_sold'] = $stmt->fetch()['total'] ?? 0;
        
        // Total volume
        $stmt = $db->query("SELECT SUM(total_amount) as total FROM nft_transactions WHERE status = 'completed'");
        $stats['total_volume'] = $stmt->fetch()['total'] ?? 0;
        
        // Recent transactions
        $stmt = $db->prepare("SELECT nt.*, p.name as property_name 
                             FROM nft_transactions nt 
                             JOIN properties p ON nt.property_id = p.id 
                             ORDER BY nt.created_at DESC 
                             LIMIT 10");
        $stmt->execute();
        $recent_transactions = $stmt->fetchAll();
        
        sendResponse(true, [
            'stats' => $stats,
            'recent_transactions' => $recent_transactions
        ], 'Dashboard data loaded successfully');
    } else {
        sendResponse(false, null, 'Method not allowed', 405);
    }
}

// Handle admin login
function handleAdminLogin($method) {
    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input || empty($input['username']) || empty($input['password'])) {
            sendResponse(false, null, 'Username and password required', 400);
        }
        
        // Simple admin authentication (in production, use proper hashing)
        $validUsers = [
            'admin' => 'arsa123',
            'editor' => 'arsaedit',
            'manager' => 'arsamgr'
        ];
        
        $username = $input['username'];
        $password = $input['password'];
        
        if (isset($validUsers[$username]) && $validUsers[$username] === $password) {
            // Create session token (simplified)
            $token = base64_encode($username . ':' . time());
            
            sendResponse(true, [
                'token' => $token,
                'username' => $username,
                'role' => $username === 'admin' ? 'super_admin' : 'admin',
                'expires_at' => date('c', time() + 86400) // 24 hours
            ], 'Login successful');
        } else {
            sendResponse(false, null, 'Invalid credentials', 401);
        }
    } else {
        sendResponse(false, null, 'Method not allowed', 405);
    }
}
?>