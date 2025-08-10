// ARSA Token - Enhanced Translation System with Full i18n Support
// Bu dosya tüm sayfalarda dil değişimini ve RTL desteğini sağlar

// 1. Enhanced Translation System with Extended Dictionary
class ARSATranslationSystem {
    constructor() {
        this.currentLanguage = localStorage.getItem('selectedLanguage') || 'tr';
        this.translations = {};
        this.isLoading = false;
        this.fallbackLanguage = 'tr';
        this.loadTranslations();
        this.initializeSystem();
    }

    // Comprehensive translation dictionary
    loadTranslations() {
        this.translations = {
            // TÜRKÇE (Default)
            tr: {
                // Navigation
                'nav.home': 'Ana Sayfa',
                'nav.properties': 'Emlaklar',
                'nav.dashboard': 'Dashboard',
                'nav.about': 'Hakkımızda',
                'nav.connect': 'Cüzdan Bağla',

                // Hero Section
                'hero.title': 'NFT ile Gayrimenkul<br>Yatırımı Yapın',
                'hero.subtitle': 'Blockchain teknolojisi ile gayrimenkul yatırımını demokratikleştiriyoruz. Gerçek gayrimenkul destekli bölünmüş NFT\'ler satın alın ve aylık kira geliri kazanın.',
                'hero.start': 'Yatırıma Başla',
                'hero.learn': 'Daha Fazla Bilgi',

                // Stats
                'stats.tvl': 'Toplam Değer',
                'stats.investors': 'Aktif Yatırımcı',
                'stats.properties': 'Emlak Sayısı',
                'stats.monthly': 'Aylık Dağıtım',

                // Features
                'features.title': 'Neden ARSA Token?',
                'features.subtitle': 'Gayrimenkul yatırımının geleceğini yaşayın',

                // Properties
                'properties.title': 'Öne Çıkan Emlaklar',
                'properties.subtitle': 'Premium gayrimenkul fırsatları',
                'properties.view.all': '🏢 Tüm Emlakları Görüntüle (24 Mevcut)',
                'properties.view.all.subtitle': 'Premium gayrimenkul yatırımlarının tam portföyünü keşfedin',

                // Footer
                'footer.follow': 'ARSA Token\'ı Takip Edin',

                // Dashboard
                'dashboard.title': 'Portföyüm',
                'dashboard.subtitle': 'Gayrimenkul NFT yatırımlarınızı ve kazançlarınızı takip edin',
                'dashboard.wallet.required.title': 'Cüzdan Bağlantısı Gerekli',
                'dashboard.wallet.required.text': 'Portföyünüzü görüntülemek ve gayrimenkul NFT yatırımlarınızı takip etmek için lütfen cüzdanınızı bağlayın.',
                'dashboard.wallet.connect': '🔗 Cüzdan Bağla',
                'dashboard.profile.welcome': 'Hoş geldiniz, Yatırımcı!',
                'dashboard.profile.member': 'Ocak 2025\'ten beri üye',
                'dashboard.profile.edit': '✏️ Profili Düzenle',
                'dashboard.profile.settings': '⚙️ Ayarlar',
                'dashboard.profile.export': '📊 Veriyi Dışa Aktar',

                // Admin Panel
                'admin.panel.title': 'ARSA Token - Modern Admin Panel',
                'admin.loading': 'Yetkilendirme kontrol ediliyor...',
                'admin.brand': 'ARSA Admin',
                'admin.logout': '🚪 Çıkış',
                'admin.nav.dashboard': 'Dashboard',
                'admin.nav.properties': 'Emlak Yönetimi',
                'admin.nav.analytics': 'Analitik',
                'admin.nav.transactions': 'İşlemler',
                'admin.nav.content': 'İçerik Yönetimi',
                'admin.nav.users': 'Kullanıcılar',
                'admin.nav.settings': 'Ayarlar',
                'admin.dashboard.title': 'Dashboard',
                'admin.dashboard.subtitle': 'Platform performansının genel görünümü',
                'admin.stats.properties': 'Toplam Emlak',
                'admin.stats.properties.change': '+2 bu ay',
                'admin.stats.users': 'Aktif Kullanıcı',
                'admin.stats.users.change': '+15.3%',
                'admin.stats.volume': 'Toplam Hacim',
                'admin.stats.volume.change': '+22.1%',
                'admin.stats.revenue': 'Aylık Gelir',
                'admin.stats.revenue.change': '+8.7%',
                'admin.activity.title': 'Son Aktiviteler',
                'admin.activity.view.all': 'Tümünü Gör',
                'admin.activity.time': 'Zaman',
                'admin.activity.event': 'Etkinlik',
                'admin.activity.user': 'Kullanıcı',
                'admin.activity.status': 'Durum',
                'admin.activity.actions': 'İşlemler',
                'admin.activity.nft.bought': 'NFT Satın Alındı',
                'admin.activity.rent.distributed': 'Kira Dağıtımı',
                'admin.activity.property.added': 'Yeni Emlak Eklendi',
                'admin.activity.successful': 'Başarılı',
                'admin.activity.completed': 'Tamamlandı',
                'admin.activity.active': 'Aktif',
                'admin.activity.detail': 'Detay',

                // Login
                'admin.login.title': 'ARSA Admin',
                'admin.login.subtitle': 'Güvenli alan - Yönetici kimlik bilgileri gerekli',
                'admin.login.username': 'Kullanıcı Adı',
                'admin.login.password': 'Şifre',
                'admin.login.button': 'Admin Paneline Giriş',
                'admin.login.back': '← Ana siteye geri dön',
                'admin.security.indicator': '🛡️ Güvenli bağlantı - SSL ile şifrelenmiş',

                // Placeholders
                'placeholder.username': 'Kullanıcı adınızı girin',
                'placeholder.password': 'Şifrenizi girin',
                'placeholder.email': 'E-posta adresinizi girin',
                'placeholder.search': 'Arama yapın...',

                // Page Titles
                'title.index': 'ARSA Token - NFT ile Gayrimenkul Yatırımı',
                'title.properties': 'Emlaklar - ARSA Token',
                'title.dashboard': 'Dashboard - ARSA Token',
                'title.property.detail': 'Emlak Detayı - ARSA Token',
                'title.admin': 'Admin Panel - ARSA Token',
                'title.login': 'Admin Giriş - ARSA Token'
            },

            // ENGLISH
            en: {
                // Navigation
                'nav.home': 'Home',
                'nav.properties': 'Properties',
                'nav.dashboard': 'Dashboard',
                'nav.about': 'About',
                'nav.connect': 'Connect Wallet',

                // Hero Section
                'hero.title': 'Invest in Real Estate<br>Through NFTs',
                'hero.subtitle': 'Democratizing real estate investment through blockchain technology. Buy fractionalized NFTs backed by real properties and earn monthly rental income.',
                'hero.start': 'Start Investing',
                'hero.learn': 'Learn More',

                // Stats
                'stats.tvl': 'Total Value Locked',
                'stats.investors': 'Active Investors',
                'stats.properties': 'Properties',
                'stats.monthly': 'Monthly Distributions',

                // Features
                'features.title': 'Why Choose ARSA Token?',
                'features.subtitle': 'Experience the future of real estate investment',

                // Properties
                'properties.title': 'Featured Properties',
                'properties.subtitle': 'Premium real estate opportunities',
                'properties.view.all': '🏢 View All Properties (24 Available)',
                'properties.view.all.subtitle': 'Explore our complete portfolio of premium real estate investments',

                // Footer
                'footer.follow': 'Follow ARSA Token',

                // Dashboard
                'dashboard.title': 'My Portfolio',
                'dashboard.subtitle': 'Track your real estate NFT investments and earnings',
                'dashboard.wallet.required.title': 'Wallet Connection Required',
                'dashboard.wallet.required.text': 'Please connect your wallet to view your portfolio and track your real estate NFT investments.',
                'dashboard.wallet.connect': '🔗 Connect Wallet',
                'dashboard.profile.welcome': 'Welcome, Investor!',
                'dashboard.profile.member': 'Member since January 2025',
                'dashboard.profile.edit': '✏️ Edit Profile',
                'dashboard.profile.settings': '⚙️ Settings',
                'dashboard.profile.export': '📊 Export Data',

                // Admin Panel
                'admin.panel.title': 'ARSA Token - Modern Admin Panel',
                'admin.loading': 'Checking authorization...',
                'admin.brand': 'ARSA Admin',
                'admin.logout': '🚪 Logout',
                'admin.nav.dashboard': 'Dashboard',
                'admin.nav.properties': 'Property Management',
                'admin.nav.analytics': 'Analytics',
                'admin.nav.transactions': 'Transactions',
                'admin.nav.content': 'Content Management',
                'admin.nav.users': 'Users',
                'admin.nav.settings': 'Settings',
                'admin.dashboard.title': 'Dashboard',
                'admin.dashboard.subtitle': 'Platform performance overview',
                'admin.stats.properties': 'Total Properties',
                'admin.stats.properties.change': '+2 this month',
                'admin.stats.users': 'Active Users',
                'admin.stats.users.change': '+15.3%',
                'admin.stats.volume': 'Total Volume',
                'admin.stats.volume.change': '+22.1%',
                'admin.stats.revenue': 'Monthly Revenue',
                'admin.stats.revenue.change': '+8.7%',
                'admin.activity.title': 'Recent Activities',
                'admin.activity.view.all': 'View All',
                'admin.activity.time': 'Time',
                'admin.activity.event': 'Event',
                'admin.activity.user': 'User',
                'admin.activity.status': 'Status',
                'admin.activity.actions': 'Actions',
                'admin.activity.nft.bought': 'NFT Purchased',
                'admin.activity.rent.distributed': 'Rent Distributed',
                'admin.activity.property.added': 'New Property Added',
                'admin.activity.successful': 'Successful',
                'admin.activity.completed': 'Completed',
                'admin.activity.active': 'Active',
                'admin.activity.detail': 'Detail',

                // Login
                'admin.login.title': 'ARSA Admin',
                'admin.login.subtitle': 'Secure area - Administrator credentials required',
                'admin.login.username': 'Username',
                'admin.login.password': 'Password',
                'admin.login.button': 'Access Admin Panel',
                'admin.login.back': '← Back to website',
                'admin.security.indicator': '🛡️ Secure connection - SSL encrypted',

                // Placeholders
                'placeholder.username': 'Enter your username',
                'placeholder.password': 'Enter your password',
                'placeholder.email': 'Enter your email address',
                'placeholder.search': 'Search...',

                // Page Titles
                'title.index': 'ARSA Token - Real Estate NFT Investment',
                'title.properties': 'Properties - ARSA Token',
                'title.dashboard': 'Dashboard - ARSA Token',
                'title.property.detail': 'Property Detail - ARSA Token',
                'title.admin': 'Admin Panel - ARSA Token',
                'title.login': 'Admin Login - ARSA Token'
            },

            // ARABIC
            ar: {
                // Navigation
                'nav.home': 'الرئيسية',
                'nav.properties': 'العقارات',
                'nav.dashboard': 'لوحة التحكم',
                'nav.about': 'حولنا',
                'nav.connect': 'ربط المحفظة',

                // Hero Section
                'hero.title': 'استثمر في العقارات<br>من خلال الرموز غير القابلة للاستبدال',
                'hero.subtitle': 'إضفاء الطابع الديمقراطي على الاستثمار العقاري من خلال تقنية البلوك تشين. اشترِ رموز NFT مجزأة مدعومة بعقارات حقيقية واكسب دخلاً شهرياً من الإيجار.',
                'hero.start': 'ابدأ الاستثمار',
                'hero.learn': 'اعرف المزيد',

                // Stats
                'stats.tvl': 'إجمالي القيمة المقفلة',
                'stats.investors': 'المستثمرون النشطون',
                'stats.properties': 'العقارات',
                'stats.monthly': 'التوزيعات الشهرية',

                // Features
                'features.title': 'لماذا تختار رمز ARSA؟',
                'features.subtitle': 'اختبر مستقبل الاستثمار العقاري',

                // Properties
                'properties.title': 'العقارات المميزة',
                'properties.subtitle': 'فرص عقارية مميزة',
                'properties.view.all': '🏢 عرض جميع العقارات (24 متاحة)',
                'properties.view.all.subtitle': 'استكشف محفظتنا الكاملة من الاستثمارات العقارية المميزة',

                // Footer
                'footer.follow': 'تابع رمز ARSA',

                // Dashboard
                'dashboard.title': 'محفظتي',
                'dashboard.subtitle': 'تتبع استثماراتك في رموز العقارات وأرباحك',
                'dashboard.wallet.required.title': 'مطلوب ربط المحفظة',
                'dashboard.wallet.required.text': 'يرجى ربط محفظتك لعرض محفظتك وتتبع استثماراتك في رموز العقارات.',
                'dashboard.wallet.connect': '🔗 ربط المحفظة',
                'dashboard.profile.welcome': 'مرحباً، مستثمر!',
                'dashboard.profile.member': 'عضو منذ يناير 2025',
                'dashboard.profile.edit': '✏️ تحرير الملف الشخصي',
                'dashboard.profile.settings': '⚙️ الإعدادات',
                'dashboard.profile.export': '📊 تصدير البيانات',

                // Admin Panel
                'admin.panel.title': 'رمز ARSA - لوحة الإدارة الحديثة',
                'admin.loading': 'جاري فحص التخويل...',
                'admin.brand': 'إدارة ARSA',
                'admin.logout': '🚪 تسجيل الخروج',
                'admin.nav.dashboard': 'لوحة التحكم',
                'admin.nav.properties': 'إدارة العقارات',
                'admin.nav.analytics': 'التحليلات',
                'admin.nav.transactions': 'المعاملات',
                'admin.nav.content': 'إدارة المحتوى',
                'admin.nav.users': 'المستخدمون',
                'admin.nav.settings': 'الإعدادات',
                'admin.dashboard.title': 'لوحة التحكم',
                'admin.dashboard.subtitle': 'نظرة عامة على أداء المنصة',
                'admin.stats.properties': 'إجمالي العقارات',
                'admin.stats.properties.change': '+2 هذا الشهر',
                'admin.stats.users': 'المستخدمون النشطون',
                'admin.stats.users.change': '+15.3%',
                'admin.stats.volume': 'إجمالي الحجم',
                'admin.stats.volume.change': '+22.1%',
                'admin.stats.revenue': 'الإيرادات الشهرية',
                'admin.stats.revenue.change': '+8.7%',
                'admin.activity.title': 'الأنشطة الحديثة',
                'admin.activity.view.all': 'عرض الكل',
                'admin.activity.time': 'الوقت',
                'admin.activity.event': 'الحدث',
                'admin.activity.user': 'المستخدم',
                'admin.activity.status': 'الحالة',
                'admin.activity.actions': 'الإجراءات',
                'admin.activity.nft.bought': 'تم شراء NFT',
                'admin.activity.rent.distributed': 'تم توزيع الإيجار',
                'admin.activity.property.added': 'تم إضافة عقار جديد',
                'admin.activity.successful': 'ناجح',
                'admin.activity.completed': 'مكتمل',
                'admin.activity.active': 'نشط',
                'admin.activity.detail': 'التفاصيل',

                // Login
                'admin.login.title': 'إدارة ARSA',
                'admin.login.subtitle': 'منطقة آمنة - مطلوب بيانات اعتماد المشرف',
                'admin.login.username': 'اسم المستخدم',
                'admin.login.password': 'كلمة المرور',
                'admin.login.button': 'الوصول إلى لوحة الإدارة',
                'admin.login.back': '← العودة إلى الموقع',
                'admin.security.indicator': '🛡️ اتصال آمن - مشفر بـ SSL',

                // Placeholders
                'placeholder.username': 'أدخل اسم المستخدم',
                'placeholder.password': 'أدخل كلمة المرور',
                'placeholder.email': 'أدخل عنوان بريدك الإلكتروني',
                'placeholder.search': 'بحث...',

                // Page Titles
                'title.index': 'رمز ARSA - الاستثمار العقاري بالرموز غير القابلة للاستبدال',
                'title.properties': 'العقارات - رمز ARSA',
                'title.dashboard': 'لوحة التحكم - رمز ARSA',
                'title.property.detail': 'تفاصيل العقار - رمز ARSA',
                'title.admin': 'لوحة الإدارة - رمز ARSA',
                'title.login': 'تسجيل دخول المشرف - رمز ARSA'
            }
        };
    }

