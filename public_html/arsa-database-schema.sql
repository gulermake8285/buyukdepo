-- ===================================================================
-- ARSA Token - Professional Database Schema v2.0.0
-- Fixed SQL Syntax & Enhanced Structure
-- Date: August 15, 2025
-- ===================================================================

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS `arsa_token_db` 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `arsa_token_db`;

-- ===================================================================
-- 1. PROPERTIES TABLE (Main Real Estate Data)
-- ===================================================================
CREATE TABLE IF NOT EXISTS `properties` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL COMMENT 'Property name',
    `description` text COMMENT 'Property description',
    `city` varchar(100) NOT NULL COMMENT 'City name',
    `country` varchar(100) DEFAULT 'Germany' COMMENT 'Country name',
    `property_type` enum('Office','Residential','Commercial','Logistics') NOT NULL DEFAULT 'Office' COMMENT 'Type of property',
    `total_value` decimal(12,2) NOT NULL COMMENT 'Total property value in EUR',
    `nft_price` decimal(8,2) NOT NULL DEFAULT 100.00 COMMENT 'Price per NFT in EUR',
    `total_nfts` int(11) NOT NULL DEFAULT 1000 COMMENT 'Total number of NFTs',
    `sold_nfts` int(11) DEFAULT 0 COMMENT 'Number of sold NFTs',
    `available_nfts` int(11) NOT NULL COMMENT 'Available NFTs for sale',
    `monthly_rent` decimal(10,2) NOT NULL COMMENT 'Monthly rental income',
    `annual_yield` decimal(4,2) NOT NULL COMMENT 'Annual yield percentage',
    `status` enum('Available','Hot','Sold Out','Pending') DEFAULT 'Available' COMMENT 'Property status',
    `main_image` varchar(500) COMMENT 'Main property image URL',
    `address` text COMMENT 'Full property address',
    `coordinates` point COMMENT 'GPS coordinates',
    `features` json COMMENT 'Property features and amenities',
    `documents` json COMMENT 'Legal documents and certificates',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `is_active` tinyint(1) DEFAULT 1 COMMENT 'Is property active',
    `featured` tinyint(1) DEFAULT 0 COMMENT 'Is property featured',
    `views` int(11) DEFAULT 0 COMMENT 'Number of views',
    PRIMARY KEY (`id`),
    KEY `idx_status` (`status`),
    KEY `idx_property_type` (`property_type`),
    KEY `idx_city` (`city`),
    KEY `idx_featured` (`featured`),
    KEY `idx_is_active` (`is_active`),
    KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Main properties table';

-- ===================================================================
-- 2. PROPERTY IMAGES TABLE (Multiple Images Support)
-- ===================================================================
CREATE TABLE IF NOT EXISTS `property_images` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `property_id` int(11) NOT NULL,
    `image_url` varchar(500) NOT NULL COMMENT 'Image file path',
    `image_title` varchar(255) COMMENT 'Image title/alt text',
    `image_description` text COMMENT 'Image description',
    `is_main` tinyint(1) DEFAULT 0 COMMENT 'Is this the main image',
    `sort_order` int(3) DEFAULT 0 COMMENT 'Display order',
    `file_size` int(11) COMMENT 'File size in bytes',
    `image_width` int(11) COMMENT 'Image width in pixels',
    `image_height` int(11) COMMENT 'Image height in pixels',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_property_id` (`property_id`),
    KEY `idx_is_main` (`is_main`),
    KEY `idx_sort_order` (`sort_order`),
    FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Property images table';

-- ===================================================================
-- 3. ADMIN USERS TABLE (Authentication)
-- ===================================================================
CREATE TABLE IF NOT EXISTS `admin_users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(50) NOT NULL,
    `password_hash` varchar(255) NOT NULL COMMENT 'Bcrypt password hash',
    `email` varchar(255) NOT NULL,
    `first_name` varchar(100),
    `last_name` varchar(100),
    `role` enum('super_admin','admin','editor','viewer') DEFAULT 'admin',
    `permissions` json COMMENT 'User permissions',
    `last_login` timestamp NULL,
    `last_ip` varchar(45) COMMENT 'Last login IP address',
    `login_attempts` int(3) DEFAULT 0 COMMENT 'Failed login attempts',
    `locked_until` timestamp NULL COMMENT 'Account locked until',
    `two_factor_secret` varchar(32) COMMENT '2FA secret key',
    `two_factor_enabled` tinyint(1) DEFAULT 0,
    `is_active` tinyint(1) DEFAULT 1,
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_username` (`username`),
    UNIQUE KEY `unique_email` (`email`),
    KEY `idx_role` (`role`),
    KEY `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Admin users table';

