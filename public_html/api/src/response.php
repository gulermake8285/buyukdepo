<?php

namespace Arsa;

/**
 * ARSA Token API - Response Class
 * Handles JSON responses in a consistent format
 */
class Response
{
    /**
     * Send a successful response
     */
    public static function success($data = null, $status = 200, $message = null)
    {
        self::send([
            'success' => true,
            'data' => $data,
            'message' => $message,
            'timestamp' => date('c'),
            'api_version' => '1.0.0'
        ], $status);
    }
    
    /**
     * Send an error response
     */
    public static function error($message, $status = 400, $details = null)
    {
        self::send([
            'success' => false,
            'error' => $message,
            'details' => $details,
            'timestamp' => date('c'),
            'api_version' => '1.0.0'
        ], $status);
    }
    
    /**
     * Send a validation error response
     */
    public static function validationError($errors, $message = 'Validation failed')
    {
        self::send([
            'success' => false,
            'error' => $message,
            'validation_errors' => $errors,
            'timestamp' => date('c'),
            'api_version' => '1.0.0'
        ], 422);
    }
    
    /**
     * Send a 404 not found response
     */
    public static function notFound($data = null)
    {
        $defaultData = [
            'error' => 'Not Found',
            'message' => 'The requested resource was not found'
        ];
        
        $responseData = array_merge($defaultData, $data ?: []);
        
        self::send([
            'success' => false,
            'data' => $responseData,
            'timestamp' => date('c'),
            'api_version' => '1.0.0'
        ], 404);
    }
    
    /**
     * Send an unauthorized response
     */
    public static function unauthorized($message = 'Unauthorized')
    {
        self::send([
            'success' => false,
            'error' => $message,
            'timestamp' => date('c'),
            'api_version' => '1.0.0'
        ], 401);
    }
    
    /**
     * Send a forbidden response
     */
    public static function forbidden($message = 'Forbidden')
    {
        self::send([
            'success' => false,
            'error' => $message,
            'timestamp' => date('c'),
            'api_version' => '1.0.0'
        ], 403);
    }
    
    /**
     * Send a server error response
     */
    public static function serverError($message = 'Internal Server Error', $details = null)
    {
        $bootstrap = Bootstrap::getInstance();
        
        $response = [
            'success' => false,
            'error' => $message,
            'timestamp' => date('c'),
            'api_version' => '1.0.0'
        ];
        
        // Add debug information in development
        if ($bootstrap->isDebug()) {
            $response['debug'] = $details;
        }
        
        self::send($response, 500);
    }
    
    /**
     * Send a paginated response
     */
    public static function paginated($data, $total, $page = 1, $perPage = 20, $message = null)
    {
        $totalPages = ceil($total / $perPage);
        
        self::send([
            'success' => true,
            'data' => $data,
            'pagination' => [
                'current_page' => (int)$page,
                'per_page' => (int)$perPage,
                'total' => (int)$total,
                'total_pages' => (int)$totalPages,
                'has_next' => $page < $totalPages,
                'has_prev' => $page > 1
            ],
            'message' => $message,
            'timestamp' => date('c'),
            'api_version' => '1.0.0'
        ], 200);
    }
    
    /**
     * Send a created response (201)
     */
    public static function created($data = null, $message = 'Resource created successfully')
    {
        self::send([
            'success' => true,
            'data' => $data,
            'message' => $message,
            'timestamp' => date('c'),
            'api_version' => '1.0.0'
        ], 201);
    }
    
    /**
     * Send an updated response
     */
    public static function updated($data = null, $message = 'Resource updated successfully')
    {
        self::send([
            'success' => true,
            'data' => $data,
            'message' => $message,
            'timestamp' => date('c'),
            'api_version' => '1.0.0'
        ], 200);
    }
    
    /**
     * Send a deleted response
     */
    public static function deleted($message = 'Resource deleted successfully')
    {
        self::send([
            'success' => true,
            'message' => $message,
            'timestamp' => date('c'),
            'api_version' => '1.0.0'
        ], 200);
    }
    
    /**
     * Send a no content response (204)
     */
    public static function noContent()
    {
        http_response_code(204);
        exit;
    }
    
    /**
     * Send rate limit exceeded response
     */
    public static function rateLimitExceeded($message = 'Rate limit exceeded')
    {
        self::send([
            'success' => false,
            'error' => $message,
            'timestamp' => date('c'),
            'api_version' => '1.0.0'
        ], 429);
    }
    
    /**
     * Send the actual JSON response
     */
    private static function send($data, $status = 200)
    {
        // Set HTTP status code
        http_response_code($status);
        
        // Ensure content type is set
        if (!headers_sent()) {
            header('Content-Type: application/json; charset=utf-8');
        }
        
        // Output JSON and exit
        echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    /**
     * Handle PHP exceptions and errors
     */
    public static function handleException($exception)
    {
        $bootstrap = Bootstrap::getInstance();
        
        $message = 'An unexpected error occurred';
        $details = null;
        
        if ($bootstrap->isDebug()) {
            $message = $exception->getMessage();
            $details = [
                'file' => $exception->getFile(),
                'line' => $exception->getLine(),
                'trace' => $exception->getTraceAsString()
            ];
        }
        
        // Log the error
        error_log(sprintf(
            '[%s] API Error: %s in %s:%d',
            date('Y-m-d H:i:s'),
            $exception->getMessage(),
            $exception->getFile(),
            $exception->getLine()
        ));
        
        self::serverError($message, $details);
    }
    
    /**
     * Send custom response with any status code
     */
    public static function custom($data, $status = 200)
    {
        self::send($data, $status);
    }
    
    /**
     * Generate a response but don't send it (for testing)
     */
    public static function generate($data, $status = 200)
    {
        return [
            'status' => $status,
            'body' => json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
        ];
    }
}