    // System initialization
    initializeSystem() {
        this.updateLanguageSelectors();
        this.setupEventListeners();
        this.translatePage(this.currentLanguage);
        this.updatePageDirection();
        this.updatePageTitle();
    }

    // Setup event listeners
    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.bindLanguageSelectors();
        });

        // Bind selectors after delay for dynamic content
        setTimeout(() => {
            this.bindLanguageSelectors();
        }, 100);
    }

    // Bind language selectors
    bindLanguageSelectors() {
        const selectors = document.querySelectorAll('#languageSelect, #loginLanguageSelect');
        
        selectors.forEach(selector => {
            if (selector && !selector.hasAttribute('data-bound')) {
                selector.value = this.currentLanguage;
                selector.setAttribute('data-bound', 'true');
                
                selector.addEventListener('change', (e) => {
                    this.changeLanguage(e.target.value);
                });
            }
        });
    }

    // Change language
    changeLanguage(language) {
        if (this.translations[language]) {
            this.currentLanguage = language;
            localStorage.setItem('selectedLanguage', language);
            this.translatePage(language);
            this.updateLanguageSelectors();
            this.updatePageDirection();
            this.updatePageTitle();
            
            // Dispatch custom event
            window.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language: language }
            }));
            
            console.log(`✅ Language changed to: ${language}`);
        }
    }

    // Translate page with data-i18n attributes
    translatePage(language) {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key, language);
            
            if (translation) {
                // Check if translation contains HTML
                if (translation.includes('<br>') || translation.includes('<')) {
                    element.innerHTML = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update placeholders
        this.updatePlaceholders(language);
    }

    // Get translation
    getTranslation(key, language) {
        const translations = this.translations[language] || this.translations[this.fallbackLanguage];
        return translations[key] || this.translations[this.fallbackLanguage][key] || key;
    }

    // Update placeholders
    updatePlaceholders(language) {
        const placeholderMap = {
            'username': 'placeholder.username',
            'password': 'placeholder.password',
            'email': 'placeholder.email',
            'search': 'placeholder.search'
        };

        Object.entries(placeholderMap).forEach(([inputType, translationKey]) => {
            const inputs = this.getInputsByType(inputType);
            const placeholder = this.getTranslation(translationKey, language);
            
            inputs.forEach(input => {
                input.placeholder = placeholder;
            });
        });
    }

    // Get inputs by type
    getInputsByType(type) {
        const selectors = {
            'username': '#username, input[name="username"], input[type="text"][placeholder*="kullanıcı"], input[type="text"][placeholder*="username"], input[type="text"][placeholder*="اسم المستخدم"]',
            'password': '#password, input[type="password"]',
            'email': 'input[type="email"], input[placeholder*="email"], input[placeholder*="e-posta"], input[placeholder*="بريد"]',
            'search': 'input[placeholder*="arama"], input[placeholder*="search"], input[placeholder*="بحث"], .search-input'
        };

        return document.querySelectorAll(selectors[type] || `input[data-placeholder="${type}"]`);
    }

    // Update page title
    updatePageTitle() {
        const currentPage = this.getCurrentPage();
        const titleKey = `title.${currentPage}`;
        const title = this.getTranslation(titleKey, this.currentLanguage);
        
        if (title && title !== titleKey) {
            document.title = title;
        }
    }

    // Get current page identifier
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        
        const pageMap = {
            'index.html': 'index',
            'properties.html': 'properties',
            'dashboard.html': 'dashboard',
            'property-detail.html': 'property.detail',
            'admin.html': 'admin',
            'login.html': 'login'
        };

        return pageMap[page] || 'index';
    }

    // Update language selectors
    updateLanguageSelectors() {
        const selectors = document.querySelectorAll('#languageSelect, #loginLanguageSelect');
        selectors.forEach(selector => {
            if (selector) {
                selector.value = this.currentLanguage;
            }
        });
    }

    // Update page direction (RTL/LTR)
    updatePageDirection() {
        const html = document.documentElement;
        
        if (this.currentLanguage === 'ar') {
            html.setAttribute('dir', 'rtl');
            html.classList.add('rtl');
            this.addRTLStyles();
        } else {
            html.setAttribute('dir', 'ltr');
            html.classList.remove('rtl');
            this.removeRTLStyles();
        }
    }

    // Add RTL styles
    addRTLStyles() {
        let rtlStyle = document.getElementById('rtl-styles');
        if (!rtlStyle) {
            rtlStyle = document.createElement('style');
            rtlStyle.id = 'rtl-styles';
            document.head.appendChild(rtlStyle);
        }

        rtlStyle.textContent = `
            [dir="rtl"] {
                font-family: 'Cairo', 'Noto Sans Arabic', Arial, sans-serif;
            }
            
            [dir="rtl"] .nav {
                flex-direction: row-reverse;
            }
            
            [dir="rtl"] .nav-actions {
                flex-direction: row-reverse;
            }
            
            [dir="rtl"] .cta-buttons {
                flex-direction: row-reverse;
            }
            
            [dir="rtl"] .stats {
                direction: rtl;
            }
            
            [dir="rtl"] .features-grid {
                direction: rtl;
            }
            
            [dir="rtl"] .properties-grid {
                direction: rtl;
            }
            
            [dir="rtl"] .property-overlay {
                left: auto;
                right: 15px;
            }
            
            [dir="rtl"] .social-links {
                flex-direction: row-reverse;
            }
            
            [dir="rtl"] .admin-main {
                grid-template-columns: 1fr 280px;
            }
            
            [dir="rtl"] .admin-sidebar {
                border-right: none;
                border-left: 1px solid var(--border);
            }
            
            [dir="rtl"] .nav-link {
                border-left: none;
                border-right: 3px solid transparent;
            }
            
            [dir="rtl"] .nav-link:hover,
            [dir="rtl"] .nav-link.active {
                border-right-color: #667eea;
            }
            
            [dir="rtl"] .navbar-actions {
                flex-direction: row-reverse;
            }
            
            [dir="rtl"] .login-box {
                text-align: right;
            }
            
            [dir="rtl"] .input-icon {
                right: auto;
                left: 1rem;
            }
            
            [dir="rtl"] .back-btn {
                flex-direction: row-reverse;
            }
        `;
    }

    // Remove RTL styles
    removeRTLStyles() {
        const rtlStyle = document.getElementById('rtl-styles');
        if (rtlStyle) {
            rtlStyle.remove();
        }
    }

    // Add translation dynamically
    addTranslation(key, translations) {
        Object.keys(translations).forEach(lang => {
            if (this.translations[lang]) {
                this.translations[lang][key] = translations[lang];
            }
        });
    }

    // Get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Format currency based on language
    formatCurrency(amount, currency = 'EUR', language = null) {
        const lang = language || this.currentLanguage;
        
        const locales = {
            tr: 'tr-TR',
            en: 'en-US',
            ar: 'ar-SA'
        };

        try {
            return new Intl.NumberFormat(locales[lang] || 'en-US', {
                style: 'currency',
                currency: currency
            }).format(amount);
        } catch (error) {
            return `${currency} ${amount}`;
        }
    }

    // Format date based on language
    formatDate(date, language = null) {
        const lang = language || this.currentLanguage;
        
        const locales = {
            tr: 'tr-TR',
            en: 'en-US',
            ar: 'ar-SA'
        };

        try {
            return new Date(date).toLocaleDateString(locales[lang] || 'en-US');
        } catch (error) {
            return new Date(date).toLocaleDateString();
        }
    }
}