-- ===================================================================
-- 4. SITE SETTINGS TABLE (Configuration)
-- ===================================================================
CREATE TABLE IF NOT EXISTS `site_settings` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `setting_key` varchar(100) NOT NULL,
    `setting_value` longtext,
    `setting_type` enum('text','number','boolean','json','html','image','file') DEFAULT 'text',
    `setting_group` varchar(50) DEFAULT 'general' COMMENT 'Settings group',
    `setting_description` text COMMENT 'Setting description',
    `is_public` tinyint(1) DEFAULT 0 COMMENT 'Can be accessed publicly',
    `updated_by` int(11) COMMENT 'Updated by admin user ID',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_key` (`setting_key`),
    KEY `idx_setting_group` (`setting_group`),
    KEY `idx_is_public` (`is_public`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Site settings table';

-- ===================================================================
-- 5. NFT TRANSACTIONS TABLE (Blockchain Transactions)
-- ===================================================================
CREATE TABLE IF NOT EXISTS `nft_transactions` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `property_id` int(11) NOT NULL,
    `user_email` varchar(255) NOT NULL,
    `user_name` varchar(255),
    `wallet_address` varchar(255) NOT NULL,
    `nft_count` int(11) NOT NULL,
    `nft_price` decimal(8,2) NOT NULL COMMENT 'Price per NFT at time of purchase',
    `total_amount` decimal(10,2) NOT NULL,
    `currency` varchar(10) DEFAULT 'EUR',
    `transaction_hash` varchar(255) COMMENT 'Blockchain transaction hash',
    `block_number` bigint COMMENT 'Block number',
    `gas_used` bigint COMMENT 'Gas used for transaction',
    `gas_price` bigint COMMENT 'Gas price in wei',
    `network` varchar(50) DEFAULT 'ethereum' COMMENT 'Blockchain network',
    `token_ids` json COMMENT 'Array of NFT token IDs',
    `status` enum('pending','confirming','completed','failed','refunded') DEFAULT 'pending',
    `payment_method` enum('crypto','bank_transfer','card') DEFAULT 'crypto',
    `payment_gateway` varchar(50) COMMENT 'Payment gateway used',
    `payment_reference` varchar(255) COMMENT 'Payment gateway reference',
    `failure_reason` text COMMENT 'Reason for failure if failed',
    `refund_amount` decimal(10,2) COMMENT 'Refunded amount',
    `refund_date` timestamp NULL COMMENT 'Refund date',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    `confirmed_at` timestamp NULL COMMENT 'Transaction confirmation time',
    `completed_at` timestamp NULL COMMENT 'Transaction completion time',
    PRIMARY KEY (`id`),
    KEY `idx_property_id` (`property_id`),
    KEY `idx_user_email` (`user_email`),
    KEY `idx_wallet_address` (`wallet_address`),
    KEY `idx_status` (`status`),
    KEY `idx_transaction_hash` (`transaction_hash`),
    KEY `idx_created_at` (`created_at`),
    FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='NFT transactions table';

-- ===================================================================
-- 6. CONTENT TRANSLATIONS TABLE (Multi-language Support)
-- ===================================================================
CREATE TABLE IF NOT EXISTS `content_translations` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `language` varchar(5) NOT NULL COMMENT 'Language code (tr, en, ar)',
    `translation_key` varchar(255) NOT NULL COMMENT 'Translation key',
    `translation_value` text NOT NULL COMMENT 'Translated content',
    `translation_group` varchar(50) DEFAULT 'general' COMMENT 'Translation group',
    `is_active` tinyint(1) DEFAULT 1,
    `updated_by` int(11) COMMENT 'Updated by admin user ID',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_lang_key` (`language`, `translation_key`),
    KEY `idx_language` (`language`),
    KEY `idx_translation_group` (`translation_group`),
    KEY `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Content translations table';

-- ===================================================================
-- 7. USER SESSIONS TABLE (Session Management)
-- ===================================================================
CREATE TABLE IF NOT EXISTS `user_sessions` (
    `id` varchar(128) NOT NULL COMMENT 'Session ID',
    `user_id` int(11),
    `user_type` enum('admin','user') DEFAULT 'user',
    `ip_address` varchar(45),
    `user_agent` text,
    `data` text COMMENT 'Session data',
    `last_activity` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_last_activity` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='User sessions table';

