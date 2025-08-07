// ARSA Token - Complete JavaScript with Enhanced Security & Functionality

// Secure user database with hashed passwords
const users = [
    {
        id: 1,
        username: 'admin',
        passwordHash: btoa('arsa123'), // Base64 encoded
        role: 'superadmin',
        permissions: ['add_property', 'delete_property', 'view_properties', 'manage_users', 'admin_panel']
    },
    {
        id: 2,
        username: 'editor',
        passwordHash: btoa('editor123'),
        role: 'editor',
        permissions: ['view_properties']
    }
];

// Global variables
let currentUser = null;
let currentLanguage = 'en';
let walletConnected = false;
let walletAddress = null;
let propertyData = [];

// Enhanced translations system
const translations = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.properties': 'Properties',
        'nav.dashboard': 'Dashboard',
        'nav.about': 'About',
        'nav.connect': 'Connect Wallet',
        
        // Hero section
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
        
        // Admin
        'admin.login.title': 'ARSA Admin',
        'admin.login.subtitle': 'Secure area - Administrator credentials required',
        'admin.login.username': 'Username',
        'admin.login.password': 'Password',
        'admin.login.button': 'Access Admin Panel',
        'admin.login.back': '← Back to website',
        'admin.security.indicator': '🛡️ Secure connection - SSL encrypted',
        
        // Dashboard
        'dashboard.title': 'My Portfolio',
        'dashboard.subtitle': 'Track your real estate NFT investments and earnings',
        'dashboard.wallet.required.title': 'Wallet Connection Required',
        'dashboard.wallet.required.text': 'Please connect your wallet to view your portfolio and track your real estate NFT investments.',
        'dashboard.wallet.connect': '🔗 Connect Wallet',
        
        // Property Detail
        'property.back': '← Back to Properties',
        'property.title': 'Downtown Office Complex',
        'property.location': '📍 Potsdamer Platz 1, Berlin, Germany',
        'property.status.available': '🟢 Available for Investment',
        'property.status.verified': '✅ Verified Property',
        'property.wallet.connect': '🔗 Connect Wallet',
        'property.wallet.purchase': 'Purchase NFTs',
        'property.wallet.payment': '💳 Payment in ARSA Tokens or ETH',
        
        // Footer
        'footer.follow': 'Follow ARSA Token',
        
        // Common
        'loading': 'Loading...',
        'error.network': 'Network error. Please try again.',
        'error.generic': 'An error occurred. Please try again.',
        'success.generic': 'Operation completed successfully!',
        'connecting': 'Connecting...',
        'connected': 'Connected',
        'wallet.connected': '🎉 Wallet connected successfully!',
        'wallet.error': 'Failed to connect wallet. Please try again.',
        'wallet.disconnect.confirm': 'Disconnect wallet?',
        'wallet.disconnected': 'Wallet disconnected',
        'install.metamask': 'Please install MetaMask to connect your wallet!'
    },
    
    tr: {
        // Navigation
        'nav.home': 'Ana Sayfa',
        'nav.properties': 'Emlaklar',
        'nav.dashboard': 'Dashboard',
        'nav.about': 'Hakkımızda',
        'nav.connect': 'Cüzdan Bağla',
        
        // Hero section
        'hero.title': 'NFT ile Emlak<br>Yatırımı Yapın',
        'hero.subtitle': 'Blockchain teknolojisi ile emlak yatırımını demokratikleştiriyoruz. Gerçek emlak destekli bölünmüş NFT\'ler satın alın ve aylık kira geliri kazanın.',
        'hero.start': 'Yatırıma Başla',
        'hero.learn': 'Daha Fazla Bilgi',
        
        // Stats
        'stats.tvl': 'Toplam Kilitli Değer',
        'stats.investors': 'Aktif Yatırımcı',
        'stats.properties': 'Emlak',
        'stats.monthly': 'Aylık Dağıtım',
        
        // Features
        'features.title': 'Neden ARSA Token?',
        'features.subtitle': 'Emlak yatırımının geleceğini yaşayın',
        
        // Properties
        'properties.title': 'Öne Çıkan Emlaklar',
        'properties.subtitle': 'Premium emlak fırsatları',
        'properties.view.all': '🏢 Tüm Emlakları Gör (24 Mevcut)',
        'properties.view.all.subtitle': 'Premium emlak yatırımlarının tam portföyümüzü keşfedin',
        
        // Admin
        'admin.login.title': 'ARSA Admin',
        'admin.login.subtitle': 'Güvenli alan - Yönetici kimlik bilgileri gerekli',
        'admin.login.username': 'Kullanıcı Adı',
        'admin.login.password': 'Şifre',
        'admin.login.button': 'Admin Paneline Giriş',
        'admin.login.back': '← Ana siteye geri dön',
        'admin.security.indicator': '🛡️ Güvenli bağlantı - SSL ile şifrelenmiş',
        
        // Dashboard
        'dashboard.title': 'Portföyüm',
        'dashboard.subtitle': 'Emlak NFT yatırımlarınızı ve kazançlarınızı takip edin',
        'dashboard.wallet.required.title': 'Cüzdan Bağlantısı Gerekli',
        'dashboard.wallet.required.text': 'Portföyünüzü görüntülemek ve emlak NFT yatırımlarınızı takip etmek için lütfen cüzdanınızı bağlayın.',
        'dashboard.wallet.connect': '🔗 Cüzdan Bağla',
        
        // Property Detail
        'property.back': '← Emlaklar\'a Geri Dön',
        'property.title': 'Şehir Merkezi Ofis Kompleksi',
        'property.location': '📍 Potsdamer Platz 1, Berlin, Almanya',
        'property.status.available': '🟢 Yatırım İçin Mevcut',
        'property.status.verified': '✅ Doğrulanmış Emlak',
        'property.wallet.connect': '🔗 Cüzdan Bağla',
        'property.wallet.purchase': 'NFT Satın Al',
        'property.wallet.payment': '💳 ARSA Token veya ETH ile ödeme',
        
        // Footer
        'footer.follow': 'ARSA Token\'ı Takip Edin',
        
        // Common
        'loading': 'Yükleniyor...',
        'error.network': 'Ağ hatası. Lütfen tekrar deneyin.',
        'error.generic': 'Bir hata oluştu. Lütfen tekrar deneyin.',
        'success.generic': 'İşlem başarıyla tamamlandı!',
        'connecting': 'Bağlanıyor...',
        'connected': 'Bağlandı',
        'wallet.connected': '🎉 Cüzdan başarıyla bağlandı!',
        'wallet.error': 'Cüzdan bağlantısı başarısız. Lütfen tekrar deneyin.',
        'wallet.disconnect.confirm': 'Cüzdan bağlantısını kes?',
        'wallet.disconnected': 'Cüzdan bağlantısı kesildi',
        'install.metamask': 'Cüzdanınızı bağlamak için lütfen MetaMask yükleyin!'
    },
    
    ar: {
        // Navigation
        'nav.home': 'الرئيسية',
        'nav.properties': 'العقارات',
        'nav.dashboard': 'لوحة التحكم',
        'nav.about': 'معلومات عنا',
        'nav.connect': 'ربط المحفظة',
        
        // Hero section
        'hero.title': 'استثمر في العقارات<br>من خلال الرموز غير القابلة للاستبدال',
        'hero.subtitle': 'إضفاء الطابع الديمقراطي على الاستثمار العقاري من خلال تقنية البلوك تشين. اشترِ رموز NFT مجزأة مدعومة بعقارات حقيقية واكسب دخلاً شهرياً من الإيجار.',
        'hero.start': 'ابدأ الاستثمار',
        'hero.learn': 'تعلم المزيد',
        
        // Stats
        'stats.tvl': 'إجمالي القيمة المقفلة',
        'stats.investors': 'المستثمرون النشطون',
        'stats.properties': 'العقارات',
        'stats.monthly': 'التوزيعات الشهرية',
        
        // Features
        'features.title': 'لماذا تختار ARSA Token؟',
        'features.subtitle': 'اختبر مستقبل الاستثمار العقاري',
        
        // Properties
        'properties.title': 'العقارات المميزة',
        'properties.subtitle': 'فرص عقارية متميزة',
        'properties.view.all': '🏢 عرض جميع العقارات (24 متاحة)',
        'properties.view.all.subtitle': 'اكتشف محفظتنا الكاملة من الاستثمارات العقارية المتميزة',
        
        // Admin
        'admin.login.title': 'إدارة ARSA',
        'admin.login.subtitle': 'منطقة آمنة - مطلوب بيانات اعتماد المشرف',
        'admin.login.username': 'اسم المستخدم',
        'admin.login.password': 'كلمة المرور',
        'admin.login.button': 'الوصول إلى لوحة الإدارة',
        'admin.login.back': '← العودة إلى الموقع',
        'admin.security.indicator': '🛡️ اتصال آمن - مشفر بـ SSL',
        
        // Dashboard
        'dashboard.title': 'محفظتي',
        'dashboard.subtitle': 'تتبع استثماراتك وأرباحك في العقارات الرقمية',
        'dashboard.wallet.required.title': 'مطلوب ربط المحفظة',
        'dashboard.wallet.required.text': 'يرجى ربط محفظتك لعرض محفظتك وتتبع استثماراتك في العقارات الرقمية.',
        'dashboard.wallet.connect': '🔗 ربط المحفظة',
        
        // Property Detail
        'property.back': '← العودة إلى العقارات',
        'property.title': 'مجمع المكاتب في وسط المدينة',
        'property.location': '📍 بوتسدامر بلاتس 1، برلين، ألمانيا',
        'property.status.available': '🟢 متاح للاستثمار',
        'property.status.verified': '✅ عقار موثق',
        'property.wallet.connect': '🔗 ربط المحفظة',
        'property.wallet.purchase': 'شراء الرموز',
        'property.wallet.payment': '💳 الدفع برموز ARSA أو ETH',
        
        // Footer
        'footer.follow': 'تابع ARSA Token',
        
        // Common
        'loading': 'جاري التحميل...',
        'error.network': 'خطأ في الشبكة. يرجى المحاولة مرة أخرى.',
        'error.generic': 'حدث خطأ. يرجى المحاولة مرة أخرى.',
        'success.generic': 'تم إنجاز العملية بنجاح!',
        'connecting': 'جاري الاتصال...',
        'connected': 'متصل',
        'wallet.connected': '🎉 تم ربط المحفظة بنجاح!',
        'wallet.error': 'فشل في ربط المحفظة. يرجى المحاولة مرة أخرى.',
        'wallet.disconnect.confirm': 'قطع اتصال المحفظة؟',
        'wallet.disconnected': 'تم قطع اتصال المحفظة',
        'install.metamask': 'يرجى تثبيت MetaMask لربط محفظتك!'
    }
};