// 2. Enhanced Notification System with Translation Support
class TranslatedNotificationSystem {
    constructor() {
        this.notifications = {
            tr: {
                'wallet.connecting': '🔄 Cüzdan bağlanıyor...',
                'wallet.connected': '🎉 Cüzdan başarıyla bağlandı! Portföyünüze hoş geldiniz.',
                'wallet.disconnected': '👋 Cüzdan bağlantısı kesildi.',
                'wallet.error': '❌ Cüzdan bağlantısında hata oluştu.',
                'investment.success': '🎉 Yatırım başarıyla tamamlandı!',
                'investment.error': '❌ Yatırım işlemi başarısız oldu.',
                'form.validation.error': 'Lütfen tüm alanları doğru şekilde doldurun.',
                'loading.properties': '🏢 Emlaklar yükleniyor...',
                'loading.dashboard': '📊 Dashboard verileri yükleniyor...',
                'save.success': '✅ Veriler başarıyla kaydedildi!',
                'save.error': '❌ Kaydetme işlemi başarısız oldu.',
                'network.error': '🌐 Ağ bağlantısı hatası. Lütfen tekrar deneyin.',
                'session.expired': '⏰ Oturumunuz sona erdi. Lütfen tekrar giriş yapın.',
                'login.success': '✅ Başarıyla giriş yapıldı!',
                'logout.success': '👋 Başarıyla çıkış yapıldı!'
            },
            en: {
                'wallet.connecting': '🔄 Connecting wallet...',
                'wallet.connected': '🎉 Wallet connected successfully! Welcome to your portfolio.',
                'wallet.disconnected': '👋 Wallet disconnected.',
                'wallet.error': '❌ Error connecting wallet.',
                'investment.success': '🎉 Investment completed successfully!',
                'investment.error': '❌ Investment transaction failed.',
                'form.validation.error': 'Please fill in all fields correctly.',
                'loading.properties': '🏢 Loading properties...',
                'loading.dashboard': '📊 Loading dashboard data...',
                'save.success': '✅ Data saved successfully!',
                'save.error': '❌ Save operation failed.',
                'network.error': '🌐 Network connection error. Please try again.',
                'session.expired': '⏰ Your session has expired. Please log in again.',
                'login.success': '✅ Successfully logged in!',
                'logout.success': '👋 Successfully logged out!'
            },
            ar: {
                'wallet.connecting': '🔄 جاري ربط المحفظة...',
                'wallet.connected': '🎉 تم ربط المحفظة بنجاح! مرحباً بك في محفظتك.',
                'wallet.disconnected': '👋 تم قطع اتصال المحفظة.',
                'wallet.error': '❌ خطأ في ربط المحفظة.',
                'investment.success': '🎉 تم الاستثمار بنجاح!',
                'investment.error': '❌ فشلت عملية الاستثمار.',
                'form.validation.error': 'يرجى ملء جميع الحقول بشكل صحيح.',
                'loading.properties': '🏢 جاري تحميل العقارات...',
                'loading.dashboard': '📊 جاري تحميل بيانات لوحة التحكم...',
                'save.success': '✅ تم حفظ البيانات بنجاح!',
                'save.error': '❌ فشل في حفظ البيانات.',
                'network.error': '🌐 خطأ في الاتصال بالشبكة. يرجى المحاولة مرة أخرى.',
                'session.expired': '⏰ انتهت جلستك. يرجى تسجيل الدخول مرة أخرى.',
                'login.success': '✅ تم تسجيل الدخول بنجاح!',
                'logout.success': '👋 تم تسجيل الخروج بنجاح!'
            }
        };
    }