-- ===================================================================
-- 8. ACTIVITY LOGS TABLE (Audit Trail)
-- ===================================================================
CREATE TABLE IF NOT EXISTS `activity_logs` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11),
    `user_type` enum('admin','user','system') DEFAULT 'user',
    `action` varchar(100) NOT NULL COMMENT 'Action performed',
    `resource` varchar(100) COMMENT 'Resource affected',
    `resource_id` int(11) COMMENT 'Resource ID',
    `description` text COMMENT 'Action description',
    `ip_address` varchar(45),
    `user_agent` text,
    `request_data` json COMMENT 'Request data',
    `response_data` json COMMENT 'Response data',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_action` (`action`),
    KEY `idx_resource` (`resource`),
    KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Activity logs table';

-- ===================================================================
-- 9. NEWSLETTER SUBSCRIBERS TABLE
-- ===================================================================
CREATE TABLE IF NOT EXISTS `newsletter_subscribers` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(255) NOT NULL,
    `name` varchar(255),
    `language` varchar(5) DEFAULT 'tr',
    `interests` json COMMENT 'Subscriber interests',
    `source` varchar(100) COMMENT 'Subscription source',
    `is_verified` tinyint(1) DEFAULT 0,
    `verification_token` varchar(64),
    `is_active` tinyint(1) DEFAULT 1,
    `subscribed_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    `verified_at` timestamp NULL,
    `unsubscribed_at` timestamp NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_email` (`email`),
    KEY `idx_is_active` (`is_active`),
    KEY `idx_is_verified` (`is_verified`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Newsletter subscribers';

-- ===================================================================
-- 10. CONTACT MESSAGES TABLE
-- ===================================================================
CREATE TABLE IF NOT EXISTS `contact_messages` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `phone` varchar(50),
    `subject` varchar(255),
    `message` text NOT NULL,
    `language` varchar(5) DEFAULT 'tr',
    `ip_address` varchar(45),
    `user_agent` text,
    `is_read` tinyint(1) DEFAULT 0,
    `replied_at` timestamp NULL,
    `replied_by` int(11),
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_is_read` (`is_read`),
    KEY `idx_email` (`email`),
    KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Contact form messages';

-- ===================================================================
-- INSERT DEFAULT DATA
-- ===================================================================

-- Default admin user (username: admin, password: admin123)
INSERT INTO `admin_users` (`username`, `password_hash`, `email`, `first_name`, `last_name`, `role`, `permissions`) VALUES
('admin', '$2y$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewVyDhN7jY.9KJ2a', 'admin@arsatoken.com', 'Admin', 'User', 'super_admin', '{"properties": ["create", "read", "update", "delete"], "users": ["create", "read", "update", "delete"], "settings": ["read", "update"], "analytics": ["read"]}');

-- Default site settings
INSERT INTO `site_settings` (`setting_key`, `setting_value`, `setting_type`, `setting_group`, `setting_description`, `is_public`) VALUES
-- General Settings
('site_title', 'ARSA Token', 'text', 'general', 'Site title', 1),
('site_subtitle', 'Gayrimenkul NFT Platformu', 'text', 'general', 'Site subtitle', 1),
('site_description', 'Blockchain teknolojisi ile gayrimenkul yatırımını demokratikleştiren ARSA Token platformu', 'text', 'general', 'Site description for SEO', 1),
('site_logo', '', 'image', 'general', 'Site logo image', 1),
('site_favicon', '', 'image', 'general', 'Site favicon', 1),

-- Contact Information
('contact_email', 'info@arsatoken.com', 'text', 'contact', 'Main contact email', 1),
('contact_phone', '+49 30 123456789', 'text', 'contact', 'Contact phone number', 1),
('contact_address', 'Unter den Linden 1, 10117 Berlin, Deutschland', 'text', 'contact', 'Business address', 1),
('support_email', 'support@arsatoken.com', 'text', 'contact', 'Support email', 0),