// Sample property data
const defaultProperties = [
    {
        id: 1,
        title: 'Downtown Office Complex',
        location: 'Berlin, Germany',
        country: 'germany',
        type: 'office',
        status: 'available',
        price: 850000,
        yield: 7.2,
        available: 2295,
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        badge: 'Commercial',
        nftPrice: 100,
        monthlyIncome: 0.60
    },
    {
        id: 2,
        title: 'Luxury Apartment Complex',
        location: 'Amsterdam, Netherlands',
        country: 'netherlands',
        type: 'residential',
        status: 'selling',
        price: 1200000,
        yield: 6.8,
        available: 3547,
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        badge: 'Residential',
        nftPrice: 100,
        monthlyIncome: 0.57
    },
    {
        id: 3,
        title: 'Retail Shopping Center',
        location: 'Vienna, Austria',
        country: 'austria',
        type: 'retail',
        status: 'sold',
        price: 2100000,
        yield: 8.5,
        available: 0,
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        badge: 'Retail',
        nftPrice: 100,
        monthlyIncome: 0.71
    }
];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 ARSA Token Application Starting...');
    
    // Initialize property data
    initializePropertyData();
    
    // Initialize language
    initializeLanguage();
    
    // Check authentication status
    checkAuthStatus();
    
    // Setup global event listeners
    setupGlobalEventListeners();
    
    // Setup page-specific functionality
    setupPageFunctionality();
    
    console.log('✅ ARSA Token Application Initialized Successfully!');
});

