// ARSA Token - Fixed Script.js - Frontend Only Version
// Remove the problematic authorization code at the beginning

// Current language - GLOBAL VARIABLE
let currentLanguage = 'en';

// SAFE LOCAL STORAGE FUNCTION - FIXED
function safeLocalStorage(action, key, value = null) {
    try {
        if (typeof localStorage !== 'undefined') {
            if (action === 'get') {
                return localStorage.getItem(key);
            } else if (action === 'set') {
                localStorage.setItem(key, value);
                return true;
            } else if (action === 'remove') {
                localStorage.removeItem(key);
                return true;
            }
        }
    } catch (error) {
        console.warn('LocalStorage not available, using sessionStorage:', error);
        // Fallback to sessionStorage
        try {
            if (action === 'get') {
                return sessionStorage.getItem(key);
            } else if (action === 'set') {
                sessionStorage.setItem(key, value);
                return true;
            } else if (action === 'remove') {
                sessionStorage.removeItem(key);
                return true;
            }
        } catch (sessionError) {
            console.warn('SessionStorage also not available:', sessionError);
            return null;
        }
    }
    return null;
}

// MAIN TRANSLATION FUNCTION - FIXED
function translatePage(language) {
    console.log('🔄 Translating to:', language);
    
    currentLanguage = language;
    const elements = document.querySelectorAll('[data-translate]');
    
    console.log('📝 Found elements to translate:', elements.length);
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            // Handle elements with HTML content (like <br> tags)
            if (element.innerHTML.includes('<br>') || key.includes('title')) {
                element.innerHTML = translations[language][key];
            } else {
                element.textContent = translations[language][key];
            }
            console.log('✅ Translated:', key);
        } else {
            console.log('❌ Missing translation:', key, 'for language:', language);
        }
    });

    // Handle placeholder attributes - FIXED
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[language] && translations[language][key]) {
            element.placeholder = translations[language][key];
        }
    });

    // Set text direction for Arabic - IMPROVED
    if (language === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.style.fontFamily = 'Tahoma, Arial, sans-serif';
        document.body.style.textAlign = 'right';
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
        document.body.style.textAlign = 'left';
    }

    // Update ALL language selectors - FIXED
    const languageSelectors = document.querySelectorAll('.language-dropdown, #languageSelect, #loginLanguageSelect');
    languageSelectors.forEach(selector => {
        if (selector && selector.value !== language) {
            selector.value = language;
        }
    });

    // Store language preference - SAFE
    safeLocalStorage('set', 'preferred_language', language);
    
    console.log('✅ Translation completed for:', language);
}

// Initialize language on page load - IMPROVED
function initializeLanguage() {
    let savedLanguage = 'en';
    
    // Try to get saved language safely
    const stored = safeLocalStorage('get', 'preferred_language');
    if (stored) {
        savedLanguage = stored;
    }
    
    console.log('🚀 Initializing language:', savedLanguage);
    translatePage(savedLanguage);
}

// Mobile menu toggle - NEW FEATURE
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (navLinks && mobileBtn) {
        navLinks.classList.toggle('active');
        mobileBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    }
}

// Scroll to properties section
function scrollToProperties() {
    const propertiesSection = document.getElementById('properties');
    if (propertiesSection) {
        propertiesSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Redirect to properties page if section doesn't exist
        window.location.href = 'properties.html';
    }
}

// Open property detail page
function openPropertyDetail() {
    window.location.href = 'property-detail.html';
}

// Wallet connection simulation - IMPROVED
let walletConnected = false;