    show(key, type = 'info', duration = 3500) {
        const language = window.arsaTranslator ? window.arsaTranslator.getCurrentLanguage() : 'tr';
        const message = this.notifications[language][key] || this.notifications['tr'][key] || key;
        
        if (typeof showNotification === 'function') {
            showNotification(message, type, duration);
        } else {
            this.createNotification(message, type, duration);
        }
    }

    createNotification(message, type, duration) {
        // Remove existing notifications
        const existing = document.querySelector('.translated-notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = 'translated-notification';
        
        let bgColor, borderColor;
        switch(type) {
            case 'success':
                bgColor = 'rgba(16, 185, 129, 0.9)';
                borderColor = '#10b981';
                break;
            case 'warning':
                bgColor = 'rgba(245, 158, 11, 0.9)';
                borderColor = '#f59e0b';
                break;
            case 'error':
                bgColor = 'rgba(239, 68, 68, 0.9)';
                borderColor = '#ef4444';
                break;
            default:
                bgColor = 'rgba(102, 126, 234, 0.9)';
                borderColor = '#667eea';
        }
        
        const isRTL = window.arsaTranslator && window.arsaTranslator.getCurrentLanguage() === 'ar';
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            ${isRTL ? 'left' : 'right'}: 20px;
            background: ${bgColor};
            border: 1px solid ${borderColor};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            z-index: 10000;
            font-weight: 600;
            max-width: 350px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: slideIn${isRTL ? 'Left' : 'Right'} 0.4s ease;
            line-height: 1.4;
            direction: ${isRTL ? 'rtl' : 'ltr'};
            text-align: ${isRTL ? 'right' : 'left'};
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Auto remove
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = `slideOut${isRTL ? 'Left' : 'Right'} 0.4s ease`;
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 400);
            }
        }, duration);
    }
}

