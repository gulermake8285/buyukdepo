<?php

namespace Arsa;

/**
 * ARSA Token API - Router Class
 * Handles URL routing and dispatching
 */
class Router
{
    private $routes = [];
    private $currentRoute = null;
    private $params = [];
    
    /**
     * Add a GET route
     */
    public function get($pattern, $handler)
    {
        $this->addRoute('GET', $pattern, $handler);
        return $this;
    }
    
    /**
     * Add a POST route
     */
    public function post($pattern, $handler)
    {
        $this->addRoute('POST', $handler);
        return $this;
    }
    
    /**
     * Add a PUT route
     */
    public function put($pattern, $handler)
    {
        $this->addRoute('PUT', $pattern, $handler);
        return $this;
    }
    
    /**
     * Add a DELETE route
     */
    public function delete($pattern, $handler)
    {
        $this->addRoute('DELETE', $pattern, $handler);
        return $this;
    }
    
    /**
     * Add a route for any HTTP method
     */
    public function any($pattern, $handler)
    {
        $methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
        foreach ($methods as $method) {
            $this->addRoute($method, $pattern, $handler);
        }
        return $this;
    }
    
    /**
     * Add a route
     */
    private function addRoute($method, $pattern, $handler)
    {
        $this->routes[] = [
            'method' => $method,
            'pattern' => $pattern,
            'handler' => $handler
        ];
    }
    
    /**
     * Dispatch the current request
     */
    public function dispatch()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = $_SERVER['REQUEST_URI'];
        $path = parse_url($uri, PHP_URL_PATH);
        
        // Remove base path if API is in subfolder
        $basePath = dirname($_SERVER['SCRIPT_NAME']);
        if ($basePath !== '/') {
            $path = substr($path, strlen($basePath));
        }
        
        // Clean path
        $path = $this->cleanPath($path);
        
        // Find matching route
        foreach ($this->routes as $route) {
            if ($route['method'] === $method && $this->matchPattern($route['pattern'], $path)) {
                $this->currentRoute = $route;
                return $this->executeHandler($route['handler']);
            }
        }
        
        // No route found - 404
        Response::notFound([
            'error' => 'Endpoint not found',
            'message' => 'The requested API endpoint does not exist',
            'path' => $path,
            'method' => $method,
            'available_routes' => $this->getAvailableRoutes()
        ]);
    }
    
    /**
     * Clean and normalize path
     */
    private function cleanPath($path)
    {
        // Remove trailing slash except for root
        $path = rtrim($path, '/');
        if (empty($path)) {
            $path = '/';
        }
        
        return $path;
    }
    
    /**
     * Check if pattern matches path and extract parameters
     */
    private function matchPattern($pattern, $path)
    {
        // Reset parameters
        $this->params = [];
        
        // Simple exact match
        if ($pattern === $path) {
            return true;
        }
        
        // Convert pattern to regex
        $regex = $this->patternToRegex($pattern);
        
        if (preg_match($regex, $path, $matches)) {
            // Extract named parameters
            $this->extractParams($pattern, $matches);
            return true;
        }
        
        return false;
    }
    
    /**
     * Convert route pattern to regex
     */
    private function patternToRegex($pattern)
    {
        // Escape special regex characters
        $pattern = preg_quote($pattern, '/');
        
        // Replace parameter placeholders with regex groups
        $pattern = preg_replace('/\\\\{([a-zA-Z0-9_]+)\\\\}/', '([^/]+)', $pattern);
        
        return '/^' . $pattern . '$/';
    }
    
    /**
     * Extract parameters from matched route
     */
    private function extractParams($pattern, $matches)
    {
        // Find parameter names in pattern
        preg_match_all('/\\{([a-zA-Z0-9_]+)\\}/', $pattern, $paramNames);
        
        // Map parameter names to values
        for ($i = 0; $i < count($paramNames[1]); $i++) {
            $paramName = $paramNames[1][$i];
            $paramValue = $matches[$i + 1] ?? null;
            $this->params[$paramName] = $paramValue;
        }
    }
    
    /**
     * Execute route handler
     */
    private function executeHandler($handler)
    {
        if (is_callable($handler)) {
            // Call function/closure
            return call_user_func($handler, $this->params);
        } elseif (is_string($handler)) {
            // Call method on class
            $this->callControllerMethod($handler);
        } else {
            Response::error('Invalid route handler', 500);
        }
    }
    
    /**
     * Call controller method
     */
    private function callControllerMethod($handler)
    {
        // Parse controller@method format
        if (strpos($handler, '@') !== false) {
            list($controller, $method) = explode('@', $handler);
            
            $controllerClass = "Arsa\\Controllers\\{$controller}";
            
            if (class_exists($controllerClass)) {
                $instance = new $controllerClass();
                if (method_exists($instance, $method)) {
                    return $instance->$method($this->params);
                } else {
                    Response::error("Method {$method} not found in {$controller}", 500);
                }
            } else {
                Response::error("Controller {$controller} not found", 500);
            }
        } else {
            Response::error('Invalid controller format', 500);
        }
    }
    
    /**
     * Get current route parameters
     */
    public function getParams()
    {
        return $this->params;
    }
    
    /**
     * Get specific parameter
     */
    public function getParam($name, $default = null)
    {
        return $this->params[$name] ?? $default;
    }
    
    /**
     * Get all available routes for 404 response
     */
    private function getAvailableRoutes()
    {
        $routes = [];
        foreach ($this->routes as $route) {
            $key = $route['method'] . ' ' . $route['pattern'];
            $routes[] = $key;
        }
        return array_unique($routes);
    }
    
    /**
     * Group routes with common prefix
     */
    public function group($prefix, $callback)
    {
        $originalRoutes = $this->routes;
        $this->routes = [];
        
        // Execute callback to collect group routes
        call_user_func($callback, $this);
        
        // Add prefix to all routes in group
        $groupRoutes = $this->routes;
        foreach ($groupRoutes as &$route) {
            $route['pattern'] = rtrim($prefix, '/') . '/' . ltrim($route['pattern'], '/');
        }
        
        // Merge back with original routes
        $this->routes = array_merge($originalRoutes, $groupRoutes);
        
        return $this;
    }
}