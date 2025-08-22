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