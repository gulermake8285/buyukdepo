// ARSA Token - Enhanced JavaScript - Security & Performance Optimized
// Version 2.0 - Updated with security improvements and new features

// Complete translation system with error handling
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
        
        // Properties Page
        'properties.page.title': 'Investment Properties',
        'properties.page.subtitle': 'Discover premium real estate opportunities across Europe',
        'properties.page.stats.total.label': 'Total Properties',
        'properties.page.stats.available.label': 'Available Now',
        'properties.page.stats.value.label': 'Total Portfolio Value',
        'properties.page.stats.yield.label': 'Average Yield',
        
        // Search and Filters
        'properties.search.placeholder': 'Search by city, property name, or type...',
        'properties.filter.location': 'Location',
        'properties.filter.all.locations': 'All Locations',
        'properties.filter.type': 'Property Type',
        'properties.filter.all.types': 'All Types',
        'properties.filter.office': 'Office',
        'properties.filter.residential': 'Residential',
        'properties.filter.retail': 'Retail',
        'properties.filter.warehouse': 'Warehouse',
        'properties.filter.hotel': 'Hotel',
        'properties.filter.status': 'Status',
        'properties.filter.all.status': 'All Status',
        'properties.filter.available': 'Available',
        'properties.filter.selling': 'Selling Fast',
        'properties.filter.sold': 'Sold Out',
        'properties.filter.clear': 'Clear All',
        
        // Results and Sorting
        'properties.results.showing': 'Showing',
        'properties.results.properties': 'properties',
        'properties.sort.newest': 'Newest First',
        'properties.sort.price.low': 'Price: Low to High',
        'properties.sort.price.high': 'Price: High to Low',
        'properties.sort.yield.high': 'Highest Yield',
        'properties.sort.yield.low': 'Lowest Yield',
        'properties.sort.name': 'Name A-Z',
        
        // Pagination
        'properties.pagination.previous': 'Previous',
        'properties.pagination.next': 'Next',
        
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
        'property.wallet.connect': '🔗 Cüzdan Bağla',
        'property.wallet.purchase': 'NFT Satın Al',
        'property.wallet.payment': '💳 ARSA Token veya ETH ile ödeme',
        
        // Footer
        'footer.follow': 'ARSA Token\'ı Takip Edin',
        
        // Common
        'loading': 'Yükleniyor...',
        'error.network': 'Ağ hatası. Lütfen tekrar deneyin.',
        'error.generic': 'Bir hata oluştu. Lütfen tekrar deneyin.',
        'success.generic': 'İşlem başarıyla tamamlandı!'
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
        
        // Properties
        'properties.title': 'العقارات المميزة',
        'properties.subtitle': 'فرص عقارية متميزة',
        'properties.view.all': '🏢 عرض جميع العقارات (24 متاحة)',
        'properties.view.all.subtitle': 'اكتشف محفظتنا الكاملة من الاستثمارات العقارية المتميزة'
    }
};

// Global variables
let currentLanguage = 'en';
let walletConnected = false;

// Security: Rate limiting for API calls
const rateLimiter = new Map();

// Enhanced local storage with error handling
function safeLocalStorage(action, key, value = null) {
    try {
        if (typeof Storage !== 'undefined') {
            switch(action) {
                case 'get':
                    return localStorage.getItem(key);
                case 'set':
                    localStorage.setItem(key, value);
                    return true;
                case 'remove':
                    localStorage.removeItem(key);
                    return true;
                case 'clear':
                    localStorage.clear();
                    return true;
                default:
                    return null;
            }
        }
    } catch (error) {
        console.warn('Currency formatting error:', error);
        return `${currency} ${amount}`;
    }
}

