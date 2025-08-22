<?php
/**
 * ARSA Token - Professional File Structure & API Organization
 * Version: 2.0.0
 * Date: August 15, 2025
 */

// ===================================================================
// 1. RECOMMENDED FOLDER STRUCTURE
// ===================================================================

/*
/public_html/arsa/
├── index.html                     # Ana sayfa
├── properties.html                # Emlak listesi
├── property-detail.html           # Emlak detayı
├── dashboard.html                 # Kullanıcı paneli
├── admin.html                     # Admin paneli (YENİ - Yukarıda oluşturuldu)
├── login.html                     # Giriş sayfası
├── roadmap.html                   # Yol haritası
├── .htaccess                      # URL yönlendirme
├── README.md                      # Kurulum talimatları
├── 
├── assets/                        # Statik dosyalar (YENİ YAPISI)
│   ├── css/
│   │   ├── style.css              # Ana CSS dosyası
│   │   ├── admin.css              # Admin panel CSS
│   │   └── responsive.css         # Responsive CSS
│   ├── js/
│   │   ├── script.js              # Ana JavaScript
│   │   ├── admin.js               # Admin panel JS
│   │   ├── wallet.js              # Cüzdan bağlantısı
│   │   └── translations.js        # Çeviri sistemi
│   ├── images/
│   │   ├── logo.png
│   │   ├── hero-bg.jpg
│   │   └── properties/            # Emlak görselleri
│   └── fonts/                     # Özel fontlar
│
├── api/                           # API endpoints (YENİ DÜZENLİ YAPI)
│   ├── config/
│   │   ├── database.php           # Veritabanı bağlantısı
│   │   ├── config.php             # Genel ayarlar
│   │   └── cors.php               # CORS ayarları
│   ├── auth/
│   │   ├── login.php              # Giriş API
│   │   ├── register.php           # Kayıt API
│   │   └── verify.php             # Doğrulama API
│   ├── properties/
│   │   ├── list.php               # Emlak listesi API
│   │   ├── detail.php             # Emlak detayı API
│   │   ├── add.php                # Emlak ekleme API
│   │   ├── update.php             # Emlak güncelleme API
│   │   └── delete.php             # Emlak silme API
│   ├── admin/
│   │   ├── dashboard.php          # Admin dashboard API
│   │   ├── users.php              # Kullanıcı yönetimi API
│   │   ├── settings.php           # Site ayarları API
│   │   └── analytics.php          # Analitik API
│   ├── upload/
│   │   ├── images.php             # Görsel yükleme API
│   │   ├── documents.php          # Doküman yükleme API
│   │   └── validate.php           # Dosya doğrulama
│   └── blockchain/
│       ├── wallet.php             # Cüzdan işlemleri
│       ├── nft.php                # NFT işlemleri
│       └── transactions.php       # İşlem geçmişi
│
├── uploads/                       # Yüklenen dosyalar
│   ├── properties/
│   ├── logos/
│   └── documents/
│
├── includes/                      # PHP include dosyaları
│   ├── functions.php              # Yardımcı fonksiyonlar
│   ├── validation.php             # Doğrulama fonksiyonları
│   └── security.php               # Güvenlik fonksiyonları
│
├── database/                      # Veritabanı dosyaları
│   ├── schema.sql                 # Veritabanı yapısı
│   ├── migrations/                # Veritabanı güncellemeleri
│   └── seeds/                     # Demo veriler
│
└── logs/                          # Log dosyaları
    ├── error.log
    ├── access.log
    └── admin.log
*/

// ===================================================================
// 2. API CONFIG - IMPROVED DATABASE CONNECTION
// ===================================================================

// api/config/database.php
class Database {
    private $host = "localhost";
    private $database = "arsa_token_db";
    private $username = "arsa_user";
    private $password = "secure_password_2025";
    private $charset = "utf8mb4";
    private $pdo;
    
    public function __construct() {
        $this->connect();
    }
    
    private function connect() {
        $dsn = "mysql:host={$this->host};dbname={$this->database};charset={$this->charset}";
        
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
        ];
        