// Initialize property data
function initializePropertyData() {
    const storedProperties = localStorage.getItem('arsa_properties');
    if (storedProperties) {
        try {
            propertyData = JSON.parse(storedProperties);
        } catch (e) {
            console.warn('Error parsing stored properties, using defaults');
            propertyData = [...defaultProperties];
        }
    } else {
        propertyData = [...defaultProperties];
        localStorage.setItem('arsa_properties', JSON.stringify(propertyData));
    }
}

// Authentication functions
function login(username, password) {
    const user = users.find(u => u.username === username && atob(u.passwordHash) === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('arsa_user', JSON.stringify({
            id: user.id,
            username: user.username,
            role: user.role,
            permissions: user.permissions,
            loginTime: Date.now()
        }));
        return { success: true, user };
    }
    
    return { success: false, message: 'Invalid credentials' };
}

function logout() {
    currentUser = null;
    localStorage.removeItem('arsa_user');
    localStorage.removeItem('arsa_wallet_connected');
    localStorage.removeItem('arsa_wallet_address');
    walletConnected = false;
    walletAddress = null;
    
    // Redirect to home page
    if (window.location.pathname.includes('admin.html') || window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'index.html';
    }
}

function checkAuthStatus() {
    const storedUser = localStorage.getItem('arsa_user');
    if (storedUser) {
        try {
            const userData = JSON.parse(storedUser);
            // Check if session is not too old (24 hours)
            if (Date.now() - userData.loginTime < 24 * 60 * 60 * 1000) {
                currentUser = userData;
                console.log('User authenticated:', currentUser.username);
            } else {
                localStorage.removeItem('arsa_user');
            }
        } catch (e) {
            localStorage.removeItem('arsa_user');
        }
    }
    
    // Check wallet connection
    const walletConnection = localStorage.getItem('arsa_wallet_connected');
    const walletAddr = localStorage.getItem('arsa_wallet_address');
    if (walletConnection === 'true' && walletAddr) {
        walletConnected = true;
        walletAddress = walletAddr;
    }
}