function formatDate(date, locale = null) {
    try {
        const userLocale = locale || (currentLanguage === 'ar' ? 'ar-SA' : currentLanguage === 'tr' ? 'tr-TR' : 'en-US');
        return new Intl.DateTimeFormat(userLocale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(new Date(date));
    } catch (error) {
        console.warn('Date formatting error:', error);
        return new Date(date).toLocaleDateString();
    }
}

function formatNumber(number, locale = null) {
    try {
        const userLocale = locale || (currentLanguage === 'ar' ? 'ar-SA' : currentLanguage === 'tr' ? 'tr-TR' : 'en-US');
        return new Intl.NumberFormat(userLocale).format(number);
    } catch (error) {
        console.warn('Number formatting error:', error);
        return number.toString();
    }
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Core Web Vitals tracking
    if ('PerformanceObserver' in window) {
        try {
            // Largest Contentful Paint
            new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        trackEvent('performance', 'lcp', 'timing', Math.round(entry.startTime));
                    }
                });
            }).observe({ entryTypes: ['largest-contentful-paint'] });

            // First Input Delay
            new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'first-input') {
                        trackEvent('performance', 'fid', 'timing', Math.round(entry.processingStart - entry.startTime));
                    }
                });
            }).observe({ entryTypes: ['first-input'] });

            // Cumulative Layout Shift
            new PerformanceObserver((list) => {
                let clsScore = 0;
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
                        clsScore += entry.value;
                    }
                });
                if (clsScore > 0) {
                    trackEvent('performance', 'cls', 'score', Math.round(clsScore * 1000));
                }
            }).observe({ entryTypes: ['layout-shift'] });

        } catch (error) {
            console.warn('Performance monitoring setup failed:', error);
        }
    }

    // Page load performance
    window.addEventListener('load', function() {
        if (performance.timing) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            if (loadTime > 0) {
                trackEvent('performance', 'page_load', 'timing', Math.round(loadTime));
            }
        }
    });
}

// Progressive Web App features
function initializePWA() {
    // Service Worker registration
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
                trackEvent('pwa', 'sw_registered', 'success');
            })
            .catch(error => {
                console.log('SW registration failed:', error);
                trackEvent('pwa', 'sw_registered', 'error');
            });
    }

    // Install prompt handling
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show custom install button (optional)
        const installBtn = document.getElementById('installBtn');
        if (installBtn) {
            installBtn.style.display = 'block';
            installBtn.addEventListener('click', async () => {
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    const { outcome } = await deferredPrompt.userChoice;
                    trackEvent('pwa', 'install_prompt', outcome);
                    deferredPrompt = null;
                    installBtn.style.display = 'none';
                }
            });
        }
    });

    // Track if app was launched as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
        trackEvent('pwa', 'launched', 'standalone');
    }
}

// Keyboard shortcuts and accessibility
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Skip if user is typing in form fields
        if (e.target.matches('input, textarea, select')) return;

        const key = e.key.toLowerCase();
        const isCtrl = e.ctrlKey || e.metaKey;

        // Navigation shortcuts
        if (isCtrl) {
            switch(key) {
                case '1':
                    e.preventDefault();
                    window.location.href = 'index.html';
                    break;
                case '2':
                    e.preventDefault();
                    window.location.href = 'properties.html';
                    break;
                case '3':
                    e.preventDefault();
                    window.location.href = 'dashboard.html';
                    break;
            }
        } else {
            switch(key) {
                case '/':
                    e.preventDefault();
                    const searchInput = document.querySelector('#searchInput, .search-input');
                    if (searchInput) {
                        searchInput.focus();
                        trackEvent('ui', 'keyboard_shortcut', 'search_focus');
                    }
                    break;
                case 'escape':
                    // Close modals, mobile menu, etc.
                    const mobileMenu = document.querySelector('.nav-links.active');
                    if (mobileMenu) {
                        toggleMobileMenu();
                    }
                    break;
            }
        }
    });

    // Focus management for accessibility
    document.addEventListener('focusin', function(e) {
        if (e.target.matches('button, a, input, select, textarea')) {
            e.target.classList.add('keyboard-focused');
        }
    });

    document.addEventListener('focusout', function(e) {
        e.target.classList.remove('keyboard-focused');
    });
}

// Enhanced API functions with error handling
const API = {
    baseURL: process.env.NODE_ENV === 'production' ? 'https://api.arsatoken.com' : 'http://localhost:3000',
    
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return { success: true, data };
            
        } catch (error) {
            console.error('API request failed:', error);
            return { success: false, error: error.message };
        }
    },

    async getProperties(filters = {}) {
        const params = new URLSearchParams(filters);
        return this.request(`/api/properties?${params}`);
    },

    async getProperty(id) {
        return this.request(`/api/properties/${id}`);
    },

    async subscribeNewsletter(email) {
        return this.request('/api/newsletter/subscribe', {
            method: 'POST',
            body: JSON.stringify({ email })
        });
    }
};