-- Social Media
('social_media', '{"twitter": "", "telegram": "", "discord": "", "instagram": "", "linkedin": "", "youtube": "", "github": ""}', 'json', 'social', 'Social media links', 1),

-- Homepage Content
('home_title', 'Gayrimenkul Yatırımında Yeni Çağ', 'text', 'content', 'Homepage main title', 1),
('home_subtitle', 'Blockchain teknolojisi ile emlak yatırımını demokratikleştiriyoruz. NFT\'ler aracılığıyla premium gayrimenkullere erişim sağlayın.', 'text', 'content', 'Homepage subtitle', 1),
('home_cta_button', 'Yatırıma Başla', 'text', 'content', 'Homepage CTA button text', 1),

-- About Section
('about_title', 'ARSA Token Hakkında', 'text', 'content', 'About section title', 1),
('about_description', 'ARSA Token, gayrimenkul sektöründe devrim yaratan bir blockchain projesidir. Premium emlakları NFT\'lere dönüştürerek, herkesin erişebileceği bir yatırım ekosistemi oluşturuyoruz.', 'text', 'content', 'About section description', 1),

-- SEO Settings
('meta_keywords', 'gayrimenkul, NFT, blockchain, yatırım, emlak, tokenizasyon, ARSA', 'text', 'seo', 'Meta keywords', 0),
('google_analytics', '', 'text', 'seo', 'Google Analytics tracking ID', 0),
('google_search_console', '', 'text', 'seo', 'Google Search Console verification', 0),

-- API Settings
('api_rate_limit', '100', 'number', 'api', 'API rate limit per hour', 0),
('api_timeout', '30', 'number', 'api', 'API timeout in seconds', 0),

-- Email Settings
('smtp_host', '', 'text', 'email', 'SMTP host', 0),
('smtp_port', '587', 'number', 'email', 'SMTP port', 0),
('smtp_username', '', 'text', 'email', 'SMTP username', 0),
('smtp_password', '', 'text', 'email', 'SMTP password', 0),
('smtp_encryption', 'tls', 'text', 'email', 'SMTP encryption (tls/ssl)', 0),

-- Blockchain Settings
('blockchain_network', 'ethereum', 'text', 'blockchain', 'Blockchain network', 0),
('contract_address', '', 'text', 'blockchain', 'Smart contract address', 0),
('rpc_url', '', 'text', 'blockchain', 'RPC URL for blockchain connection', 0),
('gas_limit', '21000', 'number', 'blockchain', 'Default gas limit', 0),

-- Maintenance
('maintenance_mode', '0', 'boolean', 'system', 'Maintenance mode enabled', 0),
('maintenance_message', 'Site bakımda. Lütfen daha sonra tekrar deneyin.', 'text', 'system', 'Maintenance mode message', 0);

-- Default content translations
INSERT INTO `content_translations` (`language`, `translation_key`, `translation_value`, `translation_group`) VALUES
-- Turkish translations
('tr', 'menu.home', 'Ana Sayfa', 'navigation'),
('tr', 'menu.properties', 'Emlaklar', 'navigation'),
('tr', 'menu.dashboard', 'Panel', 'navigation'),
('tr', 'menu.roadmap', 'Yol Haritası', 'navigation'),
('tr', 'menu.about', 'Hakkımızda', 'navigation'),
('tr', 'menu.contact', 'İletişim', 'navigation'),

('tr', 'button.invest', 'Yatırım Yap', 'buttons'),
('tr', 'button.learn_more', 'Daha Fazla Bilgi', 'buttons'),
('tr', 'button.connect_wallet', 'Cüzdan Bağla', 'buttons'),
('tr', 'button.buy_nft', 'NFT Satın Al', 'buttons'),

('tr', 'status.available', 'Mevcut', 'status'),
('tr', 'status.hot', 'Popüler', 'status'),
('tr', 'status.sold_out', 'Tükendi', 'status'),
('tr', 'status.pending', 'Beklemede', 'status'),

