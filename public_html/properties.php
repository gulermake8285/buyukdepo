<?php
/**
 * ARSA Token - Properties API (FINAL VERSION)
 * Dosya: /api/properties.php
 * 
 * SADECE BU DOSYANIN İÇERİĞİNİ DEĞİŞTİRİN!
 * Klasör yapısını değiştirmenize gerek yok.
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

// Include config if exists
if (file_exists('config.php')) {
    require_once 'config.php';
}

// Database configuration - KENDI BİLGİLERİNİZLE DEĞİŞTİRİN
$servername = "localhost";
$username = "root";              // cPanel database username
$password = "";                  // cPanel database password  
$dbname = "arsa_token_db";       // Database name

try {
    // PDO Database connection
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Check what action is requested
    $action = $_GET['action'] ?? 'list';
    
    switch ($action) {
        case 'list':
            // Get all properties
            $sql = "SELECT 
                        id,
                        name,
                        description,
                        city,
                        country,
                        property_type,
                        total_value,
                        nft_price,
                        total_nfts,
                        sold_nfts,
                        available_nfts,
                        monthly_rent,
                        annual_yield,
                        status,
                        main_image,
                        created_at,
                        updated_at
                    FROM properties 
                    WHERE is_active = 1 
                    ORDER BY created_at DESC";
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $properties = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Format properties
            $formattedProperties = [];
            foreach ($properties as $property) {
                $formattedProperties[] = [
                    'id' => (int)$property['id'],
                    'name' => $property['name'],
                    'description' => $property['description'] ?? '',
                    'city' => $property['city'],
                    'country' => $property['country'] ?? 'Türkiye',
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
                    'created_at' => $property['created_at'],
                    'updated_at' => $property['updated_at']
                ];
            }
            
            // Calculate statistics
            $totalProperties = count($formattedProperties);
            $totalValue = array_sum(array_column($formattedProperties, 'total_value'));
            $avgYield = $totalProperties > 0 ? array_sum(array_column($formattedProperties, 'annual_yield')) / $totalProperties : 0;
            $monthlyDistribution = array_sum(array_column($formattedProperties, 'monthly_rent'));
            
            $stats = [
                'totalProperties' => $totalProperties,
                'totalValue' => $totalValue,
                'avgYield' => round($avgYield, 1),
                'monthlyDistribution' => $monthlyDistribution
            ];
            
            // Return response
            echo json_encode([
                'success' => true,
                'data' => [
                    'properties' => $formattedProperties,
                    'stats' => $stats,
                    'total' => $totalProperties
                ],
                'message' => 'Properties loaded successfully',
                'timestamp' => date('c')
            ], JSON_UNESCAPED_UNICODE);
            break;
            
        case 'get':
            // Get single property
            $id = $_GET['id'] ?? 0;
            
            if (!$id) {
                throw new Exception('Property ID required');
            }
            
            $sql = "SELECT * FROM properties WHERE id = ? AND is_active = 1";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$id]);
            $property = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$property) {
                throw new Exception('Property not found');
            }
            
            echo json_encode([
                'success' => true,
                'data' => $property,
                'message' => 'Property loaded successfully',
                'timestamp' => date('c')
            ], JSON_UNESCAPED_UNICODE);
            break;
            
        case 'add':
            // Add new property (POST request)
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('POST method required for adding properties');
            }
            
            $input = json_decode(file_get_contents('php://input'), true);
            
            $sql = "INSERT INTO properties (
                        name, description, city, country, property_type,
                        total_value, nft_price, total_nfts, available_nfts,
                        monthly_rent, annual_yield, status, main_image
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $input['name'],
                $input['description'] ?? '',
                $input['city'],
                $input['country'] ?? 'Türkiye',
                $input['property_type'],
                $input['total_value'],
                $input['nft_price'],
                $input['total_nfts'],
                $input['total_nfts'], // available_nfts = total_nfts initially
                $input['monthly_rent'],
                $input['annual_yield'],
                $input['status'] ?? 'Available',
                $input['main_image'] ?? ''
            ]);
            
            echo json_encode([
                'success' => true,
                'data' => ['id' => $pdo->lastInsertId()],
                'message' => 'Property added successfully',
                'timestamp' => date('c')
            ], JSON_UNESCAPED_UNICODE);
            break;
            
        default:
            throw new Exception('Invalid action');
    }
    
} catch (PDOException $e) {
    // Database error
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database error',
        'message' => 'Unable to process request',
        'debug' => $e->getMessage(), // Remove in production
        'timestamp' => date('c')
    ], JSON_UNESCAPED_UNICODE);
    
    // Log error
    error_log("Properties API Database Error: " . $e->getMessage());
    
} catch (Exception $e) {
    // General error
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Request error',
        'message' => $e->getMessage(),
        'timestamp' => date('c')
    ], JSON_UNESCAPED_UNICODE);
    
    // Log error
    error_log("Properties API Error: " . $e->getMessage());
}
?>

<?php
/**
 * API KULLANIMI:
 * 
 * 1. Tüm emlakları listele:
 *    GET /api/properties.php?action=list
 *    GET /api/properties.php (default)
 * 
 * 2. Tek emlak getir:
 *    GET /api/properties.php?action=get&id=1
 * 
 * 3. Yeni emlak ekle:
 *    POST /api/properties.php?action=add
 *    Content-Type: application/json
 *    Body: {"name": "...", "city": "...", ...}
 * 
 * 4. Test URL'si:
 *    https://siteniz.com/api/properties.php
 * 
 * NOT: Database bilgilerini yukarıda güncelleyin!
 */
?>