// Web3 integration with enhanced error handling
const Web3Integration = {
    contracts: {
        ARSA_TOKEN: process.env.ARSA_TOKEN_CONTRACT || '0x0000000000000000000000000000000000000000',
        NFT_PROPERTY: process.env.NFT_PROPERTY_CONTRACT || '0x0000000000000000000000000000000000000000',
        RENTAL_DISTRIBUTOR: process.env.RENTAL_DISTRIBUTOR_CONTRACT || '0x0000000000000000000000000000000000000000'
    },

    async getBalance(address, tokenContract) {
        try {
            if (!window.ethereum) throw new Error('No Web3 provider');
            
            // Simulate balance check (replace with actual contract call)
            const balance = Math.floor(Math.random() * 10000) + 1000;
            return { success: true, balance };
            
        } catch (error) {
            console.error('Balance check failed:', error);
            return { success: false, error: error.message };
        }
    },

    async buyNFT(propertyId, amount) {
        try {
            if (!walletConnected) {
                throw new Error('Wallet not connected');
            }

            // Simulate NFT purchase (replace with actual contract interaction)
            const txHash = '0x' + Math.random().toString(16).substr(2, 64);
            
            trackEvent('transaction', 'nft_purchase', `property_${propertyId}`, amount);
            
            return { 
                success: true, 
                txHash,
                propertyId,
                amount,
                timestamp: Date.now()
            };
            
        } catch (error) {
            console.error('NFT purchase failed:', error);
            return { success: false, error: error.message };
        }
    },

    getTransactionHistory() {
        const transactions = JSON.parse(safeLocalStorage('get', 'transaction_history') || '[]');
        return transactions.sort((a, b) => b.timestamp - a.timestamp);
    },

    saveTransaction(transaction) {
        const transactions = this.getTransactionHistory();
        transactions.unshift(transaction);
        
        // Keep only last 100 transactions
        if (transactions.length > 100) {
            transactions.splice(100);
        }
        
        safeLocalStorage('set', 'transaction_history', JSON.stringify(transactions));
    }
};

// MAIN INITIALIZATION FUNCTION
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 ARSA Token - Enhanced Version Starting...');

    try {
        // Core initialization
        initializeLanguage();
        checkWalletConnection();
        setupGlobalErrorHandling();
        
        // UI setup
        setupMobileMenu();
        setupLanguageSelectors();
        setupNewsletterForm();
        setupKeyboardShortcuts();
        
        // Performance and PWA
        initializePerformanceMonitoring();
        initializePWA();
        
        // Animations and effects
        initializeAnimationObserver();
        setupScrollEffects();
        
        // Event listeners
        setupEventListeners();
        
        // Security
        setupSecurityMeasures();
        
        console.log('✅ ARSA Token - Enhanced Version Loaded Successfully!');
        trackEvent('app', 'initialized', 'success');
        
    } catch (error) {
        console.error('❌ Initialization failed:', error);
        trackEvent('app', 'initialization_error', error.message);
        showNotification('Application failed to load properly. Please refresh the page.', 'error');
    }
});

function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        mobileMenuBtn.setAttribute('aria-label', 'Toggle mobile menu');
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', closeMobileMenuOnClickOutside);
}

function setupLanguageSelectors() {
    const languageSelectors = document.querySelectorAll('.language-dropdown, #languageSelect, #loginLanguageSelect, #adminLanguageSelect');
    
    languageSelectors.forEach((selector, index) => {
        if (selector) {
            console.log(`🔧 Setting up language selector ${index + 1}`);
            
            // Remove existing listeners to avoid duplicates
            const newSelector = selector.cloneNode(true);
            if (selector.parentNode) {
                selector.parentNode.replaceChild(newSelector, selector);
            }
            
            // Add event listener
            newSelector.addEventListener('change', handleLanguageChange);
            newSelector.value = currentLanguage;
        }
    });
}

function handleLanguageChange(e) {
    const newLanguage = e.target.value;
    console.log('🔄 Language changed to:', newLanguage);
    
    translatePage(newLanguage);
    trackEvent('ui', 'language_change', newLanguage);
    
    // Sync other selectors
    updateAllLanguageSelectors(newLanguage);
}

function setupScrollEffects() {
    window.addEventListener('scroll', handleScroll, { passive: true });
}

