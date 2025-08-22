# 🚀 ARSA API - ADIM 1: Temel Yapı Dosyaları

## 📂 **Klasör Yapısı**
```
/public_html/arsa/api/
├── composer.json
├── .env
├── .env.example
├── public/
│   ├── index.php
│   └── .htaccess
├── src/ (boş - sonraki adımda)
├── config/ (boş - sonraki adımda)
└── storage/
    ├── logs/
    └── uploads/
```

---

## 📋 **Dosya İçerikleri**

### **1. composer.json**
```json
{
  "name": "arsa/arsa-php-api",
  "description": "ARSA Token - PHP REST API Backend",
  "type": "project",
  "version": "1.0.0",
  "require": {
    "php": ">=8.0",
    "vlucas/phpdotenv": "^5.6",
    "firebase/php-jwt": "^6.9"
  },
  "autoload": {
    "psr-4": {
      "Arsa\\": "src/"
    }
  },
  "scripts": {
    "post-install-cmd": [
      "php -r \"file_exists('.env') || copy('.env.example', '.env');\""
    ]
  },
  "config": {
    "optimize-autoloader": true,
    "sort-packages": true
  },
  "minimum-stability": "stable",
  "prefer-stable": true
}
```

### **2. .env.example**
```env
# Environment
APP_ENV=production
APP_DEBUG=false
APP_NAME="ARSA Token API"

# Database
DB_HOST=localhost
DB_NAME=arsa_db
DB_USER=arsa_user
DB_PASS=strong_password_here
DB_CHARSET=utf8mb4

# Security
JWT_SECRET=your_jwt_secret_key_here_minimum_32_chars
SESSION_SECRET=your_session_secret_here
CSRF_SECRET=your_csrf_secret_here

# CORS
ALLOWED_ORIGINS=https://arsafinance.com,https://admin.arsafinance.com
ALLOWED_METHODS=GET,POST,OPTIONS
ALLOWED_HEADERS=Content-Type,Authorization,X-CSRF-Token

# Rate Limiting
RATE_LIMIT_REQUESTS=60
RATE_LIMIT_WINDOW=300

# File Upload
MAX_UPLOAD_SIZE=10485760
ALLOWED_EXTENSIONS=jpg,jpeg,png,webp,pdf,doc,docx

# IPFS (Mock for now)
IPFS_GATEWAY=https://ipfs.io/ipfs/
IPFS_API_URL=https://api.pinata.cloud/

# Logging
LOG_LEVEL=error
LOG_PATH=storage/logs/

# Admin Settings
ADMIN_EMAIL=admin@arsafinance.com
MAINTENANCE_MODE=false
```

### **3. .env** (Gerçek değerler - .gitignore'a eklenecek)
```env
# Environment
APP_ENV=production
APP_DEBUG=false
APP_NAME="ARSA Token API"

# Database (Natro hosting değerlerinizi girin)
DB_HOST=localhost
DB_NAME=YOUR_ACTUAL_DB_NAME
DB_USER=YOUR_ACTUAL_DB_USER
DB_PASS=YOUR_ACTUAL_DB_PASSWORD
DB_CHARSET=utf8mb4

# Security (Güçlü rastgele değerler üretin)
JWT_SECRET=GENERATE_STRONG_32_CHAR_SECRET_HERE
SESSION_SECRET=GENERATE_STRONG_SESSION_SECRET
CSRF_SECRET=GENERATE_STRONG_CSRF_SECRET

# CORS (Gerçek domain adresiniz)
ALLOWED_ORIGINS=https://yourdomain.com,https://admin.yourdomain.com
ALLOWED_METHODS=GET,POST,OPTIONS
ALLOWED_HEADERS=Content-Type,Authorization,X-CSRF-Token

# Rate Limiting
RATE_LIMIT_REQUESTS=60
RATE_LIMIT_WINDOW=300

# File Upload
MAX_UPLOAD_SIZE=10485760
ALLOWED_EXTENSIONS=jpg,jpeg,png,webp,pdf,doc,docx

# IPFS (Mock for now)
IPFS_GATEWAY=https://ipfs.io/ipfs/
IPFS_API_URL=https://api.pinata.cloud/

# Logging
LOG_LEVEL=error
LOG_PATH=storage/logs/

# Admin Settings
ADMIN_EMAIL=admin@yourdomain.com
MAINTENANCE_MODE=false
```

