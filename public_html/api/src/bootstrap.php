<?php

namespace Arsa;

/**
 * ARSA Token API - Bootstrap Class
 * Initializes the application
 */
class Bootstrap
{
    private static $instance = null;
    private $config = [];
    
    private function __construct()
    {
        $this->loadEnvironment();
        $this->setErrorReporting();
        $this->setHeaders();
        $this->loadConfig();
    }
    
    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Initialize the application
     */
    public static function init()
    {
        $bootstrap = self::getInstance();
        return $bootstrap;
    }
    
    /**
     * Load environment variables from .env file
     */
    private function loadEnvironment()
    {
        $envFile = __DIR__ . '/../.env';
        if (file_exists($envFile)) {
            $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                $line = trim($line);
                if (empty($line) || strpos($line, '#') === 0) continue;
                
                if (strpos($line, '=') !== false) {
                    list($name, $value) = explode('=', $line, 2);
                    $name = trim($name);
                    $value = trim($value, '"');
                    $_ENV[$name] = $value;
                    putenv("$name=$value");
                }
            }
        }
    }
    
    /**
     * Set error reporting based on environment
     */
    private function setErrorReporting()
    {
        $debug = $_ENV['APP_DEBUG'] ?? false;
        
        if ($debug && $_ENV['APP_ENV'] === 'development') {
            error_reporting(E_ALL);
            ini_set('display_errors', 1);
        } else {
            error_reporting(E_ALL);
            ini_set('display_errors', 0);
        }
    }
    
    /**
     * Set HTTP headers
     */
    private function setHeaders()
    {
        // Content type
        header('Content-Type: application/json; charset=utf-8');
        
        // CORS headers
        $allowedOrigins = explode(',', $_ENV['ALLOWED_ORIGINS'] ?? '*');
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        
        if (in_array('*', $allowedOrigins) || in_array($origin, $allowedOrigins)) {
            header("Access-Control-Allow-Origin: " . ($origin ?: '*'));
        }
        
        header("Access-Control-Allow-Methods: " . ($_ENV['ALLOWED_METHODS'] ?? 'GET,POST,OPTIONS'));
        header("Access-Control-Allow-Headers: " . ($_ENV['ALLOWED_HEADERS'] ?? 'Content-Type,Authorization'));
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Max-Age: 86400");
        
        // Security headers
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: SAMEORIGIN');
        header('X-XSS-Protection: 1; mode=block');
        header('Referrer-Policy: strict-origin-when-cross-origin');
        
        // Handle preflight OPTIONS request
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit;
        }
    }
    
    /**
     * Load configuration
     */
    private function loadConfig()
    {
        $this->config = [
            'app' => [
                'name' => $_ENV['APP_NAME'] ?? 'ARSA Token API',
                'version' => '1.0.0',
                'env' => $_ENV['APP_ENV'] ?? 'production',
                'debug' => $_ENV['APP_DEBUG'] ?? false
            ],
            'database' => [
                'host' => $_ENV['DB_HOST'] ?? 'localhost',
                'name' => $_ENV['DB_NAME'] ?? 'arsa_db',
                'user' => $_ENV['DB_USER'] ?? 'root',
                'pass' => $_ENV['DB_PASS'] ?? '',
                'charset' => $_ENV['DB_CHARSET'] ?? 'utf8mb4'
            ],
            'security' => [
                'jwt_secret' => $_ENV['JWT_SECRET'] ?? 'change_me',
                'session_secret' => $_ENV['SESSION_SECRET'] ?? 'change_me',
                'csrf_secret' => $_ENV['CSRF_SECRET'] ?? 'change_me'
            ],
            'upload' => [
                'max_size' => $_ENV['MAX_UPLOAD_SIZE'] ?? 10485760, // 10MB
                'allowed_extensions' => explode(',', $_ENV['ALLOWED_EXTENSIONS'] ?? 'jpg,jpeg,png,webp,pdf')
            ],
            'rate_limit' => [
                'requests' => $_ENV['RATE_LIMIT_REQUESTS'] ?? 60,
                'window' => $_ENV['RATE_LIMIT_WINDOW'] ?? 300 // 5 minutes
            ]
        ];
    }
    
    /**
     * Get configuration value
     */
    public function getConfig($key = null, $default = null)
    {
        if ($key === null) {
            return $this->config;
        }
        
        $keys = explode('.', $key);
        $value = $this->config;
        
        foreach ($keys as $k) {
            if (!isset($value[$k])) {
                return $default;
            }
            $value = $value[$k];
        }
        
        return $value;
    }
    
    /**
     * Check if application is in debug mode
     */
    public function isDebug()
    {
        return $this->getConfig('app.debug', false);
    }
    
    /**
     * Get application environment
     */
    public function getEnvironment()
    {
        return $this->getConfig('app.env', 'production');
    }
    
    /**
     * Get database configuration
     */
    public function getDatabaseConfig()
    {
        return $this->getConfig('database');
    }
}