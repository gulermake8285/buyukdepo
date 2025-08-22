# ARSA Token API v2.0

## Simplified and Clean API Structure

### Endpoints

#### Public Endpoints
- `GET /` or `/health` - API health check
- `GET /properties` - Get all properties
- `GET /properties/{id}` - Get single property details

#### Admin Endpoints
- `POST /admin/login` - Admin authentication
- `GET /admin/dashboard` - Dashboard statistics

### Database Configuration

The API automatically loads database configuration from environment variables or uses defaults:

```php
$DB_CONFIG = [
    'host' => 'localhost',
    'name' => 'u2368732_arsanew',
    'user' => 'u2368732_arsa',
    'pass' => 'R0DE034jvc56!!!',
    'charset' => 'utf8mb4'
];
```

### Authentication

Simple admin authentication with predefined users:
- `admin` / `arsa123` (super_admin)
- `editor` / `arsaedit` (admin)
- `manager` / `arsamgr` (admin)

### Response Format

All API responses follow this format:

```json
{
    "success": true|false,
    "data": {...},
    "message": "Response message",
    "timestamp": "2025-01-11T10:30:00+00:00",
    "api_version": "2.0.0"
}
```

### Features

- ✅ Clean URL routing
- ✅ Unified database configuration
- ✅ Proper error handling
- ✅ CORS support
- ✅ Security headers
- ✅ JSON response formatting
- ✅ Admin authentication
- ✅ Database connection pooling

### Changes from v1.0

- Removed complex file structure
- Unified database configuration
- Simplified routing system
- Better error handling
- Consistent response format
- Removed unnecessary dependencies