### **4. public/index.php** (Front Controller)
```php
<?php
/**
 * ARSA Token API - Front Controller
 * Entry point for all API requests
 * 
 * @version 1.0.0
 * @author ARSA Development Team
 */

// Error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Start output buffering
ob_start();

// Set content type
header('Content-Type: application/json; charset=utf-8');

try {
    // Load Composer autoloader
    $autoloadPaths = [
        __DIR__ . '/../vendor/autoload.php',
        __DIR__ . '/../../vendor/autoload.php'
    ];
    
    $autoloaderFound = false;
    foreach ($autoloadPaths as $autoloadPath) {
        if (file_exists($autoloadPath)) {
            require_once $autoloadPath;
            $autoloaderFound = true;
            break;
        }
    }
    
    if (!$autoloaderFound) {
        throw new Exception('Composer autoloader not found. Please run: composer install');
    }
    
    // Load environment variables
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
    if (file_exists(__DIR__ . '/../.env')) {
        $dotenv->load();
    }
    
    // Basic environment check
    $requiredEnvVars = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASS'];
    foreach ($requiredEnvVars as $var) {
        if (empty($_ENV[$var]) && empty(getenv($var))) {
            throw new Exception("Required environment variable {$var} is not set");
        }
    }
    
    // CORS Headers
    $allowedOrigins = explode(',', $_ENV['ALLOWED_ORIGINS'] ?? '*');
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    
    if (in_array('*', $allowedOrigins) || in_array($origin, $allowedOrigins)) {
        header("Access-Control-Allow-Origin: " . ($origin ?: '*'));
    }
    
    header("Access-Control-Allow-Methods: " . ($_ENV['ALLOWED_METHODS'] ?? 'GET,POST,OPTIONS'));
    header("Access-Control-Allow-Headers: " . ($_ENV['ALLOWED_HEADERS'] ?? 'Content-Type,Authorization'));
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
    
    // Basic routing (will be replaced with Router class in Step 2)
    $requestUri = $_SERVER['REQUEST_URI'];
    $requestMethod = $_SERVER['REQUEST_METHOD'];
    $path = parse_url($requestUri, PHP_URL_PATH);
    
    // Remove base path if API is in subfolder
    $basePath = dirname($_SERVER['SCRIPT_NAME']);
    if ($basePath !== '/') {
        $path = substr($path, strlen($basePath));
    }
    
    // Simple health check endpoint
    if ($path === '/health' && $requestMethod === 'GET') {
        echo json_encode([
            'status' => 'ok',
            'message' => 'ARSA API is running',
            'version' => '1.0.0',
            'timestamp' => date('c'),
            'environment' => $_ENV['APP_ENV'] ?? 'unknown'
        ], JSON_PRETTY_PRINT);
        exit;
    }
    
    // Temporary endpoints (will be moved to controllers in next steps)
    if ($path === '/test' && $requestMethod === 'GET') {
        
        // Test database connection
        $dsn = sprintf(
            'mysql:host=%s;dbname=%s;charset=%s',
            $_ENV['DB_HOST'],
            $_ENV['DB_NAME'],
            $_ENV['DB_CHARSET'] ?? 'utf8mb4'
        );
        
        try {
            $pdo = new PDO($dsn, $_ENV['DB_USER'], $_ENV['DB_PASS'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]);
            
            $dbStatus = 'connected';
            $dbInfo = $pdo->query('SELECT VERSION() as version')->fetch();
        } catch (Exception $e) {
            $dbStatus = 'failed';
            $dbInfo = ['error' => $e->getMessage()];
        }
        
        echo json_encode([
            'api' => 'ARSA Token API',
            'version' => '1.0.0',
            'php_version' => PHP_VERSION,
            'database' => [
                'status' => $dbStatus,
                'info' => $dbInfo
            ],
            'environment' => $_ENV['APP_ENV'] ?? 'unknown',
            'timestamp' => date('c')
        ], JSON_PRETTY_PRINT);
        exit;
    }
    
    // Default 404 response
    http_response_code(404);
    echo json_encode([
        'error' => 'Endpoint not found',
        'message' => 'The requested API endpoint does not exist',
        'path' => $path,
        'method' => $requestMethod,
        'available_endpoints' => [
            'GET /health' => 'API health check',
            'GET /test' => 'Test database connection'
        ]
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    // Error handling
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
    
    echo json_encode($errorResponse, JSON_PRETTY_PRINT);
    
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
```

