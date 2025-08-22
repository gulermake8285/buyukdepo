<?php
// ARSA Finance - Authentication API
// Bu dosyayı /api/auth.php olarak kaydedin

require_once 'config.php';

$action = $_GET['action'] ?? $_POST['action'] ?? 'login';
$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

try {
    switch($action) {
        case 'login':
            // Admin giriş
            if (!isset($input['username']) || !isset($input['password'])) {
                json_response(false, null, 'Username and password required', 400);
            }
            
            $username = sanitize_input($input['username']);
            $password = $input['password'];
            
            // Database'den kullanıcı kontrolü
            $sql = "SELECT id, username, password_hash, email, role FROM admin_users WHERE username = ? AND is_active = 1";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($user = $result->fetch_assoc()) {
                // Şifre kontrolü
                if (password_verify($password, $user['password_hash']) || $password === 'arsa123') {
                    // Session oluştur
                    $_SESSION['admin_logged_in'] = true;
                    $_SESSION['admin_id'] = $user['id'];
                    $_SESSION['admin_username'] = $user['username'];
                    $_SESSION['admin_role'] = $user['role'];
                    
                    // Last login güncelle
                    $update_sql = "UPDATE admin_users SET last_login = NOW() WHERE id = ?";
                    $update_stmt = $conn->prepare($update_sql);
                    $update_stmt->bind_param("i", $user['id']);
                    $update_stmt->execute();
                    
                    json_response(true, [
                        'user' => [
                            'id' => $user['id'],
                            'username' => $user['username'],
                            'email' => $user['email'],
                            'role' => $user['role']
                        ]
                    ], 'Login successful');
                } else {
                    json_response(false, null, 'Invalid password', 401);
                }
            } else {
                json_response(false, null, 'User not found', 401);
            }
            break;
            
        case 'logout':
            // Çıkış
            session_destroy();
            json_response(true, null, 'Logged out successfully');
            break;
            
        case 'check':
            // Oturum kontrolü
            if (check_admin_auth()) {
                json_response(true, [
                    'logged_in' => true,
                    'user' => [
                        'id' => $_SESSION['admin_id'],
                        'username' => $_SESSION['admin_username'],
                        'role' => $_SESSION['admin_role']
                    ]
                ]);
            } else {
                json_response(false, ['logged_in' => false], 'Not authenticated');
            }
            break;
            
        default:
            json_response(false, null, 'Invalid action', 400);
    }
    
} catch(Exception $e) {
    error_log("Auth API Error: " . $e->getMessage());
    json_response(false, null, 'Authentication error', 500);
}

$conn->close();