        try {
            $this->pdo = new PDO($dsn, $this->username, $this->password, $options);
        } catch (PDOException $e) {
            throw new PDOException($e->getMessage(), (int)$e->getCode());
        }
    }
    
    public function getConnection() {
        return $this->pdo;
    }
    
    public function query($sql, $params = []) {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }
    
    public function fetch($sql, $params = []) {
        return $this->query($sql, $params)->fetch();
    }
    
    public function fetchAll($sql, $params = []) {
        return $this->query($sql, $params)->fetchAll();
    }
    
    public function lastInsertId() {
        return $this->pdo->lastInsertId();
    }
}

// ===================================================================
// 3. ENHANCED CONFIG FILE
// ===================================================================

// api/config/config.php
<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'arsa_token_db');
define('DB_USER', 'arsa_user');
define('DB_PASS', 'secure_password_2025');
define('DB_CHARSET', 'utf8mb4');

// Site Configuration
define('SITE_URL', 'https://arsatoken.com');
define('ADMIN_EMAIL', 'admin@arsatoken.com');
define('SITE_NAME', 'ARSA Token');
define('API_VERSION', '2.0.0');

// File Upload Configuration
define('UPLOAD_DIR', '../uploads/');
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB
define('ALLOWED_IMAGE_TYPES', ['jpg', 'jpeg', 'png', 'gif', 'webp']);
define('ALLOWED_DOCUMENT_TYPES', ['pdf', 'doc', 'docx', 'txt']);

// Security Configuration
define('JWT_SECRET', 'your-super-secret-jwt-key-2025');
define('SESSION_LIFETIME', 24 * 60 * 60); // 24 hours
define('BCRYPT_COST', 12);

// Pagination Configuration
define('DEFAULT_PAGE_SIZE', 20);
define('MAX_PAGE_SIZE', 100);

// Blockchain Configuration
define('ETHEREUM_RPC_URL', 'https://mainnet.infura.io/v3/YOUR-PROJECT-ID');
define('CONTRACT_ADDRESS', '0x742d35cc5ab12345...');
define('GAS_LIMIT', 21000);

// Error Reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', '../logs/error.log');

// Timezone
date_default_timezone_set('Europe/Istanbul');

// Include required files
require_once 'database.php';
require_once '../includes/functions.php';
require_once '../includes/validation.php';
require_once '../includes/security.php';

// Database instance
$database = new Database();
$db = $database->getConnection();

