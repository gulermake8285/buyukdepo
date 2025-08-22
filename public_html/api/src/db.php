<?php

namespace Arsa;

use PDO;
use PDOException;

/**
 * ARSA Token API - Database Class
 * Handles database connections and operations
 */
class Db
{
    private static $instance = null;
    private $pdo = null;
    private $config = [];
    
    private function __construct()
    {
        $bootstrap = Bootstrap::getInstance();
        $this->config = $bootstrap->getDatabaseConfig();
        $this->connect();
    }
    
    /**
     * Get database instance (Singleton)
     */
    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Connect to database
     */
    private function connect()
    {
        try {
            $dsn = sprintf(
                'mysql:host=%s;dbname=%s;charset=%s',
                $this->config['host'],
                $this->config['name'],
                $this->config['charset']
            );
            
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES {$this->config['charset']} COLLATE {$this->config['charset']}_unicode_ci"
            ];
            
            $this->pdo = new PDO($dsn, $this->config['user'], $this->config['pass'], $options);
            
        } catch (PDOException $e) {
            throw new \Exception("Database connection failed: " . $e->getMessage());
        }
    }
    
    /**
     * Get PDO instance
     */
    public function getPdo()
    {
        return $this->pdo;
    }
    
    /**
     * Execute a query and return PDOStatement
     */
    public function query($sql, $params = [])
    {
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        } catch (PDOException $e) {
            throw new \Exception("Query failed: " . $e->getMessage());
        }
    }
    
    /**
     * Fetch a single row
     */
    public function fetch($sql, $params = [])
    {
        $stmt = $this->query($sql, $params);
        return $stmt->fetch();
    }
    
    /**
     * Fetch all rows
     */
    public function fetchAll($sql, $params = [])
    {
        $stmt = $this->query($sql, $params);
        return $stmt->fetchAll();
    }
    
    /**
     * Fetch a single column value
     */
    public function fetchColumn($sql, $params = [], $column = 0)
    {
        $stmt = $this->query($sql, $params);
        return $stmt->fetchColumn($column);
    }
    
    /**
     * Insert a record and return last insert ID
     */
    public function insert($table, $data)
    {
        $columns = array_keys($data);
        $placeholders = array_map(function($col) { return ':' . $col; }, $columns);
        
        $sql = sprintf(
            'INSERT INTO %s (%s) VALUES (%s)',
            $table,
            implode(', ', $columns),
            implode(', ', $placeholders)
        );
        
        $params = [];
        foreach ($data as $key => $value) {
            $params[':' . $key] = $value;
        }
        
        $this->query($sql, $params);
        return $this->pdo->lastInsertId();
    }
    
    /**
     * Update records
     */
    public function update($table, $data, $where, $whereParams = [])
    {
        $setParts = [];
        $params = [];
        
        foreach ($data as $key => $value) {
            $setParts[] = $key . ' = :set_' . $key;
            $params[':set_' . $key] = $value;
        }
        
        // Merge where parameters
        $params = array_merge($params, $whereParams);
        
        $sql = sprintf(
            'UPDATE %s SET %s WHERE %s',
            $table,
            implode(', ', $setParts),
            $where
        );
        
        $stmt = $this->query($sql, $params);
        return $stmt->rowCount();
    }
    
    /**
     * Delete records
     */
    public function delete($table, $where, $params = [])
    {
        $sql = sprintf('DELETE FROM %s WHERE %s', $table, $where);
        $stmt = $this->query($sql, $params);
        return $stmt->rowCount();
    }
    
    /**
     * Get record count
     */
    public function count($table, $where = '', $params = [])
    {
        $sql = "SELECT COUNT(*) FROM {$table}";
        if (!empty($where)) {
            $sql .= " WHERE {$where}";
        }
        
        return $this->fetchColumn($sql, $params);
    }
    
    /**
     * Check if table exists
     */
    public function tableExists($table)
    {
        $sql = "SHOW TABLES LIKE :table";
        $result = $this->fetch($sql, [':table' => $table]);
        return !empty($result);
    }
    
    /**
     * Begin transaction
     */
    public function beginTransaction()
    {
        return $this->pdo->beginTransaction();
    }
    
    /**
     * Commit transaction
     */
    public function commit()
    {
        return $this->pdo->commit();
    }
    
    /**
     * Rollback transaction
     */
    public function rollback()
    {
        return $this->pdo->rollback();
    }
    
    /**
     * Execute a transaction
     */
    public function transaction($callback)
    {
        $this->beginTransaction();
        
        try {
            $result = call_user_func($callback, $this);
            $this->commit();
            return $result;
        } catch (\Exception $e) {
            $this->rollback();
            throw $e;
        }
    }
    
    /**
     * Get database version
     */
    public function getVersion()
    {
        return $this->fetchColumn('SELECT VERSION()');
    }
    
    /**
     * Test database connection
     */
    public function testConnection()
    {
        try {
            $version = $this->getVersion();
            return [
                'status' => 'connected',
                'version' => $version,
                'host' => $this->config['host'],
                'database' => $this->config['name']
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'failed',
                'error' => $e->getMessage()
            ];
        }
    }
    
    /**
     * Get paginated results
     */
    public function paginate($sql, $params = [], $page = 1, $perPage = 20)
    {
        // Get total count
        $countSql = "SELECT COUNT(*) FROM ($sql) AS count_query";
        $total = $this->fetchColumn($countSql, $params);
        
        // Calculate offset
        $offset = ($page - 1) * $perPage;
        
        // Add LIMIT and OFFSET to original query
        $paginatedSql = $sql . " LIMIT {$perPage} OFFSET {$offset}";
        $data = $this->fetchAll($paginatedSql, $params);
        
        return [
            'data' => $data,
            'total' => (int)$total,
            'page' => (int)$page,
            'per_page' => (int)$perPage,
            'total_pages' => ceil($total / $perPage)
        ];
    }
    
    /**
     * Close connection
     */
    public function close()
    {
        $this->pdo = null;
    }
    
    /**
     * Destructor
     */
    public function __destruct()
    {
        $this->close();
    }
}