-- English translations
('en', 'menu.home', 'Home', 'navigation'),
('en', 'menu.properties', 'Properties', 'navigation'),
('en', 'menu.dashboard', 'Dashboard', 'navigation'),
('en', 'menu.roadmap', 'Roadmap', 'navigation'),
('en', 'menu.about', 'About', 'navigation'),
('en', 'menu.contact', 'Contact', 'navigation'),

('en', 'button.invest', 'Invest Now', 'buttons'),
('en', 'button.learn_more', 'Learn More', 'buttons'),
('en', 'button.connect_wallet', 'Connect Wallet', 'buttons'),
('en', 'button.buy_nft', 'Buy NFT', 'buttons'),

('en', 'status.available', 'Available', 'status'),
('en', 'status.hot', 'Hot', 'status'),
('en', 'status.sold_out', 'Sold Out', 'status'),
('en', 'status.pending', 'Pending', 'status'),

-- Arabic translations
('ar', 'menu.home', 'الصفحة الرئيسية', 'navigation'),
('ar', 'menu.properties', 'العقارات', 'navigation'),
('ar', 'menu.dashboard', 'لوحة التحكم', 'navigation'),
('ar', 'menu.roadmap', 'خارطة الطريق', 'navigation'),
('ar', 'menu.about', 'حول', 'navigation'),
('ar', 'menu.contact', 'اتصل بنا', 'navigation'),

('ar', 'button.invest', 'استثمر الآن', 'buttons'),
('ar', 'button.learn_more', 'اقرأ المزيد', 'buttons'),
('ar', 'button.connect_wallet', 'ربط المحفظة', 'buttons'),
('ar', 'button.buy_nft', 'شراء NFT', 'buttons'),

('ar', 'status.available', 'متاح', 'status'),
('ar', 'status.hot', 'شائع', 'status'),
('ar', 'status.sold_out', 'نفدت الكمية', 'status'),
('ar', 'status.pending', 'في الانتظار', 'status');

-- Sample properties data
INSERT INTO `properties` (
    `name`, `description`, `city`, `country`, `property_type`, 
    `total_value`, `nft_price`, `total_nfts`, `available_nfts`, `sold_nfts`,
    `monthly_rent`, `annual_yield`, `status`, `main_image`, `address`,
    `features`, `documents`, `featured`
) VALUES
(
    'Berlin Premium Office Complex',
    'Modern workspace in Berlin financial district with high-end facilities and premium location. This AAA-grade office building offers state-of-the-art infrastructure and excellent connectivity.',
    'Berlin',
    'Germany',
    'Office',
    2500000.00,
    100.00,
    1000,
    153,
    847,
    18750.00,
    9.0,
    'Available',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    'Potsdamer Platz 1, 10785 Berlin, Germany',
    '{"building_size": "15000 sqm", "floors": 12, "parking_spaces": 200, "elevators": 4, "amenities": ["Conference rooms", "Cafeteria", "Gym", "Rooftop terrace"], "certifications": ["LEED Gold", "BREEAM Excellent"]}',
    '{"ownership_deed": "DE-BER-2024-001", "building_permit": "BP-2023-456", "energy_certificate": "A+"}',
    1
),
(
    'Munich Residential Complex',
    'Luxury residential complex in Munich city center with modern apartments and excellent infrastructure. Perfect for urban living with all amenities nearby.',
    'Munich',
    'Germany',
    'Residential',
    1800000.00,
    150.00,
    1200,
    0,
    1200,
    13500.00,
    9.0,
    'Sold Out',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    'Marienplatz 5, 80331 Munich, Germany',
    '{"units": 45, "unit_types": ["1BR", "2BR", "3BR", "Penthouse"], "amenities": ["Swimming pool", "Fitness center", "Concierge", "Underground parking"], "completion_year": 2024}',
    '{"ownership_deed": "DE-MUC-2024-002", "building_permit": "BP-2023-789"}',
    1
),
(
    'Hamburg Logistics Center',
    'Strategic logistics center in Hamburg port area with excellent transportation links and modern warehouse facilities.',
    'Hamburg',
    'Germany',
    'Logistics',
    3200000.00,
    80.00,
    1500,
    1500,
    0,
    24000.00,
    9.0,
    'Available',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    'Hafencity 10, 20457 Hamburg, Germany',
    '{"warehouse_size": "25000 sqm", "loading_docks": 20, "office_space": "2000 sqm", "rail_access": true, "highway_access": "A1, A7"}',
    '{"ownership_deed": "DE-HAM-2024-003", "environmental_permit": "EP-2024-123"}',
    0
);

