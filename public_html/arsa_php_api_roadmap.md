# 🚀 ARSA PHP API - Yol Haritası ve Geliştirme Planı

## 📋 **Genel Bakış**
Mevcut projenin üzerine modern PHP REST API yapısı kurulması

---

## 🎯 **Hedef Yapı**
```
/public_html/arsa/api/
├── public/
│   ├── index.php                 # Front Controller
│   └── .htaccess                # URL Rewriting
├── src/
│   ├── Bootstrap.php            # App başlatma
│   ├── Router.php               # Route yönetimi
│   ├── Response.php             # JSON response helper
│   ├── Db.php                   # Database connection
│   ├── Controllers/
│   │   ├── PropertyController.php
│   │   ├── EpochController.php
│   │   ├── ClaimController.php
│   │   ├── AdminController.php
│   │   └── AssetEventController.php
│   ├── Services/
│   │   ├── MerkleService.php
│   │   ├── SnapshotService.php
│   │   ├── IpfsService.php
│   │   ├── SiweService.php
│   │   └── RateLimiter.php
│   └── Utils/
│       ├── Validator.php
│       ├── CSRF.php
│       └── Jwt.php
├── config/
│   ├── config.php
│   └── routes.php
├── storage/
│   ├── uploads/
│   └── logs/
├── .env
├── .env.example
├── composer.json
└── README.md
```

---

## 📅 **Aşamalı Geliştirme Planı**

### **ADIM 1: Temel Yapı Kurulumu** ⏱️ *30-45 dk*
- [ ] `composer.json` oluşturma
- [ ] `.env` ve `.env.example` dosyaları
- [ ] Temel klasör yapısı
- [ ] `public/index.php` Front Controller
- [ ] `.htaccess` URL rewriting

### **ADIM 2: Core Classes** ⏱️ *45-60 dk*
- [ ] `src/Bootstrap.php` - App initialization
- [ ] `src/Router.php` - Route management
- [ ] `src/Response.php` - JSON response helper
- [ ] `src/Db.php` - Database connection (PDO)
- [ ] `config/config.php` - Configuration
- [ ] `config/routes.php` - Route definitions

### **ADIM 3: Utility Classes** ⏱️ *30-45 dk*
- [ ] `src/Utils/Validator.php` - Input validation
- [ ] `src/Utils/CSRF.php` - CSRF protection
- [ ] `src/Utils/Jwt.php` - JWT token management
- [ ] `src/Services/RateLimiter.php` - Rate limiting

### **ADIM 4: Controllers - Temel API'ler** ⏱️ *60-90 dk*
- [ ] `PropertyController.php` - Emlak CRUD
- [ ] `AdminController.php` - Admin operations
- [ ] Temel endpoint'ler:
  - `GET /properties`
  - `GET /properties/:id`
  - `POST /admin/property`
  - `GET /admin/dashboard`

### **ADIM 5: Authentication - SIWE** ⏱️ *45-60 dk*
- [ ] `src/Services/SiweService.php`
- [ ] Auth endpoints:
  - `GET /auth/siwe/nonce`
  - `POST /auth/siwe/verify`
- [ ] Session management

### **ADIM 6: Advanced Controllers** ⏱️ *60-90 dk*
- [ ] `EpochController.php` - Epoch management
- [ ] `ClaimController.php` - Claim system
- [ ] `AssetEventController.php` - Asset events
- [ ] Advanced endpoints:
  - `POST /admin/epoch/prepare`
  - `POST /admin/epoch/publish`
  - `GET /claim/:epochId`
  - `POST /asset-event`

### **ADIM 7: Services** ⏱️ *45-60 dk*
- [ ] `MerkleService.php` - Merkle tree operations
- [ ] `SnapshotService.php` - Snapshot management
- [ ] `IpfsService.php` - IPFS integration (mock)

### **ADIM 8: Database Integration** ⏱️ *30-45 dk*
- [ ] Mevcut database schema ile entegrasyon
- [ ] SQL migration scripts
- [ ] Data validation

### **ADIM 9: Testing & Documentation** ⏱️ *30-45 dk*
- [ ] API testing
- [ ] `README.md` documentation
- [ ] Postman collection
- [ ] Error handling

### **ADIM 10: Deployment** ⏱️ *30-45 dk*
- [ ] Natro hosting'e upload
- [ ] Environment setup
- [ ] Final testing

---

## 🛡️ **Güvenlik Özellikleri**
- ✅ CSRF Protection
- ✅ Rate Limiting (60 req/5min per IP)
- ✅ Input Validation & Sanitization
- ✅ SQL Injection Prevention (PDO)
- ✅ CORS Headers
- ✅ HttpOnly Session Cookies

---

## 🔌 **API Endpoints Listesi**

### **Public Endpoints**
```
GET    /health                    # Health check
GET    /properties               # Property list
GET    /properties/:id           # Property details
GET    /claim/:epochId           # Claim info
```

### **Auth Endpoints**
```
GET    /auth/siwe/nonce         # Get nonce for SIWE
POST   /auth/siwe/verify        # Verify SIWE signature
POST   /auth/logout             # Logout
```

### **Admin Endpoints** (Authentication Required)
```
POST   /admin/property          # Create/update property
GET    /admin/dashboard         # Admin dashboard data
POST   /admin/epoch/prepare     # Prepare epoch
POST   /admin/epoch/publish     # Publish epoch
POST   /asset-event             # Asset event
```

---

## 🔄 **Mevcut Proje Entegrasyonu**

### **Korunacak Özellikler**
- ✅ Mevcut database schema
- ✅ File upload sistemi
- ✅ Admin panel frontend
- ✅ Property data structure

### **Modernize Edilecekler**
- 🔧 API klasör yapısı (düzeltilecek)
- 🔧 Response format standardization
- 🔧 Error handling
- 🔧 Authentication system

### **Yeni Eklenecekler**
- ✨ SIWE authentication
- ✨ Epoch management
- ✨ Claim system
- ✨ Rate limiting
- ✨ CORS support

---

## 📦 **Gerekli Paketler**
```json
{
  "require": {
    "vlucas/phpdotenv": "^5.6",
    "firebase/php-jwt": "^6.9"
  }
}
```

---

## 🧪 **Test Senaryoları**
1. **Basic Health Check**: `GET /health` → `200 OK`
2. **Property List**: `GET /properties` → Property array
3. **SIWE Flow**: Nonce → Sign → Verify → Session
4. **Admin Auth**: Protected endpoint access
5. **Rate Limiting**: 60+ requests → 429 Too Many Requests

---

## 📈 **İlerleme Takibi**

| Adım | Durum | Tahmini Süre | Gerçek Süre |
|------|-------|--------------|-------------|
| 1. Temel Yapı | ⏳ | 30-45 dk | - |
| 2. Core Classes | ⏳ | 45-60 dk | - |
| 3. Utility Classes | ⏳ | 30-45 dk | - |
| 4. Controllers | ⏳ | 60-90 dk | - |
| 5. Authentication | ⏳ | 45-60 dk | - |
| 6. Advanced Controllers | ⏳ | 60-90 dk | - |
| 7. Services | ⏳ | 45-60 dk | - |
| 8. Database | ⏳ | 30-45 dk | - |
| 9. Testing | ⏳ | 30-45 dk | - |
| 10. Deployment | ⏳ | 30-45 dk | - |

**Toplam Tahmini Süre**: 6-9 saat (1-2 gün)

---

## 🎯 **Sonuç**
Bu API, mevcut projenizi modern bir REST API architecture'a dönüştürecek ve blockchain özellikleri için güçlü bir backend sağlayacak.