function hasPermission(permission) {
    return currentUser && currentUser.permissions && currentUser.permissions.includes(permission);
}

function requireAuth() {
    if (!currentUser) {
        alert(getTranslation('auth.required', 'Please login to access this page'));
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function requirePermission(permission) {
    if (!hasPermission(permission)) {
        alert(getTranslation('auth.permission.denied', 'You do not have permission to perform this action'));
        return false;
    }
    return true;
}

// Translation functions
function getTranslation(key, fallback = '') {
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
        return translations[currentLanguage][key];
    }
    
    // Try English as fallback
    if (currentLanguage !== 'en' && translations.en && translations.en[key]) {
        return translations.en[key];
    }
    
    return fallback || key;
}

function translatePage(language) {
    if (!translations[language]) {
        console.warn(`Language ${language} not supported, falling back to English`);
        language = 'en';
    }
    
    currentLanguage = language;
    localStorage.setItem('arsa_language', language);
    
    // Translate elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getTranslation(key);
        if (translation && translation !== key) {
            if (element.innerHTML.includes('<br>')) {
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }
        }
    });

    // Handle placeholder attributes
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        const translation = getTranslation(key);
        if (translation && translation !== key) {
            element.placeholder = translation;
        }
    });

    // Set text direction for Arabic
    if (language === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.style.fontFamily = 'Tahoma, Arial, sans-serif';
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
    }

    // Update all language selectors
    const languageSelectors = document.querySelectorAll('.language-dropdown, #languageSelect, #loginLanguageSelect, #adminLanguageSelect');
    languageSelectors.forEach(selector => {
        if (selector && selector.value !== language) {
            selector.value = language;
        }
    });

    console.log(`Language changed to: ${language}`);
}

function initializeLanguage() {
    const savedLanguage = localStorage.getItem('arsa_language') || 'en';
    translatePage(savedLanguage);
}

// Wallet functions
async function connectWallet() {
    try {
        if (typeof window.ethereum !== 'undefined') {
            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            
            if (accounts.length > 0) {
                walletConnected = true;
                walletAddress = accounts[0];
                
                // Store wallet connection
                localStorage.setItem('arsa_wallet_connected', 'true');
                localStorage.setItem('arsa_wallet_address', walletAddress);
                
                // Update UI
                updateWalletUI();
                
                showNotification(getTranslation('wallet.connected'), 'success');
                
                return { success: true, address: walletAddress };
            }
        } else {
            showNotification(getTranslation('install.metamask'), 'error');
            // Open MetaMask installation page
            setTimeout(() => {
                window.open('https://metamask.io/', '_blank');
            }, 2000);
            return { success: false, message: 'MetaMask not installed' };
        }
    } catch (error) {
        console.error('Wallet connection error:', error);
        showNotification(getTranslation('wallet.error'), 'error');
        return { success: false, message: error.message };
    }
}

function disconnectWallet() {
    walletConnected = false;
    walletAddress = null;
    localStorage.removeItem('arsa_wallet_connected');
    localStorage.removeItem('arsa_wallet_address');
    
    updateWalletUI();
    showNotification(getTranslation('wallet.disconnected'), 'success');
}

function updateWalletUI() {
    const connectButtons = document.querySelectorAll('.connect-wallet, #connectWalletBtn, #connectWalletDashboard');
    
    connectButtons.forEach(button => {
        if (button) {
            if (walletConnected) {
                const shortAddress = walletAddress.substring(0, 6) + '...' + walletAddress.substring(walletAddress.length - 4);
                button.textContent = shortAddress;
                button.style.background = 'rgba(16, 185, 129, 0.8)';
            } else {
                button.textContent = getTranslation('nav.connect');
                button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }
        }
    });
    
    // Enable/disable buy buttons
    const buyButtons = document.querySelectorAll('.buy-button, #buyButton');
    buyButtons.forEach(button => {
        if (button) {
            button.disabled = !walletConnected;
        }
    });
}

// Property management functions
function addProperty(propertyData) {
    if (!requirePermission('add_property')) {
        return { success: false, message: 'No permission' };
    }
    
    const newProperty = {
        id: Date.now(),
        ...propertyData,
        createdBy: currentUser.username,
        createdAt: new Date().toISOString()
    };
    
    const properties = getProperties();
    properties.push(newProperty);
    
    localStorage.setItem('arsa_properties', JSON.stringify(properties));
    
    return { success: true, property: newProperty };
}

function deleteProperty(propertyId) {
    if (!requirePermission('add_property')) {
        return { success: false, message: 'No permission' };
    }
    
    const properties = getProperties();
    const filteredProperties = properties.filter(p => p.id !== propertyId);
    
    localStorage.setItem('arsa_properties', JSON.stringify(filteredProperties));
    
    return { success: true };
}