function setupEventListeners() {
    // Connect wallet button
    const connectBtn = document.querySelector('.connect-wallet');
    if (connectBtn) {
        connectBtn.addEventListener('click', connectWallet);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                trackEvent('navigation', 'smooth_scroll', this.getAttribute('href'));
            }
        });
    });
    
    // Form validation on submit
    document.addEventListener('submit', function(e) {
        const form = e.target;
        if (form.tagName === 'FORM') {
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            let hasError = false;
            
            inputs.forEach(input => {
                const isValid = validateInput(input, input.type || 'text');
                
                if (!isValid) {
                    input.classList.add('error');
                    hasError = true;
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (hasError) {
                e.preventDefault();
                showNotification('Please check the form for errors', 'error');
                trackEvent('form', 'validation_error', form.id || 'unknown');
            }
        }
    });
    
    // Clear error states on input
    document.addEventListener('input', function(e) {
        if (e.target.matches('input, textarea, select')) {
            e.target.classList.remove('error');
        }
    });
}

function setupSecurityMeasures() {
    // Content Security Policy violation reporting
    document.addEventListener('securitypolicyviolation', function(e) {
        console.warn('CSP Violation:', e);
        trackEvent('security', 'csp_violation', e.violatedDirective);
    });
    
    // Detect potential XSS attempts
    const suspiciousPatterns = [
        /<script\b/gi,
        /javascript:/gi,
        /on\w+\s*=/gi
    ];
    
    document.addEventListener('input', function(e) {
        const value = e.target.value;
        if (typeof value === 'string') {
            suspiciousPatterns.forEach(pattern => {
                if (pattern.test(value)) {
                    console.warn('Suspicious input detected:', value);
                    trackEvent('security', 'suspicious_input', 'xss_attempt');
                    e.target.value = sanitizeInput(value);
                }
            });
        }
    });
}

// Custom events for extensibility
window.addEventListener('languageChanged', function(e) {
    console.log('Language changed event:', e.detail);
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        translations,
        translatePage,
        connectWallet,
        Web3Integration,
        API,
        safeLocalStorage,
        validateInput,
        showNotification,
        formatCurrency,
        formatDate,
        trackEvent
    };
}

// Global error boundary
window.addEventListener('unload', function() {
    // Cleanup before page unload
    document.body.style.overflow = '';
    
    // Clear sensitive data if needed
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        console.log('Page reloaded - cleanup completed');
    }
});

console.log('📦 ARSA Token Enhanced JavaScript v2.0 Loaded');warn('LocalStorage not available, using sessionStorage fallback:', error);
        try {
            switch(action) {
                case 'get':
                    return sessionStorage.getItem(key);
                case 'set':
                    sessionStorage.setItem(key, value);
                    return true;
                case 'remove':
                    sessionStorage.removeItem(key);
                    return true;
                case 'clear':
                    sessionStorage.clear();
                    return true;
                default:
                    return null;
            }
        } catch (sessionError) {
            console.warn('SessionStorage also not available:', sessionError);
            return null;
        }
    }
    return null;
}

// Enhanced translation function with error handling
function translatePage(language) {
    if (!translations[language]) {
        console.warn(`Language ${language} not supported, falling back to English`);
        language = 'en';
    }
    
    console.log('🔄 Translating to:', language);
    
    currentLanguage = language;
    const elements = document.querySelectorAll('[data-translate]');
    
    let translatedCount = 0;
    let missingTranslations = [];
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            // Handle elements with HTML content (like <br> tags)
            if (element.innerHTML.includes('<br>') || key.includes('title')) {
                element.innerHTML = translations[language][key];
            } else {
                element.textContent = translations[language][key];
            }
            translatedCount++;
        } else {
            missingTranslations.push(key);
            console.warn('❌ Missing translation:', key, 'for language:', language);
        }
    });

    // Handle placeholder attributes
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[language] && translations[language][key]) {
            element.placeholder = translations[language][key];
        }
    });

    // Set text direction and font for Arabic
    if (language === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.style.fontFamily = 'Tahoma, Arial, sans-serif';
        document.body.style.textAlign = 'right';
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
        document.body.style.textAlign = 'left';
    }

    // Update ALL language selectors
    updateAllLanguageSelectors(language);

    // Store language preference safely
    safeLocalStorage('set', 'preferred_language', language);
    
    console.log(`✅ Translation completed: ${translatedCount} elements translated, ${missingTranslations.length} missing`);
    
    // Dispatch custom event for language change
    window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language, translatedCount, missingTranslations } 
    }));
}

// Update all language selectors
function updateAllLanguageSelectors(language) {
    const languageSelectors = document.querySelectorAll('.language-dropdown, #languageSelect, #loginLanguageSelect, #adminLanguageSelect');
    languageSelectors.forEach(selector => {
        if (selector && selector.value !== language) {
            selector.value = language;
        }
    });
}