// Response helper
function sendResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode([
        'success' => $status < 400,
        'data' => $data,
        'timestamp' => date('c'),
        'api_version' => API_VERSION
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

function sendError($message, $status = 400) {
    http_response_code($status);
    echo json_encode([
        'success' => false,
        'error' => $message,
        'timestamp' => date('c'),
        'api_version' => API_VERSION
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// ===================================================================
// 4. PROPERTIES API - MODERN STRUCTURE
// ===================================================================

// api/properties/list.php
<?php
require_once '../config/config.php';

try {
    // Get parameters
    $page = max(1, intval($_GET['page'] ?? 1));
    $limit = min(MAX_PAGE_SIZE, max(1, intval($_GET['limit'] ?? DEFAULT_PAGE_SIZE)));
    $status = $_GET['status'] ?? '';
    $type = $_GET['type'] ?? '';
    $city = $_GET['city'] ?? '';
    $search = $_GET['search'] ?? '';
    
    // Build query
    $where = ["p.is_active = 1"];
    $params = [];
    
    if ($status) {
        $where[] = "p.status = ?";
        $params[] = $status;
    }
    
    if ($type) {
        $where[] = "p.property_type = ?";
        $params[] = $type;
    }
    
    if ($city) {
        $where[] = "p.city LIKE ?";
        $params[] = "%{$city}%";
    }
    
    if ($search) {
        $where[] = "(p.name LIKE ? OR p.description LIKE ?)";
        $params[] = "%{$search}%";
        $params[] = "%{$search}%";
    }
    
    $whereClause = implode(' AND ', $where);
    $offset = ($page - 1) * $limit;
    
    // Get total count
    $countSql = "SELECT COUNT(*) as total FROM properties p WHERE {$whereClause}";
    $totalCount = $database->fetch($countSql, $params)['total'];
    
    // Get properties
    $sql = "
        SELECT 
            p.*,
            GROUP_CONCAT(pi.image_url) as images,
            ROUND((p.sold_nfts / p.total_nfts) * 100, 2) as sale_percentage
        FROM properties p
        LEFT JOIN property_images pi ON p.id = pi.property_id
        WHERE {$whereClause}
        GROUP BY p.id
        ORDER BY p.created_at DESC
        LIMIT {$limit} OFFSET {$offset}
    ";
    
    $properties = $database->fetchAll($sql, $params);
    
    // Format response
    $response = [
        'properties' => array_map(function($property) {
            $property['images'] = $property['images'] ? explode(',', $property['images']) : [];
            $property['total_value'] = floatval($property['total_value']);
            $property['nft_price'] = floatval($property['nft_price']);
            $property['annual_yield'] = floatval($property['annual_yield']);
            $property['sale_percentage'] = floatval($property['sale_percentage']);
            return $property;
        }, $properties),
        'pagination' => [
            'current_page' => $page,
            'total_pages' => ceil($totalCount / $limit),
            'total_items' => intval($totalCount),
            'items_per_page' => $limit,
            'has_next' => $page < ceil($totalCount / $limit),
            'has_prev' => $page > 1
        ],
        'filters' => [
            'status' => $status,
            'type' => $type,
            'city' => $city,
            'search' => $search
        ]
    ];
    
    sendResponse($response);
    
} catch (Exception $e) {
    error_log("Properties List Error: " . $e->getMessage());
    sendError("Emlaklar yüklenirken hata oluştu", 500);
}

// ===================================================================
// 5. ADMIN API - DASHBOARD
// ===================================================================

// api/admin/dashboard.php
<?php
require_once '../config/config.php';

// Check admin authentication
if (!check_admin_auth()) {
    sendError("Yetkisiz erişim", 401);
}

try {
    // Get statistics
    $stats = [];
    
    // Total properties
    $stats['total_properties'] = $database->fetch("SELECT COUNT(*) as count FROM properties WHERE is_active = 1")['count'];
    
    // Total value
    $stats['total_value'] = $database->fetch("SELECT SUM(total_value) as total FROM properties WHERE is_active = 1")['total'] ?? 0;
    
    // Active investors (users with NFTs)
    $stats['active_investors'] = $database->fetch("SELECT COUNT(DISTINCT user_email) as count FROM nft_transactions WHERE status = 'completed'")['count'] ?? 0;
    
    // Average yield
    $stats['average_yield'] = $database->fetch("SELECT AVG(annual_yield) as avg_yield FROM properties WHERE is_active = 1")['avg_yield'] ?? 0;
    
    // Recent activities
    $recent_activities = $database->fetchAll("
        SELECT 
            'nft_purchase' as type,
            p.name as property_name,
            nt.user_email,
            nt.amount,
            nt.created_at
        FROM nft_transactions nt
        JOIN properties p ON nt.property_id = p.id
        WHERE nt.status = 'completed'
        ORDER BY nt.created_at DESC
        LIMIT 10
    ");
    
    // Monthly sales data (last 6 months)
    $monthly_sales = $database->fetchAll("
        SELECT 
            DATE_FORMAT(created_at, '%Y-%m') as month,
            COUNT(*) as sales_count,
            SUM(amount) as total_amount
        FROM nft_transactions
        WHERE status = 'completed' 
        AND created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
        GROUP BY DATE_FORMAT(created_at, '%Y-%m')
        ORDER BY month DESC
    ");
    
    // Top performing properties
    $top_properties = $database->fetchAll("
        SELECT 
            p.name,
            p.city,
            p.sold_nfts,
            p.total_nfts,
            ROUND((p.sold_nfts / p.total_nfts) * 100, 2) as sale_percentage,
            SUM(nt.amount) as total_sales
        FROM properties p
        LEFT JOIN nft_transactions nt ON p.id = nt.property_id AND nt.status = 'completed'
        WHERE p.is_active = 1
        GROUP BY p.id
        ORDER BY sale_percentage DESC, total_sales DESC
        LIMIT 5
    ");
    
    $response = [
        'statistics' => $stats,
        'recent_activities' => $recent_activities,
        'monthly_sales' => $monthly_sales,
        'top_properties' => $top_properties,
        'server_info' => [
            'php_version' => PHP_VERSION,
            'mysql_version' => $database->fetch("SELECT VERSION() as version")['version'],
            'server_time' => date('c'),
            'disk_usage' => disk_free_space('.') ? round(disk_free_space('.') / 1024 / 1024 / 1024, 2) . ' GB available' : 'Unknown'
        ]
    ];
    
    sendResponse($response);
    
} catch (Exception $e) {
    error_log("Admin Dashboard Error: " . $e->getMessage());
    sendError("Dashboard verileri yüklenirken hata oluştu", 500);
}

// ===================================================================
// 6. SECURITY FUNCTIONS
// ===================================================================

// includes/security.php
<?php

function check_admin_auth() {
    // Get authorization header
    $headers = getallheaders();
    $auth_header = $headers['Authorization'] ?? '';
    
    if (empty($auth_header)) {
        return false;
    }
    
    // Extract token
    if (!preg_match('/Bearer\s+(.*)$/i', $auth_header, $matches)) {
        return false;
    }
    
    $token = $matches[1];
    
    // For demo purposes, accept a simple admin token
    // In production, implement proper JWT validation
    if ($token === 'admin_token_2025') {
        return true;
    }
    
    // TODO: Implement JWT token validation
    try {
        // JWT validation logic here
        // $payload = JWT::decode($token, JWT_SECRET, ['HS256']);
        // return isset($payload->role) && $payload->role === 'admin';
        return false;
    } catch (Exception $e) {
        return false;
    }
}

function sanitize_input($input) {
    if (is_array($input)) {
        return array_map('sanitize_input', $input);
    }
    
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function generate_csrf_token() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verify_csrf_token($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

function rate_limit($identifier, $max_attempts = 5, $time_window = 300) {
    // Simple file-based rate limiting
    $rate_limit_file = '../logs/rate_limit_' . md5($identifier) . '.json';
    
    $current_time = time();
    $attempts = [];
    
    if (file_exists($rate_limit_file)) {
        $attempts = json_decode(file_get_contents($rate_limit_file), true) ?? [];
    }
    
    // Remove old attempts
    $attempts = array_filter($attempts, function($timestamp) use ($current_time, $time_window) {
        return ($current_time - $timestamp) < $time_window;
    });
    
    if (count($attempts) >= $max_attempts) {
        return false;
    }
    
    $attempts[] = $current_time;
    file_put_contents($rate_limit_file, json_encode($attempts));
    
    return true;
}

// ===================================================================
// 7. VALIDATION FUNCTIONS
// ===================================================================

// includes/validation.php
<?php

class PropertyValidator {
    public static function validate($data) {
        $errors = [];
        
        // Required fields
        $required = ['name', 'city', 'country', 'property_type', 'total_value', 'nft_price', 'total_nfts', 'annual_yield'];
        
        foreach ($required as $field) {
            if (empty($data[$field])) {
                $errors[$field] = ucfirst($field) . ' alanı zorunludur';
            }
        }
        
        // Validate property type
        $valid_types = ['Office', 'Residential', 'Commercial', 'Logistics'];
        if (!in_array($data['property_type'] ?? '', $valid_types)) {
            $errors['property_type'] = 'Geçersiz emlak türü';
        }
        
        // Validate numeric fields
        $numeric_fields = ['total_value', 'nft_price', 'total_nfts', 'annual_yield'];
        foreach ($numeric_fields as $field) {
            if (isset($data[$field]) && !is_numeric($data[$field])) {
                $errors[$field] = ucfirst($field) . ' sayısal bir değer olmalıdır';
            }
        }
        
        // Validate ranges
        if (isset($data['annual_yield']) && ($data['annual_yield'] < 0 || $data['annual_yield'] > 100)) {
            $errors['annual_yield'] = 'Yıllık getiri 0-100 arasında olmalıdır';
        }
        
        if (isset($data['total_nfts']) && $data['total_nfts'] < 1) {
            $errors['total_nfts'] = 'Toplam NFT sayısı en az 1 olmalıdır';
        }
        
        return $errors;
    }
}

class UserValidator {
    public static function validate($data, $is_update = false) {
        $errors = [];
        
        // Email validation
        if (!$is_update || !empty($data['email'])) {
            if (empty($data['email'])) {
                $errors['email'] = 'E-posta adresi zorunludur';
            } elseif (!validate_email($data['email'])) {
                $errors['email'] = 'Geçersiz e-posta adresi';
            }
        }
        
        // Password validation
        if (!$is_update || !empty($data['password'])) {
            if (empty($data['password'])) {
                $errors['password'] = 'Şifre zorunludur';
            } elseif (strlen($data['password']) < 8) {
                $errors['password'] = 'Şifre en az 8 karakter olmalıdır';
            } elseif (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/', $data['password'])) {
                $errors['password'] = 'Şifre en az bir küçük harf, bir büyük harf ve bir rakam içermelidir';
            }
        }
        
        return $errors;
    }
}

// ===================================================================
// 8. FILE UPLOAD API
// ===================================================================

// api/upload/images.php
<?php
require_once '../config/config.php';

// Check authentication
if (!check_admin_auth()) {
    sendError("Yetkisiz erişim", 401);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError("Sadece POST istekleri kabul edilir", 405);
}

try {
    if (!isset($_FILES['image'])) {
        sendError("Görsel dosyası gönderilmedi", 400);
    }
    
    $file = $_FILES['image'];
    
    // Validate file
    if ($file['error'] !== UPLOAD_ERR_OK) {
        sendError("Dosya yükleme hatası: " . $file['error'], 400);
    }
    
    if ($file['size'] > MAX_FILE_SIZE) {
        sendError("Dosya boyutu çok büyük. Maksimum: " . (MAX_FILE_SIZE / 1024 / 1024) . "MB", 400);
    }
    
    $file_extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($file_extension, ALLOWED_IMAGE_TYPES)) {
        sendError("Desteklenmeyen dosya türü. İzin verilen: " . implode(', ', ALLOWED_IMAGE_TYPES), 400);
    }
    
    // Generate unique filename
    $unique_filename = uniqid() . '_' . time() . '.' . $file_extension;
    $upload_path = UPLOAD_DIR . 'properties/' . $unique_filename;
    
    // Create directory if it doesn't exist
    $upload_dir = dirname($upload_path);
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }
    
    // Move uploaded file
    if (move_uploaded_file($file['tmp_name'], $upload_path)) {
        // Optimize image if needed
        optimize_image($upload_path, $file_extension);
        
        $response = [
            'filename' => $unique_filename,
            'original_name' => $file['name'],
            'size' => $file['size'],
            'url' => SITE_URL . '/uploads/properties/' . $unique_filename,
            'type' => $file['type']
        ];
        
        // Log upload
        error_log("Image uploaded: " . $unique_filename . " by admin");
        
        sendResponse($response);
    } else {
        sendError("Dosya yüklenirken hata oluştu", 500);
    }
    
} catch (Exception $e) {
    error_log("Image Upload Error: " . $e->getMessage());
    sendError("Dosya yükleme sırasında hata oluştu", 500);
}

function optimize_image($file_path, $extension) {
    // Simple image optimization
    if (!extension_loaded('gd')) {
        return;
    }
    
    $max_width = 1920;
    $max_height = 1080;
    $quality = 85;
    
    list($width, $height) = getimagesize($file_path);
    
    if ($width <= $max_width && $height <= $max_height) {
        return; // No optimization needed
    }
    
    $ratio = min($max_width / $width, $max_height / $height);
    $new_width = intval($width * $ratio);
    $new_height = intval($height * $ratio);
    
    $new_image = imagecreatetruecolor($new_width, $new_height);
    
    switch ($extension) {
        case 'jpg':
        case 'jpeg':
            $source = imagecreatefromjpeg($file_path);
            imagecopyresampled($new_image, $source, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
            imagejpeg($new_image, $file_path, $quality);
            break;
        case 'png':
            $source = imagecreatefrompng($file_path);
            imagealphablending($new_image, false);
            imagesavealpha($new_image, true);
            imagecopyresampled($new_image, $source, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
            imagepng($new_image, $file_path, 9);
            break;
    }
    
    imagedestroy($source);
    imagedestroy($new_image);
}

// ===================================================================
// 9. IMPROVED .HTACCESS
// ===================================================================

/*
# .htaccess - Enhanced Configuration

# Enable rewrite engine
RewriteEngine On

# Security Headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' cdnjs.cloudflare.com; img-src 'self' data: https:; font-src 'self' cdnjs.cloudflare.com"

# CORS for API endpoints
<FilesMatch "\.(php)$">
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"
</FilesMatch>

# Handle preflight requests
RewriteCond %{REQUEST_METHOD} OPTIONS
RewriteRule ^(.*)$ $1 [R=200,L]

# API routing
RewriteRule ^api/properties/list/?$ api/properties/list.php [L]
RewriteRule ^api/properties/([0-9]+)/?$ api/properties/detail.php?id=$1 [L]
RewriteRule ^api/admin/dashboard/?$ api/admin/dashboard.php [L]
RewriteRule ^api/upload/image/?$ api/upload/images.php [L]

# Clean URLs
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^properties/?$ properties.html [L]
RewriteRule ^property/([0-9]+)/?$ property-detail.html?id=$1 [L]
RewriteRule ^dashboard/?$ dashboard.html [L]
RewriteRule ^admin/?$ admin.html [L]
RewriteRule ^roadmap/?$ roadmap.html [L]

# Cache static files
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 month"
    Header set Cache-Control "public, immutable"
</FilesMatch>

# Compress files
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>

# Block access to sensitive files
<FilesMatch "\.(log|sql|md|env)$">
    Order allow,deny
    Deny from all
</FilesMatch>

# Block access to directories
Options -Indexes

# Error pages
ErrorDocument 404 /404.html
ErrorDocument 500 /500.html
*/

// ===================================================================
// 10. DATABASE SCHEMA - CORRECTED SQL
// ===================================================================

/*
-- database/schema.sql - Fixed SQL Structure

-- 1. Properties table (main real estate data)
CREATE TABLE IF NOT EXISTS `properties` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `description` text,
    `city` varchar(100) NOT NULL,
    `country` varchar(100) DEFAULT 'Germany',
    `property_type` enum('Office','Residential','Commercial','Logistics') NOT NULL DEFAULT 'Office',
    `total_value` decimal(12,2) NOT NULL,
    `nft_price` decimal(8,2) NOT NULL DEFAULT 100.00,
    `total_nfts` int(11) NOT NULL DEFAULT 1000,
    `sold_nfts` int(11) DEFAULT 0,
    `available_nfts` int(11) NOT NULL,
    `monthly_rent` decimal(10,2) NOT NULL,
    `annual_yield` decimal(4,2) NOT NULL,
    `status` enum('Available','Hot','Sold Out','Pending') DEFAULT 'Available',
    `main_image` varchar(500),
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `is_active` tinyint(1) DEFAULT 1,
    PRIMARY KEY (`id`),
    KEY `idx_status` (`status`),
    KEY `idx_property_type` (`property_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Property images table (multiple images)
CREATE TABLE IF NOT EXISTS `property_images` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `property_id` int(11) NOT NULL,
    `image_url` varchar(500) NOT NULL,
    `image_title` varchar(255),
    `is_main` tinyint(1) DEFAULT 0,
    `sort_order` int(3) DEFAULT 0,
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_property_id` (`property_id`),
    FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Admin users table
CREATE TABLE IF NOT EXISTS `admin_users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(50) NOT NULL,
    `password_hash` varchar(255) NOT NULL,
    `email` varchar(255),
    `role` enum('admin','editor') DEFAULT 'admin',
    `last_login` timestamp NULL,
    `is_active` tinyint(1) DEFAULT 1,
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Site settings table
CREATE TABLE IF NOT EXISTS `site_settings` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `setting_key` varchar(100) NOT NULL,
    `setting_value` text,
    `setting_type` enum('text','json','html','image') DEFAULT 'text',
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_key` (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. NFT transactions table
CREATE TABLE IF NOT EXISTS `nft_transactions` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `property_id` int(11) NOT NULL,
    `user_email` varchar(255) NOT NULL,
    `wallet_address` varchar(255),
    `nft_count` int(11) NOT NULL,
    `amount` decimal(10,2) NOT NULL,
    `transaction_hash` varchar(255),
    `status` enum('pending','completed','failed') DEFAULT 'pending',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    `completed_at` timestamp NULL,
    PRIMARY KEY (`id`),
    KEY `idx_property_id` (`property_id`),
    KEY `idx_user_email` (`user_email`),
    KEY `idx_status` (`status`),
    FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Content translations table
CREATE TABLE IF NOT EXISTS `content_translations` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `language` varchar(5) NOT NULL,
    `translation_key` varchar(255) NOT NULL,
    `translation_value` text NOT NULL,
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_lang_key` (`language`, `translation_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user (password: admin123)
INSERT INTO `admin_users` (`username`, `password_hash`, `email`, `role`) VALUES
('admin', '$2y$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewVyDhN7jY.9KJ2a', 'admin@arsatoken.com', 'admin');

-- Insert default site settings
INSERT INTO `site_settings` (`setting_key`, `setting_value`, `setting_type`) VALUES
('site_title', 'ARSA Token', 'text'),
('site_subtitle', 'Gayrimenkul NFT Platformu', 'text'),
('site_logo', '', 'image'),
('home_title', 'Gayrimenkul Yatırımında Yeni Çağ', 'text'),
('home_subtitle', 'Blockchain teknolojisi ile emlak yatırımını demokratikleştiriyoruz', 'text'),
('contact_email', 'info@arsatoken.com', 'text'),
('social_media', '{"twitter":"","telegram":"","discord":"","instagram":"","linkedin":""}', 'json');

-- Insert demo content translations
INSERT INTO `content_translations` (`language`, `translation_key`, `translation_value`) VALUES
('tr', 'menu.home', 'Ana Sayfa'),
('tr', 'menu.properties', 'Emlaklar'),
('tr', 'menu.dashboard', 'Panel'),
('tr', 'menu.roadmap', 'Yol Haritası'),
('en', 'menu.home', 'Home'),
('en', 'menu.properties', 'Properties'),
('en', 'menu.dashboard', 'Dashboard'),
('en', 'menu.roadmap', 'Roadmap'),
('ar', 'menu.home', 'الصفحة الرئيسية'),
('ar', 'menu.properties', 'العقارات'),
('ar', 'menu.dashboard', 'لوحة التحكم'),
('ar', 'menu.roadmap', 'خارطة الطريق');
*/

// ===================================================================
// 11. DEPLOYMENT CHECKLIST
// ===================================================================

/*
DEPLOYMENT CHECKLIST - ARSA Token v2.0.0
=========================================

📁 FILE STRUCTURE:
[ ] Upload all files according to the new structure
[ ] Set correct file permissions (644 for files, 755 for directories)
[ ] Create uploads/ directory with write permissions
[ ] Create logs/ directory with write permissions

🗄️ DATABASE:
[ ] Create database: arsa_token_db
[ ] Run schema.sql to create tables
[ ] Update database credentials in api/config/database.php
[ ] Test database connection

🔧 CONFIGURATION:
[ ] Update SITE_URL in api/config/config.php
[ ] Set secure JWT_SECRET
[ ] Configure email settings
[ ] Set proper error logging paths

🛡️ SECURITY:
[ ] Change default admin password (admin/admin123)
[ ] Enable HTTPS
[ ] Set up SSL certificate
[ ] Configure proper CORS headers
[ ] Enable firewall rules

🚀 TESTING:
[ ] Test all API endpoints
[ ] Verify admin panel functionality
[ ] Test file uploads
[ ] Check responsive design on mobile
[ ] Test all language switches (TR, EN, AR)
[ ] Verify database operations

📊 PERFORMANCE:
[ ] Enable gzip compression
[ ] Set up browser caching
[ ] Optimize images
[ ] Test page load speeds
[ ] Configure CDN if needed

🔍 FINAL CHECKS:
[ ] Test admin login: /admin.html
[ ] Check all menu links
[ ] Verify email sending functionality
[ ] Test contact forms
[ ] Check error pages (404, 500)
[ ] Test backup/restore functionality

🎯 POST-DEPLOYMENT:
[ ] Monitor error logs
[ ] Set up regular backups
[ ] Configure monitoring alerts
[ ] Test user registration flow
[ ] Verify blockchain connectivity
*/

?>