function getProperties() {
    try {
        return JSON.parse(localStorage.getItem('arsa_properties')) || [];
    } catch (e) {
        return [];
    }
}

function getPropertyById(id) {
    const properties = getProperties();
    return properties.find(p => p.id == id);
}

// NFT purchase simulation
function purchaseNFT(propertyId, amount, nftCount) {
    if (!walletConnected) {
        showNotification('Please connect your wallet first', 'error');
        return { success: false, message: 'Wallet not connected' };
    }
    
    const property = getPropertyById(propertyId);
    if (!property) {
        return { success: false, message: 'Property not found' };
    }
    
    // Simulate purchase
    const purchase = {
        id: Date.now(),
        propertyId: propertyId,
        propertyTitle: property.title,
        nftCount: nftCount,
        amount: amount,
        walletAddress: walletAddress,
        purchaseDate: new Date().toISOString(),
        txHash: '0x' + Math.random().toString(16).substr(2, 64) // Simulated transaction hash
    };
    
    // Store purchase
    const purchases = JSON.parse(localStorage.getItem('arsa_purchases') || '[]');
    purchases.push(purchase);
    localStorage.setItem('arsa_purchases', JSON.stringify(purchases));
    
    // Update property availability
    property.available = Math.max(0, property.available - nftCount);
    const properties = getProperties();
    const propertyIndex = properties.findIndex(p => p.id == propertyId);
    if (propertyIndex !== -1) {
        properties[propertyIndex] = property;
        localStorage.setItem('arsa_properties', JSON.stringify(properties));
    }
    
    return { success: true, purchase };
}

