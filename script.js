// ARSA Token - Complete JavaScript with Fixed Translation System
// Bu dosya script.js dosyasının tam halidir

// 1. Gelişmiş Translation System
class ARSATranslationSystem {
    constructor() {
        this.currentLanguage = localStorage.getItem('selectedLanguage') || 'tr';
        this.translations = {};
        this.isLoading = false;
        this.fallbackLanguage = 'tr';
        this.loadTranslations();
        this.initializeSystem();
    }

    // Ana çeviri veritabanı
    loadTranslations() {
        this.translations = {
            // TÜRKÇE (Varsayılan)
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
                'dashboard.summary.total.investment': 'Toplam Yatırım',
                'dashboard.summary.total.change': '+Bu ay %12.5',
                'dashboard.summary.total.nfts': 'Sahip Olunan Toplam NFT',
                'dashboard.summary.nfts.change': '+Bu ay 5 NFT',
                'dashboard.summary.monthly.income': 'Aylık Gelir',
                'dashboard.summary.income.change': '+Geçen aydan €3.20',
                'dashboard.nft.portfolio.title': 'NFT Portföyüm',
                'dashboard.nft.berlin.office': 'Berlin Ofis Kompleksi',
                'dashboard.nft.amsterdam.apartment': 'Amsterdam Apartmanları',
                'dashboard.nft.hamburg.warehouse': 'Hamburg Depo',
                'dashboard.nft.investment': 'Yatırım',
                'dashboard.nft.monthly': 'Aylık',
                'dashboard.nft.view': 'Detayları Görüntüle',
                'dashboard.nft.sell': 'NFT\'leri Sat',
                'dashboard.income.history.title': 'Son Gelir Geçmişi',
                'dashboard.income.date': 'Tarih',
                'dashboard.income.property': 'Emlak',
                'dashboard.income.amount': 'Tutar',
                'dashboard.income.nfts': 'NFT\'ler',
                'dashboard.income.status': 'Durum',
                'dashboard.income.berlin.office': 'Berlin Ofis',
                'dashboard.income.amsterdam.apartment': 'Amsterdam Apartmanları',
                'dashboard.income.hamburg.warehouse': 'Hamburg Depo',
                'dashboard.income.all.properties': 'Tüm Emlaklar',
                'dashboard.income.received': 'Alındı',
                'dashboard.income.pending': 'Bekliyor',
                'dashboard.performance.title': 'Portföy Performansı',
                'dashboard.performance.placeholder': 'Portföy performans grafiği',
                'dashboard.performance.growth': '+Bu ay %12.5 büyüme',
                'dashboard.actions.browse': 'Emlakları İncele',
                'dashboard.actions.browse.desc': 'Yeni yatırım fırsatlarını keşfedin',
                'dashboard.actions.withdraw': 'Kazançları Çek',
                'dashboard.actions.withdraw.desc': 'Geliri cüzdanınıza transfer edin',
                'dashboard.actions.stake': 'ARSA Token Stake Et',
                'dashboard.actions.stake.desc': 'Ek ödüller kazanın',
                'dashboard.actions.referral': 'Arkadaş Davet Et',
                'dashboard.actions.referral.desc': 'Bonus ödülleri kazanın',

                // Admin Panel
                'admin.login.title': 'ARSA Admin',
                'admin.login.subtitle': 'Güvenli alan - Yönetici kimlik bilgileri gerekli',
                'admin.login.username': 'Kullanıcı Adı',
                'admin.login.password': 'Şifre',
                'admin.login.button': 'Admin Paneline Giriş',
                'admin.login.back': '← Ana siteye geri dön',
                'admin.security.indicator': '🛡️ Güvenli bağlantı - SSL ile şifrelenmiş'
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
                'dashboard.summary.total.investment': 'Total Investment',
                'dashboard.summary.total.change': '+12.5% this month',
                'dashboard.summary.total.nfts': 'Total NFTs Owned',
                'dashboard.summary.nfts.change': '+5 NFTs this month',
                'dashboard.summary.monthly.income': 'Monthly Income',
                'dashboard.summary.income.change': '+€3.20 from last month',
                'dashboard.nft.portfolio.title': 'My NFT Portfolio',
                'dashboard.nft.berlin.office': 'Berlin Office Complex',
                'dashboard.nft.amsterdam.apartment': 'Amsterdam Apartments',
                'dashboard.nft.hamburg.warehouse': 'Hamburg Warehouse',
                'dashboard.nft.investment': 'Investment',
                'dashboard.nft.monthly': 'Monthly',
                'dashboard.nft.view': 'View Details',
                'dashboard.nft.sell': 'Sell NFTs',
                'dashboard.income.history.title': 'Recent Income History',
                'dashboard.income.date': 'Date',
                'dashboard.income.property': 'Property',
                'dashboard.income.amount': 'Amount',
                'dashboard.income.nfts': 'NFTs',
                'dashboard.income.status': 'Status',
                'dashboard.income.berlin.office': 'Berlin Office',
                'dashboard.income.amsterdam.apartment': 'Amsterdam Apartments',
                'dashboard.income.hamburg.warehouse': 'Hamburg Warehouse',
                'dashboard.income.all.properties': 'All Properties',
                'dashboard.income.received': 'Received',
                'dashboard.income.pending': 'Pending',
                'dashboard.performance.title': 'Portfolio Performance',
                'dashboard.performance.placeholder': 'Portfolio performance chart',
                'dashboard.performance.growth': '+12.5% growth this month',
                'dashboard.actions.browse': 'Browse Properties',
                'dashboard.actions.browse.desc': 'Discover new investment opportunities',
                'dashboard.actions.withdraw': 'Withdraw Earnings',
                'dashboard.actions.withdraw.desc': 'Transfer income to your wallet',
                'dashboard.actions.stake': 'Stake ARSA Tokens',
                'dashboard.actions.stake.desc': 'Earn additional rewards',
                'dashboard.actions.referral': 'Refer Friends',
                'dashboard.actions.referral.desc': 'Earn bonus rewards',

                // Admin Panel
                'admin.login.title': 'ARSA Admin',
                'admin.login.subtitle': 'Secure area - Administrator credentials required',
                'admin.login.username': 'Username',
                'admin.login.password': 'Password',
                'admin.login.button': 'Access Admin Panel',
                'admin.login.back': '← Back to website',
                'admin.security.indicator': '🛡️ Secure connection - SSL encrypted'
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
                'dashboard.summary.total.investment': 'إجمالي الاستثمار',
                'dashboard.summary.total.change': '+12.5% هذا الشهر',
                'dashboard.summary.total.nfts': 'إجمالي الرموز المملوكة',
                'dashboard.summary.nfts.change': '+5 رموز هذا الشهر',
                'dashboard.summary.monthly.income': 'الدخل الشهري',
                'dashboard.summary.income.change': '+€3.20 من الشهر الماضي',
                'dashboard.nft.portfolio.title': 'محفظة الرموز الخاصة بي',
                'dashboard.nft.berlin.office': 'مجمع مكاتب برلين',
                'dashboard.nft.amsterdam.apartment': 'شقق أمستردام',
                'dashboard.nft.hamburg.warehouse': 'مستودع هامبورغ',
                'dashboard.nft.investment': 'الاستثمار',
                'dashboard.nft.monthly': 'شهري',
                'dashboard.nft.view': 'عرض التفاصيل',
                'dashboard.nft.sell': 'بيع الرموز',
                'dashboard.income.history.title': 'تاريخ الدخل الحديث',
                'dashboard.income.date': 'التاريخ',
                'dashboard.income.property': 'العقار',
                'dashboard.income.amount': 'المبلغ',
                'dashboard.income.nfts': 'الرموز',
                'dashboard.income.status': 'الحالة',
                'dashboard.income.berlin.office': 'مكتب برلين',
                'dashboard.income.amsterdam.apartment': 'شقق أمستردام',
                'dashboard.income.hamburg.warehouse': 'مستودع هامبورغ',
                'dashboard.income.all.properties': 'جميع العقارات',
                'dashboard.income.received': 'تم الاستلام',
                'dashboard.income.pending': 'في الانتظار',
                'dashboard.performance.title': 'أداء المحفظة',
                'dashboard.performance.placeholder': 'مخطط أداء المحفظة',
                'dashboard.performance.growth': '+12.5% نمو هذا الشهر',
                'dashboard.actions.browse': 'تصفح العقارات',
                'dashboard.actions.browse.desc': 'اكتشف فرص استثمارية جديدة',
                'dashboard.actions.withdraw': 'سحب الأرباح',
                'dashboard.actions.withdraw.desc': 'انقل الدخل إلى محفظتك',
                'dashboard.actions.stake': 'رهان رموز ARSA',
                'dashboard.actions.stake.desc': 'احصل على مكافآت إضافية',
                'dashboard.actions.referral': 'ادع الأصدقاء',
                'dashboard.actions.referral.desc': 'احصل على مكافآت إضافية',

                // Admin Panel
                'admin.login.title': 'إدارة ARSA',
                'admin.login.subtitle': 'منطقة آمنة - مطلوب بيانات اعتماد المشرف',
                'admin.login.username': 'اسم المستخدم',
                'admin.login.password': 'كلمة المرور',
                'admin.login.button': 'الوصول إلى لوحة الإدارة',
                'admin.login.back': '← العودة إلى الموقع',
                'admin.security.indicator': '🛡️ اتصال آمن - مشفر بـ SSL'
            }
        };
    }

    // Sistem başlatma
    initializeSystem() {
        this.updateLanguageSelectors();
        this.setupEventListeners();
        this.translatePage(this.currentLanguage);
        this.updatePageDirection();
    }

    // Event listener'ları ayarla
    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.bindLanguageSelectors();
        });

        // Sayfa yüklendikten sonra da bağla
        setTimeout(() => {
            this.bindLanguageSelectors();
        }, 100);
    }

    // Dil seçicilerini bağla
    bindLanguageSelectors() {
        const selectors = document.querySelectorAll('#languageSelect, #loginLanguageSelect');
        
        selectors.forEach(selector => {
            if (selector && !selector.hasAttribute('data-bound')) {
                selector.value = this.currentLanguage;
                selector.setAttribute('data-bound', 'true');
                
                // Event listener ekle
                selector.addEventListener('change', (e) => {
                    this.changeLanguage(e.target.value);
                });
            }
        });
    }

    // Dil değiştir
    changeLanguage(language) {
        if (this.translations[language]) {
            this.currentLanguage = language;
            localStorage.setItem('selectedLanguage', language);
            this.translatePage(language);
            this.updateLanguageSelectors();
            this.updatePageDirection();
            
            // Custom event dispatch
            window.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language: language }
            }));
            
            console.log(`✅ Dil değiştirildi: ${language}`);
        }
    }

    // Sayfayı çevir
    translatePage(language) {
        const elements = document.querySelectorAll('[data-translate]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key, language);
            
            if (translation) {
                // HTML içerik mi yoksa text mi kontrol et
                if (translation.includes('<br>') || translation.includes('<')) {
                    element.innerHTML = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Placeholder'ları da güncelle
        this.updatePlaceholders(language);
        
        // Page title'ı güncelle
        this.updatePageTitle(language);
    }

    // Çeviri al
    getTranslation(key, language) {
        const translations = this.translations[language] || this.translations[this.fallbackLanguage];
        return translations[key] || this.translations[this.fallbackLanguage][key] || key;
    }

    // Placeholder'ları güncelle
    updatePlaceholders(language) {
        const placeholders = {
            tr: {
                'username': 'Kullanıcı adınızı girin',
                'password': 'Şifrenizi girin',
                'email': 'E-posta adresinizi girin',
                'search': 'Arama yapın...'
            },
            en: {
                'username': 'Enter your username',
                'password': 'Enter your password',
                'email': 'Enter your email address',
                'search': 'Search...'
            },
            ar: {
                'username': 'أدخل اسم المستخدم',
                'password': 'أدخل كلمة المرور',
                'email': 'أدخل عنوان بريدك الإلكتروني',
                'search': 'بحث...'
            }
        };

        const langPlaceholders = placeholders[language] || placeholders[this.fallbackLanguage];
        
        // Update specific placeholders
        const usernameInputs = document.querySelectorAll('#username, input[placeholder*="kullanıcı"], input[placeholder*="username"], input[placeholder*="اسم المستخدم"]');
        usernameInputs.forEach(input => {
            input.placeholder = langPlaceholders.username;
        });

        const passwordInputs = document.querySelectorAll('#password, input[type="password"]');
        passwordInputs.forEach(input => {
            input.placeholder = langPlaceholders.password;
        });

        const emailInputs = document.querySelectorAll('input[type="email"], input[placeholder*="email"], input[placeholder*="e-posta"]');
        emailInputs.forEach(input => {
            input.placeholder = langPlaceholders.email;
        });

        const searchInputs = document.querySelectorAll('input[placeholder*="arama"], input[placeholder*="search"], input[placeholder*="بحث"]');
        searchInputs.forEach(input => {
            input.placeholder = langPlaceholders.search;
        });
    }

    // Sayfa başlığını güncelle
    updatePageTitle(language) {
        const titles = {
            tr: {
                'index.html': 'ARSA Token - NFT ile Gayrimenkul Yatırımı',
                'properties.html': 'Emlaklar - ARSA Token',
                'dashboard.html': 'Dashboard - ARSA Token',
                'property-detail.html': 'Emlak Detayı - ARSA Token',
                'admin.html': 'Admin Panel - ARSA Token',
                'login.html': 'Admin Giriş - ARSA Token'
            },
            en: {
                'index.html': 'ARSA Token - Real Estate NFT Investment',
                'properties.html': 'Properties - ARSA Token',
                'dashboard.html': 'Dashboard - ARSA Token',
                'property-detail.html': 'Property Detail - ARSA Token',
                'admin.html': 'Admin Panel - ARSA Token',
                'login.html': 'Admin Login - ARSA Token'
            },
            ar: {
                'index.html': 'رمز ARSA - الاستثمار العقاري بالرموز غير القابلة للاستبدال',
                'properties.html': 'العقارات - رمز ARSA',
                'dashboard.html': 'لوحة التحكم - رمز ARSA',
                'property-detail.html': 'تفاصيل العقار - رمز ARSA',
                'admin.html': 'لوحة الإدارة - رمز ARSA',
                'login.html': 'تسجيل دخول المشرف - رمز ARSA'
            }
        };

        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const pageTitle = titles[language] && titles[language][currentPage];
        
        if (pageTitle) {
            document.title = pageTitle;
        }
    }

    // Dil seçicilerini güncelle
    updateLanguageSelectors() {
        const selectors = document.querySelectorAll('#languageSelect, #loginLanguageSelect');
        selectors.forEach(selector => {
            if (selector) {
                selector.value = this.currentLanguage;
            }
        });
    }

    // Sayfa yönünü güncelle (Arapça için RTL)
    updatePageDirection() {
        if (this.currentLanguage === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
            document.body.style.textAlign = 'right';
            
            // RTL için özel CSS ekle
            this.addRTLStyles();
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            document.body.style.textAlign = 'left';
            
            // RTL stillerini kaldır
            this.removeRTLStyles();
        }
    }

    // RTL stilleri ekle
    addRTLStyles() {
        let rtlStyle = document.getElementById('rtl-styles');
        if (!rtlStyle) {
            rtlStyle = document.createElement('style');
            rtlStyle.id = 'rtl-styles';
            document.head.appendChild(rtlStyle);
        }

        rtlStyle.textContent = `
            [dir="rtl"] .nav {
                flex-direction: row-reverse;
            }
            [dir="rtl"] .nav-actions {
                flex-direction: row-reverse;
            }
            [dir="rtl"] .cta-buttons {
                flex-direction: row-reverse;
            }
            [dir="rtl"] .property-info {
                text-align: right;
            }
            [dir="rtl"] .feature-card {
                text-align: right;
            }
            [dir="rtl"] .property-overlay {
                left: auto;
                right: 15px;
            }
            [dir="rtl"] .property-badge {
                margin-left: 0;
                margin-right: auto;
            }
        `;
    }

    // RTL stillerini kaldır
    removeRTLStyles() {
        const rtlStyle = document.getElementById('rtl-styles');
        if (rtlStyle) {
            rtlStyle.remove();
        }
    }

    // Yeni çeviri ekle (dynamic content için)
    addTranslation(key, translations) {
        Object.keys(translations).forEach(lang => {
            if (this.translations[lang]) {
                this.translations[lang][key] = translations[lang];
            }
        });
    }

    // Mevcut dili al
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Para birimi formatla
    formatCurrency(amount, currency = 'EUR', language = null) {
        const lang = language || this.currentLanguage;
        
        const locales = {
            tr: 'tr-TR',
            en: 'en-US',
            ar: 'ar-SA'
        };

        return new Intl.NumberFormat(locales[lang] || 'en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    // Tarih formatla
    formatDate(date, language = null) {
        const lang = language || this.currentLanguage;
        
        const locales = {
            tr: 'tr-TR',
            en: 'en-US',
            ar: 'ar-SA'
        };

        return new Date(date).toLocaleDateString(locales[lang] || 'en-US');
    }
}

// 2. Notification System with Translation Support
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
                'session.expired': '⏰ Oturumunuz sona erdi. Lütfen tekrar giriş yapın.'
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
                'session.expired': '⏰ Your session has expired. Please log in again.'
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
                'session.expired': '⏰ انتهت جلستك. يرجى تسجيل الدخول مرة أخرى.'
            }
        };
    }

    show(key, type = 'info', duration = 3500) {
        const language = window.arsaTranslator.getCurrentLanguage();
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
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${bgColor};
            border: 1px solid ${borderColor};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            z-index: 10000;
            font-weight: 600;
            max-width: 350px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: slideInRight 0.4s ease;
            line-height: 1.4;
            direction: ${window.arsaTranslator.getCurrentLanguage() === 'ar' ? 'rtl' : 'ltr'};
            text-align: ${window.arsaTranslator.getCurrentLanguage() === 'ar' ? 'right' : 'left'};
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Auto remove
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOutRight 0.4s ease';
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
                if (this.textContent.includes('✅') || this.textContent.includes('Connected') || this.textContent.includes('Bağlandı')) {
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

// 8. Notification System (fallback if not using translated version)
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
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        border: 1px solid ${borderColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        z-index: 10000;
        font-weight: 600;
        max-width: 350px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: slideInRight 0.4s ease;
        line-height: 1.4;
    `;
    
    notification.innerHTML = `<span style="margin-right: 8px;">${icon}</span>${message}`;
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOutRight 0.4s ease';
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
            
            /* RTL Support */
            [dir="rtl"] {
                text-align: right;
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
            
            /* Language transition effects */
            [data-translate] {
                transition: opacity 0.2s ease;
            }
        `;
        document.head.appendChild(style);
    }
}

// 12. Initialize Everything
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing ARSA Token Platform...');
    
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
        console.log('✅ Platform initialized with language:', currentLang);
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
    console.log('🔍 Translation Debug Info:');
    console.log('Current Language:', window.arsaTranslator.getCurrentLanguage());
    console.log('Available Languages:', Object.keys(window.arsaTranslator.translations));
    console.log('Page Direction:', document.documentElement.getAttribute('dir'));
    console.log('Translation Elements:', document.querySelectorAll('[data-translate]').length);
    console.log('Language Selectors:', document.querySelectorAll('#languageSelect, #loginLanguageSelect').length);
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

console.log('✅ ARSA Token Complete Script Loaded Successfully!');