<?php
/**
 * ARSA Token API - Front Controller (Düzeltilmiş)
 * Entry point for all API requests
 */

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Start output buffering
ob_start();

// Set content type
header('Content-Type: application/json; charset=utf-8');

try {
    // CORS Headers
    $allowedOrigins = ['*']; // Geçici olarak tüm origin'lere izin
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET,POST,OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type,Authorization");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Max-Age: 86400");
    
    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
    
    // Security headers
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('X-XSS-Protection: 1; mode=block');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    
    // Load environment variables (gelişmiş yöntem)
    $envFile = __DIR__ . '/../.env';
    if (file_exists($envFile)) {
        $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $line = trim($line);
            if (empty($line) || strpos($line, '#') === 0) continue;
            
            if (strpos($line, '=') !== false) {
                list($name, $value) = explode('=', $line, 2);
                $name = trim($name);
                $value = trim($value, '"');  // Sadece çift tırnak temizle
                $_ENV[$name] = $value;
                putenv("$name=$value");  // putenv ile de kaydet
            }
        }
    }
    
    // Database configuration
    $dbHost = $_ENV['DB_HOST'] ?? 'localhost';
    $dbName = $_ENV['DB_NAME'] ?? 'u2368732_arsanew';
    $dbUser = $_ENV['DB_USER'] ?? 'u2368732_arsa';
    $dbPass = $_ENV['DB_PASS'] ?? 'R0DE034jvc56!!!';
    
    // Basic routing
    $requestUri = $_SERVER['REQUEST_URI'];
    $requestMethod = $_SERVER['REQUEST_METHOD'];
    $path = parse_url($requestUri, PHP_URL_PATH);
    
    // Remove base path if API is in subfolder
    $basePath = dirname($_SERVER['SCRIPT_NAME']);
    if ($basePath !== '/') {
        $path = substr($path, strlen($basePath));
    }
    
    // Helper function for JSON response
    function sendResponse($data, $status = 200) {
        http_response_code($status);
        echo json_encode([
            'success' => $status < 400,
            'data' => $data,
            'timestamp' => date('c'),
            'api_version' => '1.0.0'
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    function sendError($message, $status = 400) {
        http_response_code($status);
        echo json_encode([
            'success' => false,
            'error' => $message,
            'timestamp' => date('c'),
            'api_version' => '1.0.0'
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    // Health check endpoint
    if ($path === '/health' && $requestMethod === 'GET') {
        sendResponse([
            'status' => 'ok',
            'message' => 'ARSA API is running',
            'version' => '1.0.0',
            'php_version' => PHP_VERSION,
            'server_time' => date('c'),
            'environment' => $_ENV['APP_ENV'] ?? 'unknown'
        ]);
    }
    
    // Test endpoint with database
    if ($path === '/test' && $requestMethod === 'GET') {
        
        // Test database connection
        try {
            $dsn = "mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4";
            $pdo = new PDO($dsn, $dbUser, $dbPass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]);
            
            $dbStatus = 'connected';
            $dbInfo = $pdo->query('SELECT VERSION() as version')->fetch();
        } catch (Exception $e) {
            $dbStatus = 'failed';
            $dbInfo = ['error' => $e->getMessage()];
        }
        
        sendResponse([
            'api' => 'ARSA Token API',
            'version' => '1.0.0',
            'php_version' => PHP_VERSION,
            'database' => [
                'status' => $dbStatus,
                'info' => $dbInfo
            ],
            'environment' => $_ENV['APP_ENV'] ?? 'unknown',
            'server_time' => date('c'),
            'request_info' => [
                'method' => $requestMethod,
                'path' => $path,
                'full_uri' => $requestUri
            ]
        ]);
    }
    
    // Properties endpoint (basit)
    if ($path === '/properties' && $requestMethod === 'GET') {
        
        try {
            $dsn = "mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4";
            $pdo = new PDO($dsn, $dbUser, $dbPass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]);
            
            // Check if properties table exists
            $tableCheck = $pdo->query("SHOW TABLES LIKE 'properties'")->fetch();
            
            if ($tableCheck) {
                $stmt = $pdo->query("SELECT * FROM properties WHERE is_active = 1 LIMIT 10");
                $properties = $stmt->fetchAll();
                
                sendResponse([
                    'properties' => $properties,
                    'count' => count($properties)
                ]);
            } else {
                sendResponse([
                    'properties' => [],
                    'count' => 0,
                    'message' => 'Properties table not found. Database needs to be set up.'
                ]);
            }
            
        } catch (Exception $e) {
            sendError("Database error: " . $e->getMessage(), 500);
        }
    }
    
    // Default 404 response
    http_response_code(404);
    sendResponse([
        'error' => 'Endpoint not found',
        'message' => 'The requested API endpoint does not exist',
        'path' => $path,
        'method' => $requestMethod,
        'available_endpoints' => [
            'GET /health' => 'API health check',
            'GET /test' => 'Test database connection',
            'GET /properties' => 'Get properties list'
        ]
    ], 404);
    
} catch (Exception $e) {
    // Global error handling
    http_response_code(500);
    
    $errorResponse = [
        'error' => 'Internal Server Error',
        'message' => 'An unexpected error occurred'
    ];
    
    // Show detailed error in development
    if (($_ENV['APP_DEBUG'] ?? false) || ($_ENV['APP_ENV'] ?? 'production') === 'development') {
        $errorResponse['debug'] = [
            'message' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine()
        ];
    }
    
    echo json_encode($errorResponse, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    
    // Log error
    error_log(sprintf(
        '[%s] API Error: %s in %s:%d',
        date('Y-m-d H:i:s'),
        $e->getMessage(),
        $e->getFile(),
        $e->getLine()
    ));
}

// Clean output buffer and send response
ob_end_flush();
?>