-- Sample property images
INSERT INTO `property_images` (`property_id`, `image_url`, `image_title`, `is_main`, `sort_order`) VALUES
(1, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop', 'Berlin Office - Main View', 1, 1),
(1, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', 'Berlin Office - Interior', 0, 2),
(1, 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&h=600&fit=crop', 'Berlin Office - Conference Room', 0, 3),

(2, 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop', 'Munich Residential - Exterior', 1, 1),
(2, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop', 'Munich Residential - Lobby', 0, 2),

(3, 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop', 'Hamburg Logistics - Warehouse', 1, 1),
(3, 'https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?w=800&h=600&fit=crop', 'Hamburg Logistics - Loading Area', 0, 2);

-- Sample NFT transactions
INSERT INTO `nft_transactions` (
    `property_id`, `user_email`, `user_name`, `wallet_address`, 
    `nft_count`, `nft_price`, `total_amount`, `currency`,
    `transaction_hash`, `status`, `payment_method`, `completed_at`
) VALUES
(1, 'ahmet.yilmaz@email.com', 'Ahmet Yılmaz', '0x742d35cc5ab1234...', 5, 100.00, 500.00, 'EUR', '0x1a2b3c4d5e6f...', 'completed', 'crypto', NOW() - INTERVAL 2 HOUR),
(1, 'fatma.koc@email.com', 'Fatma Koç', '0x851e46dd6ab2345...', 3, 100.00, 300.00, 'EUR', '0x2b3c4d5e6f7a...', 'completed', 'crypto', NOW() - INTERVAL 1 HOUR),
(2, 'mehmet.demir@email.com', 'Mehmet Demir', '0x963f57ee7bc3456...', 10, 150.00, 1500.00, 'EUR', '0x3c4d5e6f7a8b...', 'completed', 'crypto', NOW() - INTERVAL 3 HOUR);

-- ===================================================================
-- CREATE INDEXES FOR PERFORMANCE
-- ===================================================================

-- Additional indexes for better query performance
CREATE INDEX idx_properties_yield ON properties(annual_yield);
CREATE INDEX idx_properties_price ON properties(nft_price);
CREATE INDEX idx_properties_value ON properties(total_value);
CREATE INDEX idx_transactions_amount ON nft_transactions(total_amount);
CREATE INDEX idx_transactions_date ON nft_transactions(created_at, status);

-- ===================================================================
-- CREATE VIEWS FOR COMMON QUERIES
-- ===================================================================

-- Properties with statistics view
CREATE VIEW `property_stats` AS
SELECT 
    p.*,
    COUNT(pi.id) as image_count,
    COUNT(nt.id) as transaction_count,
    SUM(nt.total_amount) as total_sales,
    AVG(nt.nft_price) as avg_nft_price,
    ROUND((p.sold_nfts / p.total_nfts) * 100, 2) as sale_percentage
FROM properties p
LEFT JOIN property_images pi ON p.id = pi.property_id
LEFT JOIN nft_transactions nt ON p.id = nt.property_id AND nt.status = 'completed'
WHERE p.is_active = 1
GROUP BY p.id;

-- Admin dashboard statistics view
CREATE VIEW `admin_dashboard_stats` AS
SELECT 
    COUNT(DISTINCT p.id) as total_properties,
    SUM(p.total_value) as total_portfolio_value,
    COUNT(DISTINCT nt.user_email) as total_investors,
    SUM(nt.total_amount) as total_sales,
    AVG(p.annual_yield) as avg_yield,
    COUNT(DISTINCT CASE WHEN p.status = 'Available' THEN p.id END) as available_properties,
    COUNT(DISTINCT CASE WHEN p.status = 'Sold Out' THEN p.id END) as sold_out_properties
FROM properties p
LEFT JOIN nft_transactions nt ON p.id = nt.property_id AND nt.status = 'completed'
WHERE p.is_active = 1;

-- ===================================================================
-- STORED PROCEDURES FOR COMMON OPERATIONS
-- ===================================================================

DELIMITER //

-- Update property NFT counts after transaction
CREATE PROCEDURE UpdatePropertyNFTCounts(IN property_id INT, IN nft_count INT)
BEGIN
    UPDATE properties 
    SET 
        sold_nfts = sold_nfts + nft_count,
        available_nfts = available_nfts - nft_count,
        status = CASE 
            WHEN (available_nfts - nft_count) <= 0 THEN 'Sold Out'
            WHEN (sold_nfts + nft_count) / total_nfts > 0.8 THEN 'Hot'
            ELSE 'Available'
        END
    WHERE id = property_id;
END //

-- Get property statistics
CREATE PROCEDURE GetPropertyStatistics(IN property_id INT)
BEGIN
    SELECT 
        p.*,
        COUNT(DISTINCT nt.id) as total_transactions,
        COUNT(DISTINCT nt.user_email) as unique_investors,
        SUM(nt.total_amount) as total_revenue,
        AVG(nt.nft_price) as avg_nft_price,
        MIN(nt.created_at) as first_sale_date,
        MAX(nt.created_at) as last_sale_date
    FROM properties p
    LEFT JOIN nft_transactions nt ON p.id = nt.property_id AND nt.status = 'completed'
    WHERE p.id = property_id
    GROUP BY p.id;
END //

DELIMITER ;

-- ===================================================================
-- TRIGGERS FOR DATA INTEGRITY
-- ===================================================================

DELIMITER //

-- Update property available NFTs when sold_nfts changes
CREATE TRIGGER update_available_nfts 
BEFORE UPDATE ON properties
FOR EACH ROW
BEGIN
    SET NEW.available_nfts = NEW.total_nfts - NEW.sold_nfts;
    
    -- Update status based on sales
    IF NEW.available_nfts <= 0 THEN
        SET NEW.status = 'Sold Out';
    ELSEIF (NEW.sold_nfts / NEW.total_nfts) > 0.8 THEN
        SET NEW.status = 'Hot';
    ELSE
        SET NEW.status = 'Available';
    END IF;
END //

-- Log property changes
CREATE TRIGGER log_property_changes
AFTER UPDATE ON properties
FOR EACH ROW
BEGIN
    INSERT INTO activity_logs (user_type, action, resource, resource_id, description, created_at)
    VALUES ('system', 'property_updated', 'properties', NEW.id, 
           CONCAT('Property updated: ', NEW.name), NOW());
END //

-- Update property view count
CREATE TRIGGER increment_property_views
AFTER INSERT ON activity_logs
FOR EACH ROW
BEGIN
    IF NEW.action = 'property_viewed' AND NEW.resource = 'properties' THEN
        UPDATE properties 
        SET views = views + 1 
        WHERE id = NEW.resource_id;
    END IF;
END //

DELIMITER ;

-- ===================================================================
-- FINAL OPTIMIZATIONS
-- ===================================================================

-- Analyze tables for better performance
ANALYZE TABLE properties, property_images, nft_transactions, admin_users, site_settings;

-- Show database summary
SELECT 
    'Database Setup Complete' as status,
    COUNT(DISTINCT table_name) as total_tables,
    'arsa_token_db' as database_name,
    NOW() as created_at
FROM information_schema.tables 
WHERE table_schema = 'arsa_token_db';

-- ===================================================================
-- BACKUP RECOMMENDATIONS
-- ===================================================================

/*
RECOMMENDED BACKUP STRATEGY:
=============================

1. DAILY BACKUP (Automated):
   mysqldump -u username -p arsa_token_db > backup_$(date +%Y%m%d).sql

2. WEEKLY FULL BACKUP:
   mysqldump -u username -p --all-databases > full_backup_$(date +%Y%m%d).sql

3. INCREMENTAL BACKUP:
   mysqlbinlog --start-datetime="2025-08-15 00:00:00" /var/log/mysql/mysql-bin.000001

4. CRITICAL TABLES BACKUP:
   mysqldump -u username -p arsa_token_db properties nft_transactions admin_users > critical_backup.sql

5. BEFORE UPDATES:
   mysqldump -u username -p arsa_token_db > pre_update_backup_$(date +%Y%m%d_%H%M%S).sql
*/