// 3. Mobile Menu Handler
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Change hamburger icon
            if (navLinks.classList.contains('active')) {
                mobileMenuBtn.textContent = '✕';
            } else {
                mobileMenuBtn.textContent = '☰';
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            }
        });
    }
}

// 4. Wallet Connection Simulation
function simulateWalletConnection() {
    const connectButtons = document.querySelectorAll('.connect-wallet, .connect-wallet-btn, .connect-wallet-dashboard');
    
    connectButtons.forEach(btn => {
        if (!btn.hasAttribute('data-wallet-bound')) {
            btn.setAttribute('data-wallet-bound', 'true');
            
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Don't reconnect if already connected
                if (this.textContent.includes('✅') || this.textContent.includes('Connected') || 
                    this.textContent.includes('Bağlandı') || this.textContent.includes('متصل')) {
                    return;
                }
                
                // Show connecting state
                window.translatedNotifier.show('wallet.connecting', 'info');
                
                const originalText = this.textContent;
                this.disabled = true;
                
                // Simulate connection process
                setTimeout(() => {
                    // Success
                    const language = window.arsaTranslator.getCurrentLanguage();
                    const connectedTexts = {
                        tr: '✅ Bağlandı',
                        en: '✅ Connected',
                        ar: '✅ متصل'
                    };
                    
                    this.textContent = connectedTexts[language] || connectedTexts.tr;
                    this.style.background = 'rgba(16, 185, 129, 0.8)';
                    this.disabled = false;
                    
                    // Store connection state
                    localStorage.setItem('wallet_connected', 'true');
                    
                    // Show success notification
                    window.translatedNotifier.show('wallet.connected', 'success');
                    
                    // Update dashboard if on dashboard page
                    if (window.location.pathname.includes('dashboard')) {
                        const walletRequired = document.getElementById('walletRequired');
                        const dashboardContent = document.getElementById('dashboardContent');
                        
                        if (walletRequired) walletRequired.style.display = 'none';
                        if (dashboardContent) dashboardContent.classList.add('active');
                    }
                    
                }, 2000);
            });
        }
    });
}