function connectWallet() {
    const walletBtn = document.querySelector('.connect-wallet');
    if (!walletBtn) return;
    
    if (!walletConnected) {
        const connectingTexts = {
            en: 'Connecting...',
            tr: 'Bağlanıyor...',
            ar: 'جاري الاتصال...'
        };
        
        const originalText = walletBtn.textContent;
        walletBtn.textContent = connectingTexts[currentLanguage] || connectingTexts.en;
        walletBtn.disabled = true;
        
        // Add loading spinner
        walletBtn.innerHTML = '<span class="spinner"></span>' + (connectingTexts[currentLanguage] || connectingTexts.en);
        
        // Simulate wallet connection
        setTimeout(() => {
            walletConnected = true;
            
            const connectedTexts = {
                en: '✅ Connected',
                tr: '✅ Bağlandı',
                ar: '✅ متصل'
            };
            
            walletBtn.innerHTML = connectedTexts[currentLanguage] || connectedTexts.en;
            walletBtn.style.background = 'rgba(16, 185, 129, 0.8)';
            walletBtn.disabled = false;
            
            // Store connection status
            safeLocalStorage('set', 'wallet_connected', 'true');
            safeLocalStorage('set', 'wallet_address', '0x1234567890abcdef1234567890abcdef12345678');
            
            // Show wallet address after a moment
            setTimeout(() => {
                walletBtn.textContent = '0x1234...5678';
            }, 1000);
            
            // Show success message
            const successTexts = {
                en: '🎉 Wallet connected successfully!',
                tr: '🎉 Cüzdan başarıyla bağlandı!',
                ar: '🎉 تم ربط المحفظة بنجاح!'
            };
            
            showNotification(successTexts[currentLanguage] || successTexts.en, 'success');
            
        }, 2000);
    } else {
        // Disconnect option
        const disconnectTexts = {
            en: 'Disconnect wallet?',
            tr: 'Cüzdan bağlantısını kes?',
            ar: 'قطع اتصال المحفظة؟'
        };
        
        if (confirm(disconnectTexts[currentLanguage] || disconnectTexts.en)) {
            walletConnected = false;
            
            const connectTexts = {
                en: 'Connect Wallet',
                tr: 'Cüzdan Bağla',
                ar: 'ربط المحفظة'
            };
            
            walletBtn.textContent = connectTexts[currentLanguage] || connectTexts.en;
            walletBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            
            // Clear connection status
            safeLocalStorage('remove', 'wallet_connected');
            safeLocalStorage('remove', 'wallet_address');
        }
    }
}