### **5. public/.htaccess**
```apache
# ARSA Token API - Apache Configuration
# Enables pretty URLs and security headers

RewriteEngine On

# Handle Angular/React routes - direct all requests to index.php
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.php [QSA,L]

# Security Headers
<IfModule mod_headers.c>
    # Prevent MIME type sniffing
    Header always set X-Content-Type-Options nosniff
    
    # Prevent clickjacking
    Header always set X-Frame-Options SAMEORIGIN
    
    # XSS Protection
    Header always set X-XSS-Protection "1; mode=block"
    
    # Referrer Policy
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    
    # Remove server information
    Header unset Server
    Header unset X-Powered-By
    
    # Content Security Policy (basic)
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'"
</IfModule>

# Disable directory browsing
Options -Indexes

# Prevent access to sensitive files
<FilesMatch "\.(env|ini|log|sh|sql|htaccess|htpasswd)$">
    Order Allow,Deny
    Deny from all
</FilesMatch>

# Prevent access to vendor and src directories
RedirectMatch 404 /vendor/
RedirectMatch 404 /src/
RedirectMatch 404 /config/
RedirectMatch 404 /storage/

# Enable compression
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

# Set proper MIME types
<IfModule mod_mime.c>
    AddType application/json .json
    AddType application/javascript .js
    AddType text/css .css
</IfModule>

# Cache static files
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType application/json "access plus 1 hour"
    ExpiresByType application/javascript "access plus 1 week"
    ExpiresByType text/css "access plus 1 week"
</IfModule>

# PHP Settings
<IfModule mod_php.c>
    # Increase memory limit
    php_value memory_limit 256M
    
    # Set max execution time
    php_value max_execution_time 60
    
    # Set upload limits
    php_value upload_max_filesize 10M
    php_value post_max_size 10M
    
    # Hide PHP version
    php_flag expose_php off
    
    # Enable short open tags
    php_flag short_open_tag on
</IfModule>
```

---

## 🚀 **Kurulum Adımları**

### **1. Dosyaları Oluşturun**
```bash
# Ana klasörde
cd /public_html/arsa/

# API klasörü oluşturun (mevcut varsa yedekleyin)
mkdir -p api/public
mkdir -p api/src
mkdir -p api/config
mkdir -p api/storage/logs
mkdir -p api/storage/uploads

# Dosyaları oluşturun ve içeriklerini kopyalayın
```

### **2. Composer Kurulumu**
```bash
cd /public_html/arsa/api/
composer install --no-dev
```

### **3. Environment Ayarları**
```bash
# .env dosyasını düzenleyin
# Gerçek database bilgilerinizi girin
# Güçlü secret key'ler üretin
```

### **4. Dosya İzinleri**
```bash
chmod -R 755 /public_html/arsa/api/
chmod -R 775 /public_html/arsa/api/storage/
```

### **5. Test Etme**
```
GET https://yourdomain.com/arsa/api/public/health
GET https://yourdomain.com/arsa/api/public/test
```

---

## ✅ **ADIM 1 Tamamlandı!**

Bu adım tamamlandıktan sonra:
- ✅ Temel API yapısı kurulmuş olacak
- ✅ Environment yönetimi hazır
- ✅ Güvenlik başlıkları aktif
- ✅ Database bağlantısı test edilebilir
- ✅ Health check endpoint çalışır

**Sonraki adım**: ADIM 2 - Core Classes (Bootstrap, Router, Response, Db)