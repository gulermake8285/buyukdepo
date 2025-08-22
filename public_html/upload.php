<?php
// ARSA Finance - Image Upload API
// Bu dosyayı /api/upload.php olarak kaydedin

require_once 'config.php';

// Admin kontrolü
if (!check_admin_auth()) {
    json_response(false, null, 'Admin authentication required', 401);
}

// POST kontrolü
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(false, null, 'Only POST method allowed', 405);
}

// Dosya yükleme kontrolü
if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    json_response(false, null, 'No valid image uploaded', 400);
}

$file = $_FILES['image'];

try {
    // Dosya bilgileri
    $originalName = $file['name'];
    $tempPath = $file['tmp_name'];
    $fileSize = $file['size'];
    $fileError = $file['error'];
    
    // Dosya uzantısı kontrolü
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    $fileExtension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
    
    if (!in_array($fileExtension, $allowedExtensions)) {
        json_response(false, null, 'Only JPG, PNG, WEBP files allowed', 400);
    }
    
    // Dosya boyutu kontrolü (5MB limit)
    $maxFileSize = 5 * 1024 * 1024; // 5MB
    if ($fileSize > $maxFileSize) {
        json_response(false, null, 'File size must be less than 5MB', 400);
    }
    
    // MIME type kontrolü
    $allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    $fileMime = mime_content_type($tempPath);
    
    if (!in_array($fileMime, $allowedMimes)) {
        json_response(false, null, 'Invalid file type', 400);
    }
    
    // Upload klasörü oluştur
    $uploadDir = dirname(__DIR__) . '/uploads/properties/';
    if (!is_dir($uploadDir)) {
        if (!mkdir($uploadDir, 0755, true)) {
            json_response(false, null, 'Failed to create upload directory', 500);
        }
    }
    
    // Benzersiz dosya adı oluştur
    $uniqueName = uniqid('property_', true) . '_' . time() . '.' . $fileExtension;
    $uploadPath = $uploadDir . $uniqueName;
    
    // Dosyayı taşı
    if (!move_uploaded_file($tempPath, $uploadPath)) {
        json_response(false, null, 'Failed to upload file', 500);
    }
    
    // Resmi yeniden boyutlandır (opsiyonel - performans için)
    resizeImage($uploadPath, $uploadPath, 1200, 800);
    
    // URL oluştur
    $imageUrl = SITE_URL . '/uploads/properties/' . $uniqueName;
    
    // Başarılı yanıt
    json_response(true, [
        'url' => $imageUrl,
        'filename' => $uniqueName,
        'original_name' => $originalName,
        'size' => $fileSize,
        'type' => $fileMime
    ], 'Image uploaded successfully');
    
} catch (Exception $e) {
    error_log("Upload Error: " . $e->getMessage());
    json_response(false, null, 'Upload failed', 500);
}

// Resim boyutlandırma fonksiyonu
function resizeImage($source, $destination, $maxWidth, $maxHeight) {
    try {
        $imageInfo = getimagesize($source);
        if (!$imageInfo) return false;
        
        $originalWidth = $imageInfo[0];
        $originalHeight = $imageInfo[1];
        $imageType = $imageInfo[2];
        
        // Eğer resim zaten küçükse boyutlandırma
        if ($originalWidth <= $maxWidth && $originalHeight <= $maxHeight) {
            return true;
        }
        
        // Orantılı boyutlandırma hesapla
        $ratio = min($maxWidth / $originalWidth, $maxHeight / $originalHeight);
        $newWidth = round($originalWidth * $ratio);
        $newHeight = round($originalHeight * $ratio);
        
        // Kaynak resmi oku
        switch ($imageType) {
            case IMAGETYPE_JPEG:
                $sourceImage = imagecreatefromjpeg($source);
                break;
            case IMAGETYPE_PNG:
                $sourceImage = imagecreatefrompng($source);
                break;
            case IMAGETYPE_WEBP:
                $sourceImage = imagecreatefromwebp($source);
                break;
            default:
                return false;
        }
        
        if (!$sourceImage) return false;
        
        // Yeni resim oluştur
        $newImage = imagecreatetruecolor($newWidth, $newHeight);
        
        // PNG için transparency koru
        if ($imageType == IMAGETYPE_PNG) {
            imagealphablending($newImage, false);
            imagesavealpha($newImage, true);
            $transparent = imagecolorallocatealpha($newImage, 255, 255, 255, 127);
            imagefill($newImage, 0, 0, $transparent);
        }
        
        // Boyutlandır
        imagecopyresampled($newImage, $sourceImage, 0, 0, 0, 0, $newWidth, $newHeight, $originalWidth, $originalHeight);
        
        // Kaydet
        switch ($imageType) {
            case IMAGETYPE_JPEG:
                imagejpeg($newImage, $destination, 85);
                break;
            case IMAGETYPE_PNG:
                imagepng($newImage, $destination, 9);
                break;
            case IMAGETYPE_WEBP:
                imagewebp($newImage, $destination, 85);
                break;
        }
        
        // Belleği temizle
        imagedestroy($sourceImage);
        imagedestroy($newImage);
        
        return true;
        
    } catch (Exception $e) {
        error_log("Resize Error: " . $e->getMessage());
        return false;
    }
}
?>