// Initialize language on page load
function initializeLanguage() {
    let savedLanguage = 'en';
    
    // Try to get saved language safely
    const stored = safeLocalStorage('get', 'preferred_language');
    if (stored && translations[stored]) {
        savedLanguage = stored;
    }
    
    console.log('🚀 Initializing language:', savedLanguage);
    translatePage(savedLanguage);
}

// Enhanced wallet connection with security
async function connectWallet() {
    try {
        // Check rate limiting
        if (!checkRateLimit('wallet_connect', 5)) {
            showNotification('Too many connection attempts. Please wait.', 'error');
            return false;
        }
        
        const walletBtn = document.querySelector('.connect-wallet');
        if (!walletBtn) return false;
        
        if (!walletConnected) {
            // Show connecting state
            const originalText = walletBtn.textContent;
            walletBtn.innerHTML = '<span class="spinner"></span>' + getTranslation('connecting', 'Connecting...');
            walletBtn.disabled = true;
            
            try {
                let address = null;
                
                // Try MetaMask first
                if (typeof window.ethereum !== 'undefined') {
                    address = await connectMetaMask();
                } else {
                    // Show install MetaMask message
                    const installMsg = getTranslation('install.metamask', 'Please install MetaMask to connect your wallet!');
                    showNotification(installMsg, 'error');
                    
                    setTimeout(() => {
                        window.open('https://metamask.io/', '_blank');
                    }, 2000);
                    
                    walletBtn.textContent = originalText;
                    walletBtn.disabled = false;
                    return false;
                }
                
                if (address) {
                    walletConnected = true;
                    
                    // Store connection securely
                    safeLocalStorage('set', 'wallet_connected', 'true');
                    safeLocalStorage('set', 'wallet_address', address);
                    safeLocalStorage('set', 'wallet_connection_time', Date.now().toString());
                    
                    // Update UI
                    const connectedText = getTranslation('connected', '✅ Connected');
                    walletBtn.textContent = connectedText;
                    walletBtn.style.background = 'rgba(16, 185, 129, 0.8)';
                    walletBtn.disabled = false;
                    
                    // Show success message
                    const successMsg = getTranslation('wallet.connected', '🎉 Wallet connected successfully!');
                    showNotification(successMsg, 'success');
                    
                    // Show shortened address after delay
                    setTimeout(() => {
                        const shortAddress = address.substring(0, 6) + '...' + address.substring(address.length - 4);
                        walletBtn.textContent = shortAddress;
                    }, 2000);
                    
                    // Track connection event
                    trackEvent('wallet', 'connect', 'metamask');
                    
                    return true;
                }
            } catch (error) {
                console.error('Wallet connection error:', error);
                const errorMsg = getTranslation('wallet.error', 'Failed to connect wallet. Please try again.');
                showNotification(errorMsg, 'error');
                
                walletBtn.textContent = originalText;
                walletBtn.disabled = false;
                return false;
            }
        } else {
            // Disconnect option
            const disconnectMsg = getTranslation('wallet.disconnect.confirm', 'Disconnect wallet?');
            if (confirm(disconnectMsg)) {
                disconnectWallet();
                return true;
            }
        }
        
        return false;
    } catch (error) {
        console.error('Connect wallet error:', error);
        showNotification('Connection failed. Please try again.', 'error');
        return false;
    }
}

// MetaMask connection with error handling
async function connectMetaMask() {
    try {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        
        if (accounts.length > 0) {
            // Check if we're on the right network (Arbitrum)
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            if (chainId !== '0xA4B1') {
                const switchMsg = getTranslation('switch.arbitrum', 'Switch to Arbitrum network?');
                if (confirm(switchMsg)) {
                    await switchToArbitrum();
                }
            }
            
            return accounts[0];
        }
        return null;
    } catch (error) {
        console.error('MetaMask connection error:', error);
        if (error.code === 4001) {
            // User rejected the request
            showNotification('Connection rejected by user', 'error');
        } else {
            showNotification('Failed to connect to MetaMask', 'error');
        }
        return null;
    }
}

// Switch to Arbitrum network
async function switchToArbitrum() {
    const arbitrumNetwork = {
        chainId: '0xA4B1',
        chainName: 'Arbitrum One',
        rpcUrls: ['https://arb1.arbitrum.io/rpc'],
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18
        },
        blockExplorerUrls: ['https://arbiscan.io/']
    };
    
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: arbitrumNetwork.chainId }],
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [arbitrumNetwork],
                });
            } catch (addError) {
                console.error('Error adding Arbitrum network:', addError);
                throw addError;
            }
        } else {
            console.error('Error switching to Arbitrum:', switchError);
            throw switchError;
        }
    }
}