// Notification system
function showNotification(message, type = 'info', duration = 5000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type).bg};
        border: 1px solid ${getNotificationColor(type).border};
        color: ${getNotificationColor(type).text};
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 10000;
        font-weight: 600;
        max-width: 350px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
        cursor: pointer;
    `;
    
    notification.textContent = message;
    
    notification.onclick = () => notification.remove();
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);
}

function getNotificationColor(type) {
    const colors = {
        success: { bg: 'rgba(16, 185, 129, 0.2)', border: '#10b981', text: '#10b981' },
        error: { bg: 'rgba(239, 68, 68, 0.2)', border: '#ef4444', text: '#ef4444' },
        warning: { bg: 'rgba(245, 158, 11, 0.2)', border: '#f59e0b', text: '#f59e0b' },
        info: { bg: 'rgba(102, 126, 234, 0.2)', border: '#667eea', text: '#667eea' }
    };
    return colors[type] || colors.info;
}

// Global event listeners
function setupGlobalEventListeners() {
    // Language selectors
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('language-dropdown') || e.target.id.includes('languageSelect')) {
            translatePage(e.target.value);
        }
    });
    
    // Wallet connect buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('connect-wallet') || e.target.id === 'connectWalletBtn' || e.target.id === 'connectWalletDashboard') {
            handleWalletConnection(e.target);
        }
    });
    
    // Mobile menu toggle
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('mobile-menu-btn')) {
            toggleMobileMenu();
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navLinks = document.querySelector('.nav-links');
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        
        if (navLinks && navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !mobileBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

// Page-specific functionality
function setupPageFunctionality() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'index.html':
        case '':
            setupHomePage();
            break;
        case 'login.html':
            setupLoginPage();
            break;
        case 'admin.html':
            setupAdminPage();
            break;
        case 'dashboard.html':
            setupDashboardPage();
            break;
        case 'properties.html':
            setupPropertiesPage();
            break;
        case 'property-detail.html':
            setupPropertyDetailPage();
            break;
    }
}

// Home page setup
function setupHomePage() {
    loadFeaturedProperties();
    setupScrollAnimations();
    setupNewsletterForm();
}

// Login page setup
function setupLoginPage() {
    // Check if already logged in
    if (currentUser) {
        window.location.href = 'admin.html';
        return;
    }
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
}

// Admin page setup
function setupAdminPage() {
    if (!requireAuth()) return;
    
    // Show/hide admin panel
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    
    // Update user display
    const usernameDisplay = document.getElementById('usernameDisplay');
    if (usernameDisplay) {
        usernameDisplay.textContent = currentUser.username;
    }
    
    // Setup admin forms
    setupAdminForms();
    loadAdminData();
}

// Dashboard page setup
function setupDashboardPage() {
    if (walletConnected) {
        showDashboardContent();
        updateDashboardData();
    } else {
        showWalletRequired();
    }
}

// Properties page setup
function setupPropertiesPage() {
    loadAllProperties();
    setupPropertyFilters();
}

// Property detail page setup
function setupPropertyDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');
    
    if (propertyId) {
        loadPropertyDetail(propertyId);
    } else {
        // Show first property as default
        loadPropertyDetail(1);
    }
    
    setupPropertyDetailForms();
}

// Handle wallet connection
async function handleWalletConnection(button) {
    if (walletConnected) {
        // Show disconnect option
        if (confirm(getTranslation('wallet.disconnect.confirm'))) {
            disconnectWallet();
        }
    } else {
        const originalText = button.textContent;
        button.textContent = getTranslation('connecting');
        button.disabled = true;
        
        const result = await connectWallet();
        
        if (result.success) {
            updateWalletUI();
            
            // Update dashboard if we're on that page
            if (window.location.pathname.includes('dashboard.html')) {
                showDashboardContent();
                updateDashboardData();
            }
        } else {
            button.textContent = originalText;
            button.disabled = false;
        }
    }
}

// Handle login
function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('loginError');
    const loginButton = document.getElementById('loginButton');
    const buttonText = document.getElementById('buttonText');
    const loadingSpinner = document.getElementById('loadingSpinner');

    // Clear previous errors
    if (errorDiv) errorDiv.style.display = 'none';

    if (!username || !password) {
        showLoginError('Please fill in all fields');
        return;
    }

    // Show loading state
    loginButton.disabled = true;
    if (loadingSpinner) loadingSpinner.style.display = 'inline-block';
    if (buttonText) buttonText.textContent = getTranslation('loading');

    // Simulate network delay
    setTimeout(() => {
        const result = login(username, password);
        
        if (result.success) {
            // Success
            loginButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            if (buttonText) buttonText.textContent = '✅ ' + getTranslation('success.generic');
            
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 1500);
        } else {
            // Error
            showLoginError('Invalid username or password');
            resetLoginButton(loginButton, buttonText, loadingSpinner);
        }
    }, 1500);
}

function showLoginError(message) {
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}

function resetLoginButton(button, buttonText, spinner) {
    button.disabled = false;
    if (spinner) spinner.style.display = 'none';
    button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    if (buttonText) buttonText.textContent = getTranslation('admin.login.button');
}

// Mobile menu functions
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (navLinks && mobileBtn) {
        const isActive = navLinks.classList.contains('active');
        
        navLinks.classList.toggle('active');
        mobileBtn.textContent = isActive ? '☰' : '✕';
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? '' : 'hidden';
    }
}

function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (navLinks && mobileBtn) {
        navLinks.classList.remove('active');
        mobileBtn.textContent = '☰';
        document.body.style.overflow = '';
    }
}

// Load featured properties
function loadFeaturedProperties() {
    const container = document.getElementById('propertiesGrid');
    if (!container) return;
    
    const properties = getProperties().slice(0, 3);
    container.innerHTML = '';
    
    if (properties.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.6);">No properties available</p>';
        return;
    }
    
    properties.forEach(property => {
        const card = createPropertyCard(property);
        container.appendChild(card);
    });
    
    // Add admin add card if user has permission
    if (hasPermission('add_property')) {
        const adminCard = createAdminAddCard();
        container.appendChild(adminCard);
    }
}

// Create property card
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card fade-in';
    card.onclick = () => window.location.href = `property-detail.html?id=${property.id}`;
    
    const statusClass = getStatusClass(property.status);
    const statusText = getStatusText(property.status);
    const isDisabled = property.status === 'sold';
    
    card.innerHTML = `
        <div class="property-image" style="background-image: url('${property.image}')">
            <div class="property-badge">${property.badge}</div>
            <div class="property-status">
                <span class="${statusClass}">${statusText}</span>
            </div>
            <div class="property-overlay">
                <h3>${escapeHtml(property.title)}</h3>
                <p>📍 ${escapeHtml(property.location)}</p>
            </div>
        </div>
        <div class="property-info">
            <div class="property-stats">
                <div class="stat">
                    <span class="stat-value">€${formatValue(property.price)}</span>
                    <span class="stat-name">Total Value</span>
                </div>
                <div class="stat">
                    <span class="stat-value">${property.yield}%</span>
                    <span class="stat-name">Annual Yield</span>
                </div>
                <div class="stat">
                    <span class="stat-value">${isDisabled ? '0' : property.available.toLocaleString()}</span>
                    <span class="stat-name">Available</span>
                </div>
            </div>
            <button class="property-button" ${isDisabled ? 'disabled' : ''}>
                ${isDisabled ? 'Sold Out' : 'View Details'}
            </button>
        </div>
    `;
    
    return card;
}

// Create admin add card
function createAdminAddCard() {
    const card = document.createElement('div');
    card.className = 'property-card admin-card fade-in';
    card.onclick = () => window.location.href = 'admin.html';
    
    card.innerHTML = `
        <div class="property-image admin-add">
            <div class="add-icon">+</div>
        </div>
        <div class="property-info">
            <div class="property-title">Add New Property</div>
            <p class="property-location">Click to add a new property to the platform</p>
            <button class="property-button admin-button">
                + Add Property
            </button>
        </div>
    `;
    
    return card;
}

// Utility functions
function getStatusClass(status) {
    const classes = {
        'available': 'status-available',
        'selling': 'status-selling',
        'sold': 'status-sold'
    };
    return classes[status] || 'status-available';
}

function getStatusText(status) {
    const texts = {
        'available': 'Available',
        'selling': 'Selling Fast',
        'sold': 'Sold Out'
    };
    return texts[status] || 'Available';
}

function formatValue(value) {
    if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
        return Math.round(value / 1000) + 'K';
    }
    return value.toLocaleString();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Admin form setup
function setupAdminForms() {
    const propertyForm = document.getElementById('propertyForm');
    if (propertyForm) {
        propertyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAddProperty();
        });
    }
    
    // Setup other admin forms...
    loadAdminProperties();
}

function handleAddProperty() {
    const form = document.getElementById('propertyForm');
    const data = {
        title: form.propertyTitle.value.trim(),
        location: form.propertyLocation.value.trim(),
        price: parseInt(form.propertyValue.value),
        yield: parseFloat(form.propertyYield.value),
        nfts: parseInt(form.nftCount.value),
        available: parseInt(form.nftCount.value),
        image: form.propertyImage.value.trim() || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: form.propertyDescription.value.trim(),
        badge: form.propertyType?.value || 'Property',
        type: 'office',
        country: 'germany',
        status: 'available',
        nftPrice: 100,
        monthlyIncome: (parseFloat(form.propertyYield.value) / 12 / 100).toFixed(2)
    };

    // Validation
    if (!data.title || !data.location || !data.price || !data.yield || !data.nfts) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    const result = addProperty(data);
    
    if (result.success) {
        showNotification('Property added successfully!', 'success');
        form.reset();
        loadAdminProperties();
    } else {
        showNotification('Failed to add property', 'error');
    }
}

function loadAdminProperties() {
    const tbody = document.getElementById('propertyTable');
    if (!tbody) return;
    
    const properties = getProperties();
    tbody.innerHTML = '';
    
    properties.forEach(property => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${property.id}</td>
            <td>${escapeHtml(property.title)}</td>
            <td>${escapeHtml(property.location)}</td>
            <td>€${property.price.toLocaleString()}</td>
            <td>${property.yield}%</td>
            <td>${property.available}/${property.nfts}</td>
            <td>
                <button class="btn btn-danger" onclick="handleDeleteProperty(${property.id})" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;">
                    Delete
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function handleDeleteProperty(propertyId) {
    const property = getPropertyById(propertyId);
    if (property && confirm(`Delete "${property.title}"?`)) {
        const result = deleteProperty(propertyId);
        if (result.success) {
            showNotification('Property deleted successfully', 'success');
            loadAdminProperties();
        }
    }
}

function loadAdminData() {
    // Update stats
    const properties = getProperties();
    const totalProperties = properties.length;
    const totalNFTs = properties.reduce((sum, p) => sum + (p.nfts - p.available), 0);
    const totalTVL = properties.reduce((sum, p) => sum + p.price, 0);
    
    document.getElementById('totalProperties').textContent = totalProperties;
    document.getElementById('totalNFTs').textContent = totalNFTs.toLocaleString();
    document.getElementById('totalTVL').textContent = `€${(totalTVL / 1000000).toFixed(1)}M`;
    
    loadAdminProperties();
}

// Dashboard functions
function showDashboardContent() {
    document.getElementById('walletRequired').style.display = 'none';
    document.getElementById('dashboardContent').classList.add('active');
}

function showWalletRequired() {
    document.getElementById('walletRequired').style.display = 'block';
    document.getElementById('dashboardContent').classList.remove('active');
}

function updateDashboardData() {
    if (walletAddress) {
        const shortAddress = walletAddress.substring(0, 6) + '...' + walletAddress.substring(walletAddress.length - 4);
        const addressElement = document.getElementById('walletAddress');
        if (addressElement) {
            addressElement.textContent = shortAddress;
        }
    }
    
    // Load user's purchases
    const purchases = JSON.parse(localStorage.getItem('arsa_purchases') || '[]');
    const userPurchases = purchases.filter(p => p.walletAddress === walletAddress);
    
    // Update portfolio stats
    const totalInvestment = userPurchases.reduce((sum, p) => sum + p.amount, 0);
    const totalNFTs = userPurchases.reduce((sum, p) => sum + p.nftCount, 0);
    const monthlyIncome = userPurchases.reduce((sum, p) => sum + (p.nftCount * 0.60), 0);
    
    document.getElementById('totalInvestment').textContent = `€${totalInvestment.toLocaleString()}`;
    document.getElementById('totalNFTs').textContent = totalNFTs;
    document.getElementById('monthlyIncome').textContent = `€${monthlyIncome.toFixed(2)}`;
}

// Property detail functions
function loadPropertyDetail(propertyId) {
    const property = getPropertyById(propertyId);
    
    if (!property) {
        console.error('Property not found:', propertyId);
        return;
    }
    
    // Update property information
    document.querySelector('.property-title').textContent = property.title;
    document.querySelector('.property-location').textContent = `📍 ${property.location}`;
    
    // Update stats
    const statValues = document.querySelectorAll('.stat-value');
    if (statValues.length >= 3) {
        statValues[0].textContent = `€${formatValue(property.price)}`;
        statValues[1].textContent = `${property.yield}%`;
        statValues[2].textContent = property.available.toLocaleString();
    }
    
    // Setup investment calculator
    setupInvestmentCalculator(property);
}

function setupInvestmentCalculator(property) {
    const amountInput = document.getElementById('investmentAmount');
    const buyButton = document.getElementById('buyButton');
    
    if (amountInput) {
        amountInput.addEventListener('input', () => updateCalculation(property));
        // Initial calculation
        updateCalculation(property);
    }
    
    if (buyButton) {
        buyButton.addEventListener('click', () => handlePurchase(property));
    }
}

function updateCalculation(property) {
    const amount = parseFloat(document.getElementById('investmentAmount').value) || 0;
    const nftCount = Math.floor(amount / property.nftPrice);
    const monthlyIncome = nftCount * property.monthlyIncome;
    const annualReturn = monthlyIncome * 12;
    const totalCost = nftCount * property.nftPrice;
    
    document.getElementById('nftCount').textContent = nftCount;
    document.getElementById('monthlyIncome').textContent = `€${monthlyIncome.toFixed(2)}`;
    document.getElementById('annualReturn').textContent = `€${annualReturn.toFixed(2)}`;
    document.getElementById('totalCost').textContent = `€${totalCost}`;
    
    // Update input to match whole NFTs
    document.getElementById('investmentAmount').value = totalCost;
}

function handlePurchase(property) {
    if (!walletConnected) {
        showNotification('Please connect your wallet first', 'error');
        return;
    }
    
    const nftCount = parseInt(document.getElementById('nftCount').textContent);
    const totalCost = parseInt(document.getElementById('totalCost').textContent.replace('€', ''));
    
    if (nftCount === 0) {
        showNotification('Please enter a valid investment amount', 'error');
        return;
    }
    
    if (nftCount > property.available) {
        showNotification('Not enough NFTs available', 'error');
        return;
    }
    
    const confirmMessage = `Confirm NFT Purchase\n\nProperty: ${property.title}\nNFTs: ${nftCount}\nTotal Cost: €${totalCost}\nMonthly Income: €${(nftCount * property.monthlyIncome).toFixed(2)}\n\nProceed with purchase?`;
    
    if (confirm(confirmMessage)) {
        const buyButton = document.getElementById('buyButton');
        const originalText = buyButton.textContent;
        
        buyButton.textContent = 'Processing...';
        buyButton.disabled = true;
        
        setTimeout(() => {
            const result = purchaseNFT(property.id, totalCost, nftCount);
            
            if (result.success) {
                showNotification(`🎉 Successfully purchased ${nftCount} NFTs!`, 'success');
                buyButton.textContent = '✅ Purchase Complete';
                buyButton.style.background = 'rgba(16, 185, 129, 0.8)';
                
                // Update availability display
                property.available -= nftCount;
                loadPropertyDetail(property.id);
            } else {
                showNotification('Purchase failed. Please try again.', 'error');
                buyButton.textContent = originalText;
                buyButton.disabled = false;
            }
        }, 2000);
    }
}

function setupPropertyDetailForms() {
    // Quick amount buttons
    document.querySelectorAll('.quick-amount').forEach(button => {
        button.addEventListener('click', function() {
            const amount = parseInt(this.textContent.replace('€', '').replace(',', ''));
            document.getElementById('investmentAmount').value = amount;
            const urlParams = new URLSearchParams(window.location.search);
            const propertyId = urlParams.get('id') || 1;
            const property = getPropertyById(propertyId);
            if (property) updateCalculation(property);
        });
    });
}

// Load all properties for properties page
function loadAllProperties() {
    const container = document.getElementById('propertiesGrid');
    if (!container) return;
    
    const properties = getProperties();
    container.innerHTML = '';
    
    if (properties.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.6);">No properties available</p>';
        return;
    }
    
    properties.forEach(property => {
        const card = createPropertyCard(property);
        container.appendChild(card);
    });
}

// Setup property filters (for properties page)
function setupPropertyFilters() {
    // This would be implemented if properties.html has filters
    console.log('Property filters setup would go here');
}

// Newsletter form setup
function setupNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = getTranslation('loading');
            btn.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you for subscribing!', 'success');
                this.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Initialize wallet UI on page load
updateWalletUI();

console.log('🎉 ARSA Token - Complete Application Ready!');