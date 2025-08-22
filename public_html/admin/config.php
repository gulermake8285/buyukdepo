<?php
/**
 * ARSA Token - Admin Configuration
 * Uses unified database configuration
 */

// Load unified database configuration
require_once __DIR__ . '/../config/database.php';

// Admin-specific settings
define('ADMIN_SESSION_TIMEOUT', 3600); // 1 hour
define('ADMIN_MAX_LOGIN_ATTEMPTS', 5);
define('ADMIN_LOCKOUT_TIME', 900); // 15 minutes

// Admin users configuration
$ADMIN_USERS = [
    'admin' => [
        'password' => 'arsa123', // In production, use password_hash()
        'role' => 'super_admin',
        'permissions' => ['all']
    ],
    'editor' => [
        'password' => 'arsaedit',
        'role' => 'editor',
        'permissions' => ['properties', 'content']
    ],
    'manager' => [
        'password' => 'arsamgr',
        'role' => 'manager',
        'permissions' => ['properties', 'users', 'analytics']
    ]
];

/**
 * Validate admin credentials
 * @param string $username
 * @param string $password
 * @return array|false User data or false
 */
function validateAdminCredentials($username, $password) {
    global $ADMIN_USERS;
    
    if (isset($ADMIN_USERS[$username]) && $ADMIN_USERS[$username]['password'] === $password) {
        return [
            'username' => $username,
            'role' => $ADMIN_USERS[$username]['role'],
            'permissions' => $ADMIN_USERS[$username]['permissions']
        ];
    }
    
    return false;
}

/**
 * Check if user has permission
 * @param array $user User data
 * @param string $permission Permission to check
 * @return bool
 */
function hasPermission($user, $permission) {
    return in_array('all', $user['permissions']) || in_array($permission, $user['permissions']);
}
?>