// Notification system - NEW
function showNotification(message, type = 'info') {
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
        background: ${type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 
                     type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(102, 126, 234, 0.2)'};
        border: 1px solid ${type === 'success' ? '#10b981' : 
                           type === 'error' ? '#ef4444' : '#667eea'};
        color: ${type === 'success' ? '#10b981' : 
                type === 'error' ? '#ef4444' : '#667eea'};
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 10000;
        font-weight: 600;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Form validation - NEW
function validateInput(input, type) {
    const value = input.value.trim();
    
    switch(type) {
        case 'email':
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        case 'number':
            return !isNaN(value) && parseFloat(value) > 0;
        case 'wallet':
            return /^0x[a-fA-F0-9]{40}$/.test(value);
        case 'required':
            return value.length > 0;
        case 'url':
            try {
                new URL(value);
                return true;
            } catch {
                return false;
            }
        default:
            return value.length > 0;
    }
}

// HTML escape for security - NEW
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Admin functions - IMPROVED
function addNewProperty() {
    const title = document.getElementById('propertyTitle')?.value?.trim();
    const location = document.getElementById('propertyLocation')?.value?.trim();
    const value = document.getElementById('propertyValue')?.value?.trim();
    const yield_ = document.getElementById('propertyYield')?.value?.trim();
    const nfts = document.getElementById('propertyNFTs')?.value?.trim();
    const description = document.getElementById('propertyDescription')?.value?.trim();
    
    // Validation
    if (!title || !location || !value || !yield_ || !nfts) {
        const errorMessages = {
            en: 'Please fill all required fields!',
            tr: 'Lütfen tüm gerekli alanları doldurun!',
            ar: 'يرجى ملء جميع الحقول المطلوبة!'
        };
        
        showNotification(errorMessages[currentLanguage] || errorMessages.en, 'error');
        return;
    }
    
    // Validate numbers
    if (!validateInput({value: value}, 'number') || 
        !validateInput({value: yield_}, 'number') || 
        !validateInput({value: nfts}, 'number')) {
        const errorMessages = {
            en: 'Please enter valid numbers for value, yield, and NFT count!',
            tr: 'Lütfen değer, getiri ve NFT sayısı için geçerli sayılar girin!',
            ar: 'يرجى إدخال أرقام صحيحة للقيمة والعائد وعدد الرموز!'
        };
        
        showNotification(errorMessages[currentLanguage] || errorMessages.en, 'error');
        return;
    }
    
    const successMessages = {
        en: `Property Added Successfully!\n\nTitle: ${escapeHtml(title)}\nLocation: ${escapeHtml(location)}\nValue: €${escapeHtml(value)}\nYield: ${escapeHtml(yield_)}%\nNFTs: ${escapeHtml(nfts)}`,
        tr: `Gayrimenkul Başarıyla Eklendi!\n\nBaşlık: ${escapeHtml(title)}\nKonum: ${escapeHtml(location)}\nDeğer: €${escapeHtml(value)}\nGetiri: %${escapeHtml(yield_)}\nNFT'ler: ${escapeHtml(nfts)}`,
        ar: `تم إضافة العقار بنجاح!\n\nالعنوان: ${escapeHtml(title)}\nالموقع: ${escapeHtml(location)}\nالقيمة: €${escapeHtml(value)}\nالعائد: ${escapeHtml(yield_)}%\nالرموز: ${escapeHtml(nfts)}`
    };
    
    alert(successMessages[currentLanguage] || successMessages.en);
    
    // Clear form
    const form = document.getElementById('addPropertyForm');
    if (form) {
        form.reset();
    }
    
    showNotification('Property added successfully!', 'success');
}

function distributeRentals() {
    const amountInput = document.getElementById('rentalAmount');
    if (!amountInput) return;
    
    const amount = amountInput.value.trim();
    
    if (!amount || !validateInput({value: amount}, 'number')) {
        const errorMessages = {
            en: 'Please enter a valid rental amount!',
            tr: 'Lütfen geçerli bir kira tutarı girin!',
            ar: 'يرجى إدخال مبلغ إيجار صحيح!'
        };
        
        showNotification(errorMessages[currentLanguage] || errorMessages.en, 'error');
        return;
    }
    
    const successMessages = {
        en: `Rental Distribution Initiated!\n\nAmount: €${escapeHtml(amount)}\nThis will be distributed to all NFT holders proportionally.`,
        tr: `Kira Dağıtımı Başlatıldı!\n\nTutar: €${escapeHtml(amount)}\nBu tutar tüm NFT sahiplerine orantılı olarak dağıtılacak.`,
        ar: `تم بدء توزيع الإيجار!\n\nالمبلغ: €${escapeHtml(amount)}\nسيتم توزيع هذا على جميع حاملي الرموز بشكل متناسب.`
    };
    
    alert(successMessages[currentLanguage] || successMessages.en);
    amountInput.value = '';
    
    showNotification('Rental distribution initiated!', 'success');
}

// Investment calculator (for property detail page) - IMPROVED
function updateInvestmentSummary() {
    const amountInput = document.getElementById('investmentAmount');
    if (!amountInput) return;
    
    const amount = parseFloat(amountInput.value) || 0;
    const nftPrice = 100;
    const nftCount = Math.floor(amount / nftPrice);
    const monthlyIncomePerNFT = 0.60;
    
    const elements = {
        nftCount: document.getElementById('nftCount'),
        monthlyIncome: document.getElementById('monthlyIncome'),
        annualReturn: document.getElementById('annualReturn'),
        totalCost: document.getElementById('totalCost')
    };
    
    if (elements.nftCount) elements.nftCount.textContent = nftCount;
    if (elements.monthlyIncome) elements.monthlyIncome.textContent = `€${(nftCount * monthlyIncomePerNFT).toFixed(2)}`;
    if (elements.annualReturn) elements.annualReturn.textContent = `€${(nftCount * monthlyIncomePerNFT * 12).toFixed(2)}`;
    if (elements.totalCost) elements.totalCost.textContent = `€${(nftCount * nftPrice).toFixed(0)}`;
    
    // Update actual investment amount to match whole NFTs
    amountInput.value = nftCount * nftPrice;
}

function setAmount(amount) {
    const amountInput = document.getElementById('investmentAmount');
    if (amountInput) {
        amountInput.value = amount;
        updateInvestmentSummary();
    }
}

// Check wallet connection status on page load - NEW
function checkWalletConnection() {
    const isConnected = safeLocalStorage('get', 'wallet_connected') === 'true';
    const address = safeLocalStorage('get', 'wallet_address');
    
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

// MAIN INITIALIZATION FUNCTION - IMPROVED
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 ARSA Token JavaScript Starting...');
    
    // Initialize language FIRST
    initializeLanguage();
    
    // Check wallet connection
    checkWalletConnection();
    
    // Setup mobile menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navLinks = document.querySelector('.nav-links');
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        
        if (navLinks && navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !mobileBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            if (mobileBtn) mobileBtn.textContent = '☰';
        }
    });
    
    // Setup ALL language selectors with proper event listeners
    const languageSelectors = document.querySelectorAll('.language-dropdown, #languageSelect, #loginLanguageSelect');
    console.log('🔧 Found language selectors:', languageSelectors.length);
    
    languageSelectors.forEach((selector, index) => {
        if (selector) {
            console.log(`🔧 Setting up selector ${index + 1}:`, selector.id || selector.className);
            
            // Remove existing listeners to avoid duplicates
            const newSelector = selector.cloneNode(true);
            selector.parentNode.replaceChild(newSelector, selector);
            
            // Add new listener
            newSelector.addEventListener('change', handleLanguageChange);
            
            // Set initial value
            newSelector.value = currentLanguage;
        }
    });
    
    // Language change handler - IMPROVED
    function handleLanguageChange(e) {
        console.log('🔄 Language selector changed to:', e.target.value);
        const newLanguage = e.target.value;
        
        // Translate page
        translatePage(newLanguage);
        
        // Sync all other selectors
        document.querySelectorAll('.language-dropdown, #languageSelect, #loginLanguageSelect').forEach(otherSelector => {
            if (otherSelector !== e.target && otherSelector.value !== newLanguage) {
                otherSelector.value = newLanguage;
            }
        });
        
        // Update specific page elements if needed
        if (typeof updatePlaceholder === 'function') {
            updatePlaceholder();
        }
        
        if (typeof changeMainImage === 'function') {
            const activeThumb = document.querySelector('.thumbnail.active');
            if (activeThumb) {
                const index = Array.from(document.querySelectorAll('.thumbnail')).indexOf(activeThumb);
                changeMainImage(index);
            }
        }
        
        // Update placeholder text for search inputs
        updateSearchPlaceholders();
    }

    // Update search placeholders - NEW
    function updateSearchPlaceholders() {
        const searchInputs = document.querySelectorAll('.search-input, #searchInput');
        searchInputs.forEach(input => {
            if (input.hasAttribute('data-translate-placeholder')) {
                const key = input.getAttribute('data-translate-placeholder');
                if (translations[currentLanguage] && translations[currentLanguage][key]) {
                    input.placeholder = translations[currentLanguage][key];
                }
            }
        });
    }

    // Connect wallet button
    const connectBtn = document.querySelector('.connect-wallet');
    if (connectBtn && !connectBtn.hasAttribute('data-listener-added')) {
        connectBtn.addEventListener('click', connectWallet);
        connectBtn.setAttribute('data-listener-added', 'true');
    }

    // Investment amount input (property detail page)
    const investmentAmountInput = document.getElementById('investmentAmount');
    if (investmentAmountInput) {
        investmentAmountInput.addEventListener('input', updateInvestmentSummary);
        updateInvestmentSummary(); // Initialize
    }

    // Admin form submission
    const addPropertyBtn = document.getElementById('addPropertyBtn');
    if (addPropertyBtn) {
        addPropertyBtn.addEventListener('click', addNewProperty);
    }

    const distributeBtn = document.getElementById('distributeBtn');
    if (distributeBtn) {
        distributeBtn.addEventListener('click', distributeRentals);
    }

    // Form validation for all forms - NEW
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let hasError = false;
            
            inputs.forEach(input => {
                if (!validateInput(input, 'required')) {
                    input.style.borderColor = '#ef4444';
                    hasError = true;
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (hasError) {
                e.preventDefault();
                showNotification('Please fill all required fields', 'error');
            }
        });
    });

    // Smooth scroll animation for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations - IMPROVED
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = Math.random() * 0.3 + 's';
                entry.target.classList.add('fade-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all elements that should fade in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Header background on scroll - IMPROVED
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.style.background = 'rgba(15, 15, 35, 0.98)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'rgba(15, 15, 35, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            }
            
            // Hide/show header on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        }
    });
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .header {
            transition: all 0.3s ease;
        }
        
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ ARSA Token JavaScript Initialized Successfully!');
});

