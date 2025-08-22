# Environment
APP_ENV=production
APP_DEBUG=false
APP_NAME="ARSA Token API"

# Database (Natro hosting değerlerinizi girin)
DB_HOST=localhost
DB_NAME=YOUR_ACTUAL_DB_NAME
DB_USER=YOUR_ACTUAL_DB_USER
DB_PASS=YOUR_ACTUAL_DB_PASSWORD
DB_CHARSET=utf8mb4

# Security (Güçlü rastgele değerler üretin)
JWT_SECRET=GENERATE_STRONG_32_CHAR_SECRET_HERE
SESSION_SECRET=GENERATE_STRONG_SESSION_SECRET
CSRF_SECRET=GENERATE_STRONG_CSRF_SECRET

# CORS (Gerçek domain adresiniz)
ALLOWED_ORIGINS=https://yourdomain.com,https://admin.yourdomain.com
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
ADMIN_EMAIL=admin@yourdomain.com
MAINTENANCE_MODE=false