// 5. Property Detail Navigation
function openPropertyDetail() {
    window.location.href = 'property-detail.html';
}

// 6. Smooth Scrolling for Internal Links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 7. Form Validation Helper
function validateInput(input, type) {
    const value = input.value.trim();
    
    switch(type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        case 'required':
            return value.length > 0;
        case 'minLength':
            return value.length >= (input.getAttribute('minlength') || 3);
        case 'number':
            return !isNaN(value) && value !== '';
        default:
            return true;
    }
}

// 8. Enhanced Notification System (fallback)
function showNotification(message, type = 'info', duration = 3500) {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'notification';
    
    let bgColor, borderColor, icon;
    switch(type) {
        case 'success':
            bgColor = 'rgba(16, 185, 129, 0.9)';
            borderColor = '#10b981';
            icon = '✅';
            break;
        case 'warning':
            bgColor = 'rgba(245, 158, 11, 0.9)';
            borderColor = '#f59e0b';
            icon = '⚠️';
            break;
        case 'error':
            bgColor = 'rgba(239, 68, 68, 0.9)';
            borderColor = '#ef4444';
            icon = '❌';
            break;
        default:
            bgColor = 'rgba(102, 126, 234, 0.9)';
            borderColor = '#667eea';
            icon = 'ℹ️';
    }
    
    const isRTL = window.arsaTranslator && window.arsaTranslator.getCurrentLanguage() === 'ar';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        ${isRTL ? 'left' : 'right'}: 20px;
        background: ${bgColor};
        border: 1px solid ${borderColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        z-index: 10000;
        font-weight: 600;
        max-width: 350px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: slideIn${isRTL ? 'Left' : 'Right'} 0.4s ease;
        line-height: 1.4;
        direction: ${isRTL ? 'rtl' : 'ltr'};
    `;
    
    notification.innerHTML = `<span style="margin-${isRTL ? 'left' : 'right'}: 8px;">${icon}</span>${message}`;
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = `slideOut${isRTL ? 'Left' : 'Right'} 0.4s ease`;
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 400);
        }
    }, duration);
}

// 9. Safe localStorage wrapper
function safeLocalStorage(action, key, value = null) {
    try {
        switch(action) {
            case 'get':
                return localStorage.getItem(key);
            case 'set':
                localStorage.setItem(key, value);
                return true;
            case 'remove':
                localStorage.removeItem(key);
                return true;
            default:
                return null;
        }
    } catch(error) {
        console.warn('LocalStorage not available:', error);
        return null;
    }
}

// 10. Fade-in Animation Observer
function initializeFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = Math.random() * 0.3 + 's';
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// 11. Add required CSS animations
function addRequiredStyles() {
    const existingStyle = document.getElementById('dynamic-styles');
    if (!existingStyle) {
        const style = document.createElement('style');
        style.id = 'dynamic-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            
            @keyframes slideInLeft {
                from { transform: translateX(-100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutLeft {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(-100%); opacity: 0; }
            }
            
            .fade-in {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s ease;
            }
            
            .fade-in.fade-in-visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Mobile menu styles */
            @media (max-width: 768px) {
                .nav-links {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(15, 15, 35, 0.98);
                    flex-direction: column;
                    gap: 0;
                    padding: 1rem 0;
                    transform: translateY(-100%);
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }
                
                .nav-links.active {
                    transform: translateY(0);
                    opacity: 1;
                    visibility: visible;
                }
                
                .nav-links li {
                    padding: 0.5rem 2rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .mobile-menu-btn {
                    display: block;
                }
            }
            
            /* Language transition effects */
            [data-i18n] {
                transition: opacity 0.2s ease;
            }
            
            /* RTL specific animations */
            [dir="rtl"] .fade-in {
                transform: translateY(30px);
            }
            
            [dir="rtl"] .fade-in.fade-in-visible {
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
}

// 12. Initialize Everything
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing ARSA Token Platform with Enhanced Translation...');
    
    // Add required styles
    addRequiredStyles();
    
    // Initialize translation system
    if (!window.arsaTranslator) {
        window.arsaTranslator = new ARSATranslationSystem();
    }
    
    // Initialize notification system
    if (!window.translatedNotifier) {
        window.translatedNotifier = new TranslatedNotificationSystem();
    }
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Setup wallet connection
    simulateWalletConnection();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Initialize animations
    initializeFadeInAnimations();
    
    // Check if wallet was previously connected
    if (safeLocalStorage('get', 'wallet_connected') === 'true') {
        document.querySelectorAll('.connect-wallet, .connect-wallet-btn, .connect-wallet-dashboard').forEach(btn => {
            const language = window.arsaTranslator.getCurrentLanguage();
            const connectedTexts = {
                tr: '✅ Bağlandı',
                en: '✅ Connected',
                ar: '✅ متصل'
            };
            btn.textContent = connectedTexts[language] || connectedTexts.tr;
            btn.style.background = 'rgba(16, 185, 129, 0.8)';
        });
    }
    
    // Trigger initial translation
    setTimeout(() => {
        const currentLang = window.arsaTranslator.getCurrentLanguage();
        window.arsaTranslator.translatePage(currentLang);
        console.log('✅ Platform initialized with enhanced translation system, language:', currentLang);
    }, 200);
});

// 13. Global Functions for Compatibility
window.translatePage = (language) => {
    if (window.arsaTranslator) {
        window.arsaTranslator.changeLanguage(language);
    }
};

window.getTranslation = (key, language = null) => {
    if (window.arsaTranslator) {
        return window.arsaTranslator.getTranslation(key, language);
    }
    return key;
};

window.getCurrentLanguage = () => {
    if (window.arsaTranslator) {
        return window.arsaTranslator.getCurrentLanguage();
    }
    return 'tr';
};

window.showTranslatedNotification = (key, type = 'info') => {
    if (window.translatedNotifier) {
        window.translatedNotifier.show(key, type);
    }
};

window.formatCurrency = (amount, currency = 'EUR') => {
    if (window.arsaTranslator) {
        return window.arsaTranslator.formatCurrency(amount, currency);
    }
    return `${currency} ${amount}`;
};

window.formatDate = (date) => {
    if (window.arsaTranslator) {
        return window.arsaTranslator.formatDate(date);
    }
    return new Date(date).toLocaleDateString();
};

// Compatibility with existing code
window.currentLanguage = 'tr';
window.addEventListener('languageChanged', (e) => {
    window.currentLanguage = e.detail.language;
});

// 14. Debug helper
window.debugTranslations = () => {
    console.log('🔍 Enhanced Translation Debug Info:');
    console.log('Current Language:', window.arsaTranslator.getCurrentLanguage());
    console.log('Available Languages:', Object.keys(window.arsaTranslator.translations));
    console.log('Page Direction:', document.documentElement.getAttribute('dir'));
    console.log('Translation Elements (data-i18n):', document.querySelectorAll('[data-i18n]').length);
    console.log('Language Selectors:', document.querySelectorAll('#languageSelect, #loginLanguageSelect').length);
    console.log('RTL Class Applied:', document.documentElement.classList.contains('rtl'));
};

// 15. Performance monitoring
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.duration > 100) {
                console.warn(`Slow operation: ${entry.name} took ${entry.duration}ms`);
            }
        }
    });
    observer.observe({ entryTypes: ['measure', 'navigation'] });
}

console.log('✅ ARSA Token Enhanced Translation Script Loaded Successfully!');
            
            