// Complete translation system - ALL TRANSLATIONS + FIXED ERRORS
const translations = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.properties': 'Properties',
        'nav.dashboard': 'Dashboard',
        'nav.admin': 'Admin',
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
        
        // Footer
        'footer.follow': 'Follow ARSA Token'
        // ... add other translations as needed
    },
    
    tr: {
        // Navigation
        'nav.home': 'Ana Sayfa',
        'nav.properties': 'Gayrimenkuller',
        'nav.dashboard': 'Hesabım',
        'nav.admin': 'Yönetim',
        'nav.about': 'Hakkımızda',
        'nav.connect': 'Cüzdan Bağla',
        
        // Hero section
        'hero.title': 'NFT ile Gayrimenkul<br>Yatırımı Yapın',
        'hero.subtitle': 'Blockchain teknolojisi ile gayrimenkul yatırımını demokratikleştiriyoruz. Gerçek gayrimenkul destekli bölünmüş NFT\'ler satın alın ve aylık kira geliri kazanın.',
        'hero.start': 'Yatırıma Başla',
        'hero.learn': 'Daha Fazla Bilgi',
        
        // Stats
        'stats.tvl': 'Toplam Kilitli Değer',
        'stats.investors': 'Aktif Yatırımcı',
        'stats.properties': 'Gayrimenkul',
        'stats.monthly': 'Aylık Dağıtım',
        
        // Features
        'features.title': 'Neden ARSA Token?',
        'features.subtitle': 'Gayrimenkul yatırımının geleceğini yaşayın',
        
        // Properties
        'properties.title': 'Öne Çıkan Gayrimenkuller',
        'properties.subtitle': 'Premium gayrimenkul fırsatları',
        
        // Footer
        'footer.follow': 'ARSA Token\'ı Takip Edin'
        // ... add other translations as needed
    },
    
    ar: {
        // Navigation
        'nav.home': 'الرئيسية',
        'nav.properties': 'العقارات',
        'nav.dashboard': 'لوحة التحكم',
        'nav.admin': 'الإدارة',
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
        
        // Footer
        'footer.follow': 'تابع ARSA Token'
    }
};