// Disconnect wallet
function disconnectWallet() {
    walletConnected = false;
    
    // Clear stored data
    safeLocalStorage('remove', 'wallet_connected');
    safeLocalStorage('remove', 'wallet_address');
    safeLocalStorage('remove', 'wallet_connection_time');
    
    // Reset wallet button
    const walletBtn = document.querySelector('.connect-wallet');
    if (walletBtn) {
        const connectText = getTranslation('nav.connect', 'Connect Wallet');
        walletBtn.textContent = connectText;
        walletBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
    
    const disconnectedMsg = getTranslation('wallet.disconnected', 'Wallet disconnected');
    showNotification(disconnectedMsg, 'success');
    
    trackEvent('wallet', 'disconnect', 'user_action');
}

// Check wallet connection on page load
function checkWalletConnection() {
    const isConnected = safeLocalStorage('get', 'wallet_connected') === 'true';
    const address = safeLocalStorage('get', 'wallet_address');
    const connectionTime = safeLocalStorage('get', 'wallet_connection_time');
    
    // Check if connection is not too old (24 hours)
    if (connectionTime) {
        const timeDiff = Date.now() - parseInt(connectionTime);
        if (timeDiff > 24 * 60 * 60 * 1000) {
            // Connection is too old, disconnect
            disconnectWallet();
            return;
        }
    }
    
    if (isConnected && address) {
        walletConnected = true;
        const walletBtn = document.querySelector('.connect-wallet');
        if (walletBtn) {
            const shortAddress = address.substring(0, 6) + '...' + address.substring(address.length - 4);
            walletBtn.textContent = shortAddress;
            walletBtn.style.background = 'rgba(16, 185, 129, 0.8)';
        }
    }
}

// Enhanced notification system with queue
let notificationQueue = [];
let currentNotification = null;

function showNotification(message, type = 'info', duration = 5000) {
    // Add to queue if there's a current notification
    if (currentNotification) {
        notificationQueue.push({ message, type, duration });
        return;
    }
    
    createNotification(message, type, duration);
}

function createNotification(message, type, duration) {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
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
    
    // Sanitize message to prevent XSS
    notification.textContent = message;
    
    // Add close button
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 5px;
        right: 10px;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0.7;
    `;
    closeBtn.onclick = () => dismissNotification(notification);
    notification.appendChild(closeBtn);
    
    // Click to dismiss
    notification.onclick = () => dismissNotification(notification);
    
    document.body.appendChild(notification);
    currentNotification = notification;
    
    // Auto remove
    setTimeout(() => {
        dismissNotification(notification);
    }, duration);
}

function dismissNotification(notification) {
    if (notification && document.body.contains(notification)) {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
            currentNotification = null;
            
            // Process queue
            if (notificationQueue.length > 0) {
                const next = notificationQueue.shift();
                createNotification(next.message, next.type, next.duration);
            }
        }, 300);
    }
}

function getNotificationColor(type) {
    const colors = {
        success: {
            bg: 'rgba(16, 185, 129, 0.2)',
            border: '#10b981',
            text: '#10b981'
        },
        error: {
            bg: 'rgba(239, 68, 68, 0.2)',
            border: '#ef4444',
            text: '#ef4444'
        },
        warning: {
            bg: 'rgba(245, 158, 11, 0.2)',
            border: '#f59e0b',
            text: '#f59e0b'
        },
        info: {
            bg: 'rgba(102, 126, 234, 0.2)',
            border: '#667eea',
            text: '#667eea'
        }
    };
    return colors[type] || colors.info;
}

// Rate limiting function
function checkRateLimit(action, limit = 10, window = 60000) {
    const now = Date.now();
    const key = `${action}_${Math.floor(now / window)}`;
    
    const current = rateLimiter.get(key) || 0;
    if (current >= limit) {
        return false;
    }
    
    rateLimiter.set(key, current + 1);
    
    // Clean old entries
    setTimeout(() => {
        rateLimiter.delete(key);
    }, window);
    
    return true;
}

// Enhanced form validation with security
function validateInput(input, type) {
    if (!input || typeof input.value !== 'string') {
        return false;
    }
    
    const value = input.value.trim();
    
    // Sanitize input to prevent XSS
    const sanitized = sanitizeInput(value);
    if (sanitized !== value) {
        input.value = sanitized;
    }
    
    switch(type) {
        case 'email':
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized) && sanitized.length <= 254;
        case 'number':
            return !isNaN(sanitized) && parseFloat(sanitized) >= 0 && sanitized.length <= 20;
        case 'wallet':
            return /^0x[a-fA-F0-9]{40}$/.test(sanitized);
        case 'required':
            return sanitized.length > 0 && sanitized.length <= 1000;
        case 'url':
            try {
                const url = new URL(sanitized);
                return ['http:', 'https:'].includes(url.protocol);
            } catch {
                return false;
            }
        case 'text':
            return sanitized.length > 0 && sanitized.length <= 500;
        default:
            return sanitized.length > 0 && sanitized.length <= 255;
    }
}

// Input sanitization to prevent XSS
function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    
    return input
        .replace(/[<>]/g, '') // Remove potentially dangerous characters
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+\s*=/gi, '') // Remove event handlers
        .trim()
        .substring(0, 1000); // Limit length
}

// Get translation with fallback
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

// Enhanced analytics tracking
function trackEvent(category, action, label = '', value = null) {
    // Sanitize inputs
    category = sanitizeInput(category).substring(0, 50);
    action = sanitizeInput(action).substring(0, 50);
    label = sanitizeInput(label).substring(0, 100);
    
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        const eventData = {
            event_category: category,
            event_label: label
        };
        
        if (value !== null && !isNaN(value)) {
            eventData.value = value;
        }
        
        gtag('event', action, eventData);
    }
    
    // Custom analytics (replace with your analytics service)
    console.log(`📊 Event: ${category}/${action}/${label}${value ? ` (${value})` : ''}`);
    
    // Store event locally for debugging (optional)
    if (typeof safeLocalStorage === 'function') {
        const events = JSON.parse(safeLocalStorage('get', 'analytics_events') || '[]');
        events.push({
            category,
            action,
            label,
            value,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent.substring(0, 100)
        });
        
        // Keep only last 100 events
        if (events.length > 100) {
            events.splice(0, events.length - 100);
        }
        
        safeLocalStorage('set', 'analytics_events', JSON.stringify(events));
    }
}

// Mobile menu toggle with improved UX
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const body = document.body;
    
    if (navLinks && mobileBtn) {
        const isActive = navLinks.classList.contains('active');
        
        navLinks.classList.toggle('active');
        mobileBtn.textContent = isActive ? '☰' : '✕';
        mobileBtn.setAttribute('aria-expanded', !isActive);
        
        // Prevent body scroll when menu is open
        if (!isActive) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
        
        trackEvent('ui', 'mobile_menu_toggle', isActive ? 'close' : 'open');
    }
}

// Close mobile menu when clicking outside
function closeMobileMenuOnClickOutside(e) {
    const navLinks = document.querySelector('.nav-links');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (navLinks && navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !mobileBtn.contains(e.target)) {
        
        navLinks.classList.remove('active');
        mobileBtn.textContent = '☰';
        mobileBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}

// Enhanced scroll effects with performance optimization
let ticking = false;
let lastScrollY = 0;

function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    
    if (!header) {
        ticking = false;
        return;
    }
    
    // Header background opacity
    if (scrolled > 100) {
        header.style.background = 'rgba(15, 15, 35, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(15, 15, 35, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
    
    // Hide/show header on scroll (only on mobile)
    if (window.innerWidth <= 768) {
        if (scrolled > lastScrollY && scrolled > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollY = scrolled;
    ticking = false;
}

function handleScroll() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

// Intersection Observer for animations
function initializeAnimationObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.animationDelay = `${Math.random() * 0.3}s`;
                element.classList.add('fade-in-active');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Enhanced error handling
function setupGlobalErrorHandling() {
    // JavaScript errors
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', {
            message: e.message,
            filename: e.filename,
            lineno: e.lineno,
            colno: e.colno,
            error: e.error
        });
        
        // Don't show notifications for minor errors
        if (e.error && !e.message.includes('Script error') && !e.message.includes('Non-Error')) {
            const errorMsg = getTranslation('error.generic', 'An error occurred. Please refresh the page if the problem persists.');
            showNotification(errorMsg, 'error');
        }
        
        trackEvent('error', 'javascript', e.message || 'unknown', 1);
    });

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled Promise Rejection:', e.reason);
        
        const errorMsg = getTranslation('error.network', 'Network error. Please check your connection.');
        showNotification(errorMsg, 'error');
        
        trackEvent('error', 'promise_rejection', e.reason?.message || 'unknown', 1);
    });
}

// Enhanced newsletter form
function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Rate limiting
        if (!checkRateLimit('newsletter_subscribe', 3)) {
            showNotification('Too many subscription attempts. Please wait.', 'error');
            return;
        }
        
        const emailInput = this.querySelector('input[type="email"]');
        const submitBtn = this.querySelector('button[type="submit"]');
        
        if (!emailInput || !submitBtn) return;
        
        // Validate email
        if (!validateInput(emailInput, 'email')) {
            showNotification('Please enter a valid email address', 'error');
            emailInput.focus();
            return;
        }
        
        const email = emailInput.value.trim();
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="spinner"></span>' + getTranslation('subscribing', 'Subscribing...');
        submitBtn.disabled = true;
        
        try {
            // Simulate API call (replace with real endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success
            const successMsg = getTranslation('newsletter.success', `Thank you for subscribing! You'll receive updates at ${email}`);
            showNotification(successMsg, 'success');
            
            // Reset form
            this.reset();
            
            // Track event
            trackEvent('engagement', 'newsletter_subscribe', 'success');
            
            // Store subscription locally for demo
            const subscriptions = JSON.parse(safeLocalStorage('get', 'newsletter_subscriptions') || '[]');
            subscriptions.push({
                email,
                date: new Date().toISOString(),
                language: currentLanguage,
                source: window.location.href
            });
            safeLocalStorage('set', 'newsletter_subscriptions', JSON.stringify(subscriptions));
            
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            const errorMsg = getTranslation('newsletter.error', 'Subscription failed. Please try again.');
            showNotification(errorMsg, 'error');
            
            trackEvent('engagement', 'newsletter_subscribe', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Utility functions for formatting
function formatCurrency(amount, currency = 'EUR', locale = null) {
    try {
        const userLocale = locale || (currentLanguage === 'ar' ? 'ar-SA' : currentLanguage === 'tr' ? 'tr-TR' : 'en-US');
        return new Intl.NumberFormat(userLocale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(amount);
    } catch (error) {
        console.🔗 Connect Wallet',
        'property.wallet.purchase': 'Purchase NFTs',
        'property.wallet.payment': '💳 Payment in ARSA Tokens or ETH',
        
        // Footer
        'footer.follow': 'Follow ARSA Token',
        
        // Common
        'loading': 'Loading...',
        'error.network': 'Network error. Please try again.',
        'error.generic': 'An error occurred. Please try again.',
        'success.generic': 'Operation completed successfully!'
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
        
        // Properties Page
        'properties.page.title': 'Yatırım Emlakları',
        'properties.page.subtitle': 'Avrupa\'da premium emlak fırsatlarını keşfedin',
        'properties.page.stats.total.label': 'Toplam Emlak',
        'properties.page.stats.available.label': 'Şimdi Mevcut',
        'properties.page.stats.value.label': 'Toplam Portföy Değeri',
        'properties.page.stats.yield.label': 'Ortalama Getiri',
        
        // Search and Filters
        'properties.search.placeholder': 'Şehir, emlak adı veya türe göre arayın...',
        'properties.filter.location': 'Konum',
        'properties.filter.all.locations': 'Tüm Konumlar',
        'properties.filter.type': 'Emlak Türü',
        'properties.filter.all.types': 'Tüm Türler',
        'properties.filter.office': 'Ofis',
        'properties.filter.residential': 'Konut',
        'properties.filter.retail': 'Ticari',
        'properties.filter.warehouse': 'Depo',
        'properties.filter.hotel': 'Otel',
        'properties.filter.status': 'Durum',
        'properties.filter.all.status': 'Tüm Durumlar',
        'properties.filter.available': 'Mevcut',
        'properties.filter.selling': 'Hızla Satıyor',
        'properties.filter.sold': 'Tükendi',
        'properties.filter.clear': 'Tümünü Temizle',
        
        // Results and Sorting
        'properties.results.showing': 'Gösteriliyor',
        'properties.results.properties': 'emlak',
        'properties.sort.newest': 'En Yeni Önce',
        'properties.sort.price.low': 'Fiyat: Düşükten Yükseğe',
        'properties.sort.price.high': 'Fiyat: Yüksekten Düşüğe',
        'properties.sort.yield.high': 'En Yüksek Getiri',
        'properties.sort.yield.low': 'En Düşük Getiri',
        'properties.sort.name': 'İsim A-Z',
        
        // Pagination
        'properties.pagination.previous': 'Önceki',
        'properties.pagination.next': 'Sonraki',
        
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
        'property.wallet.connect': '