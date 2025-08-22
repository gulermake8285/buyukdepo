<?php
/**
 * ARSA Token - Unified Database Configuration
 * Single source of truth for all database connections
 */

// Database configuration - Production settings for Natro hosting
define('DB_HOST', 'localhost');
define('DB_NAME', 'u2368732_arsanew');
define('DB_USER', 'u2368732_arsa');
define('DB_PASS', 'R0DE034jvc56!!!');
define('DB_CHARSET', 'utf8mb4');

/**
 * Get database connection with error handling
 * @return PDO Database connection
 */
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
            throw new Exception("Database connection failed");
        }
    }
    
    return $pdo;
}

/**
 * Test database connection
 * @return bool Connection status
 */
function testDatabaseConnection() {
    try {
        $db = getDatabase();
        $stmt = $db->query('SELECT 1');
        return true;
    } catch (Exception $e) {
        error_log("Database test failed: " . $e->getMessage());
        return false;
    }
}

/**
 * Get database configuration as array
 * @return array Database config
 */
function getDatabaseConfig() {
    return [
        'host' => DB_HOST,
        'name' => DB_NAME,
        'user' => DB_USER,
        'pass' => DB_PASS,
        'charset' => DB_CHARSET
    ];
}
?>