// Utility functions - IMPROVED
function formatCurrency(amount, currency = 'EUR') {
    const locale = currentLanguage === 'ar' ? 'ar-SA' : currentLanguage === 'tr' ? 'tr-TR' : 'en-US';
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(amount);
}

function formatDate(date) {
    const locale = currentLanguage === 'ar' ? 'ar-SA' : currentLanguage === 'tr' ? 'tr-TR' : 'en-US';
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
}

function formatNumber(number) {
    const locale = currentLanguage === 'ar' ? 'ar-SA' : currentLanguage === 'tr' ? 'tr-TR' : 'en-US';
    return new Intl.NumberFormat(locale).format(number);
}

// Error handling - NEW
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // Don't show error notifications for minor issues
    if (e.error && e.error.message && !e.error.message.includes('Script error')) {
        const errorMessages = {
            en: 'An error occurred. Please refresh the page.',
            tr: 'Bir hata oluştu. Lütfen sayfayı yenileyin.',
            ar: 'حدث خطأ. يرجى تحديث الصفحة.'
        };
        
        showNotification(errorMessages[currentLanguage] || errorMessages.en, 'error');
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        translations,
        translatePage,
        connectWallet,
        safeLocalStorage,
        validateInput,
        showNotification,
        formatCurrency,
        formatDate
    };
}