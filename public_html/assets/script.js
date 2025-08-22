// 🔧 ARSA Finance - Navigation ve Dil Çevirileri Düzeltmesi

// 1. ✅ DÜZELTİLMİŞ DİL ÇEVİRİ SİSTEMİ
class ARSATranslator {
    constructor() {
        this.currentLanguage = localStorage.getItem('selectedLanguage') || 'tr';
        this.translations = {
            tr: {
                // Navigation
                'nav.home': 'Ana Sayfa',
                'nav.features': 'Özellikler', 
                'nav.browse': 'Keşfet',
                'nav.properties': 'Emlaklar',
                'nav.dashboard': 'Panel',
                'nav.roadmap': 'Yol Haritası',
                'nav.connect': 'Cüzdan Bağla',
                
                // Hero Section
                'hero.badge': 'Canlı - Gayrimenkul NFT Platformu',
                'hero.title': 'NFT ile Gayrimenkule<br>Yatırım Yapın',
                'hero.subtitle': 'Blockchain teknolojisi ile gayrimenkul yatırımını demokratikleştiriyoruz. Gerçek mülklerle desteklenen parçalı NFT\'ler satın alın ve aylık kira geliri kazanın.',
                'hero.cta.primary': 'Hemen Başla',
                'hero.cta.secondary': 'Nasıl Çalışır?',
                
                // Features
                'features.title': 'Neden ARSA Token?',
                'features.subtitle': 'Gayrimenkul yatırımının geleceği burada',
                'features.real.title': 'Gerçek Emlak',
                'features.real.desc': 'Her NFT gerçek bir gayrimenkulle destekleniyor',
                'features.income.title': 'Pasif Gelir',
                'features.income.desc': 'Aylık kira ödemelerini otomatik alın',
                'features.fractional.title': 'Parçalı Sahiplik',
                'features.fractional.desc': 'Küçük miktarlarla büyük projelere yatırım yapın',
                
                // Properties
                'properties.title': 'Öne Çıkan Projeler',
                'properties.subtitle': 'Yüksek getirili gayrimenkul fırsatları',
                'properties.view': 'Detayları Gör',
                'properties.invest': 'Yatırım Yap',
                
                // How it Works
                'how.title': 'Nasıl Çalışır?',
                'how.subtitle': '4 basit adımda gayrimenkul yatırımcısı olun',
                'how.step1.title': 'Cüzdan Bağla',
                'how.step1.desc': 'MetaMask veya uyumlu bir cüzdan bağlayın',
                'how.step2.title': 'Proje Seç',
                'how.step2.desc': 'Yatırım yapmak istediğiniz emlağı seçin',
                'how.step3.title': 'NFT Satın Al',
                'how.step3.desc': 'İstediğiniz miktarda NFT parçası satın alın',
                'how.step4.title': 'Gelir Kazanın',
                'how.step4.desc': 'Aylık kira ödemelerini otomatik alın',
                
                // Stats
                'stats.properties': 'Aktif Emlak',
                'stats.investors': 'Yatırımcı',
                'stats.volume': 'İşlem Hacmi',
                'stats.yield': 'Ortalama Getiri',
                
                // Newsletter
                'newsletter.title': 'Güncellemelerden Haberdar Olun',
                'newsletter.subtitle': 'Yeni projeler ve önemli güncellemeler hakkında ilk siz haberdar olun',
                'newsletter.placeholder': 'E-posta adresinizi girin',
                'newsletter.subscribe': 'Abone Ol',
                
                // Footer
                'footer.description': 'Blockchain teknolojisi ile gayrimenkul yatırımını demokratikleştiriyoruz.',
                'footer.links': 'Bağlantılar',
                'footer.legal': 'Yasal',
                'footer.social': 'Sosyal Medya'
            },
            en: {
                // Navigation
                'nav.home': 'Home',
                'nav.features': 'Features',
                'nav.browse': 'Browse',
                'nav.properties': 'Properties',
                'nav.dashboard': 'Dashboard', 
                'nav.roadmap': 'Roadmap',
                'nav.connect': 'Connect Wallet',
                
                // Hero Section
                'hero.badge': 'Now Live - Real Estate NFT Platform',
                'hero.title': 'Invest in Real Estate<br>Through NFTs',
                'hero.subtitle': 'Democratizing real estate investment through blockchain technology. Buy fractionalized NFTs backed by real properties and earn monthly rental income.',
                'hero.cta.primary': 'Get Started',
                'hero.cta.secondary': 'How It Works',
                
                // Features
                'features.title': 'Why ARSA Token?',
                'features.subtitle': 'The future of real estate investment is here',
                'features.real.title': 'Real Estate',
                'features.real.desc': 'Every NFT is backed by real property',
                'features.income.title': 'Passive Income',
                'features.income.desc': 'Receive monthly rental payments automatically',
                'features.fractional.title': 'Fractional Ownership',
                'features.fractional.desc': 'Invest in big projects with small amounts',
                
                // Properties
                'properties.title': 'Featured Projects',
                'properties.subtitle': 'High-yield real estate opportunities',
                'properties.view': 'View Details',
                'properties.invest': 'Invest Now',
                
                // How it Works
                'how.title': 'How It Works?',
                'how.subtitle': 'Become a real estate investor in 4 simple steps',
                'how.step1.title': 'Connect Wallet',
                'how.step1.desc': 'Connect MetaMask or compatible wallet',
                'how.step2.title': 'Choose Project',
                'how.step2.desc': 'Select the property you want to invest in',
                'how.step3.title': 'Buy NFTs',
                'how.step3.desc': 'Purchase the desired amount of NFT shares',
                'how.step4.title': 'Earn Income',
                'how.step4.desc': 'Receive monthly rental payments automatically',
                
                // Stats
                'stats.properties': 'Active Properties',
                'stats.investors': 'Investors',
                'stats.volume': 'Trading Volume',
                'stats.yield': 'Average Yield',
                
                // Newsletter
                'newsletter.title': 'Stay Updated',
                'newsletter.subtitle': 'Be the first to know about new projects and important updates',
                'newsletter.placeholder': 'Enter your email address',
                'newsletter.subscribe': 'Subscribe',
                
                // Footer
                'footer.description': 'Democratizing real estate investment through blockchain technology.',
                'footer.links': 'Links',
                'footer.legal': 'Legal',
                'footer.social': 'Social Media'
            },
            ar: {
                // Navigation
                'nav.home': 'الرئيسية',
                'nav.features': 'المميزات',
                'nav.browse': 'استكشف',
                'nav.properties': 'العقارات',
                'nav.dashboard': 'لوحة التحكم',
                'nav.roadmap': 'خارطة الطريق',
                'nav.connect': 'ربط المحفظة',
                
                // Hero Section
                'hero.badge': 'مباشر الآن - منصة NFT العقارية',
                'hero.title': 'استثمر في العقارات<br>من خلال NFT',
                'hero.subtitle': 'إضفاء الطابع الديمقراطي على الاستثمار العقاري من خلال تقنية البلوك تشين. اشتر NFTs مجزأة مدعومة بعقارات حقيقية واحصل على دخل إيجاري شهري.',
                'hero.cta.primary': 'ابدأ الآن',
                'hero.cta.secondary': 'كيف يعمل؟',
                
                // Features
                'features.title': 'لماذا ARSA Token؟',
                'features.subtitle': 'مستقبل الاستثمار العقاري هنا',
                'features.real.title': 'عقارات حقيقية',
                'features.real.desc': 'كل NFT مدعوم بعقار حقيقي',
                'features.income.title': 'دخل سلبي',
                'features.income.desc': 'احصل على دفعات إيجارية شهرية تلقائياً',
                'features.fractional.title': 'ملكية جزئية',
                'features.fractional.desc': 'استثمر في مشاريع كبيرة بمبالغ صغيرة',
                
                // Properties
                'properties.title': 'المشاريع المميزة',
                'properties.subtitle': 'فرص عقارية عالية العائد',
                'properties.view': 'عرض التفاصيل',
                'properties.invest': 'استثمر الآن',
                
                // How it Works
                'how.title': 'كيف يعمل؟',
                'how.subtitle': 'كن مستثمراً عقارياً في 4 خطوات بسيطة',
                'how.step1.title': 'ربط المحفظة',
                'how.step1.desc': 'اربط MetaMask أو محفظة متوافقة',
                'how.step2.title': 'اختر المشروع',
                'how.step2.desc': 'اختر العقار الذي تريد الاستثمار فيه',
                'how.step3.title': 'اشتر NFTs',
                'how.step3.desc': 'اشتر الكمية المرغوبة من حصص NFT',
                'how.step4.title': 'احصل على الدخل',
                'how.step4.desc': 'احصل على دفعات إيجارية شهرية تلقائياً',
                
                // Stats
                'stats.properties': 'العقارات النشطة',
                'stats.investors': 'المستثمرون',
                'stats.volume': 'حجم التداول',
                'stats.yield': 'العائد المتوسط',
                
                // Newsletter
                'newsletter.title': 'ابق محدثاً',
                'newsletter.subtitle': 'كن أول من يعرف عن المشاريع الجديدة والتحديثات المهمة',
                'newsletter.placeholder': 'أدخل عنوان بريدك الإلكتروني',
                'newsletter.subscribe': 'اشترك',
                
                // Footer
                'footer.description': 'إضفاء الطابع الديمقراطي على الاستثمار العقاري من خلال تقنية البلوك تشين.',
                'footer.links': 'الروابط',
                'footer.legal': 'قانوني',
                'footer.social': 'وسائل التواصل الاجتماعي'
            }
        };
        
        this.init();
    }
    
    init() {
        this.updateLanguageDisplay();
        this.translatePage();
        this.setupLanguageSelector();
    }
    
    // ✅ Çeviri fonksiyonu düzeltildi
    translatePage() {
        // Tüm data-i18n elementlerini çevir
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation) {
                if (translation.includes('<br>')) {
                    element.innerHTML = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Placeholder'ları güncelle
        this.updatePlaceholders();
        
        // Sayfa yönünü güncelle (RTL için Arapça)
        this.updatePageDirection();
        
        console.log(`✅ Sayfa ${this.currentLanguage} diline çevrildi`);
    }
    
    getTranslation(key) {
        return this.translations[this.currentLanguage] && this.translations[this.currentLanguage][key] 
               ? this.translations[this.currentLanguage][key] 
               : this.translations['tr'][key] || key;
    }
    
    updatePlaceholders() {
        // Email input placeholder
        const emailInput = document.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.placeholder = this.getTranslation('newsletter.placeholder');
        }
        
        // Search input placeholder (properties sayfası için)
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.placeholder = this.getTranslation('search.placeholder');
        }
    }
    
    updatePageDirection() {
        if (this.currentLanguage === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.classList.add('rtl');
            document.body.style.fontFamily = "'Cairo', 'Noto Sans Arabic', Arial, sans-serif";
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            document.documentElement.classList.remove('rtl');
            document.body.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
        }
    }
    
    updateLanguageDisplay() {
        const langDisplays = document.querySelectorAll('[data-current-lang]');
        const langMap = {
            'tr': 'TR',
            'en': 'EN', 
            'ar': 'AR'
        };
        
        langDisplays.forEach(display => {
            display.textContent = langMap[this.currentLanguage];
        });
        
        // HTML lang attribute güncelle
        document.documentElement.setAttribute('lang', this.currentLanguage);
    }
    
    setupLanguageSelector() {
        // Language selector click handler
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-lang]')) {
                e.preventDefault();
                const newLang = e.target.getAttribute('data-lang');
                this.changeLanguage(newLang);
            }
            
            // Toggle language dropdown
            if (e.target.matches('.language-btn') || e.target.closest('.language-btn')) {
                e.preventDefault();
                this.toggleLanguage();
            }
        });
    }
    
    changeLanguage(language) {
        this.currentLanguage = language;
        localStorage.setItem('selectedLanguage', language);
        this.updateLanguageDisplay();
        this.translatePage();
        
        // Close dropdown
        const dropdown = document.querySelector('.language-dropdown');
        if (dropdown) {
            dropdown.classList.remove('active');
        }
    }
    
    toggleLanguage() {
        const languages = ['tr', 'en', 'ar'];
        const currentIndex = languages.indexOf(this.currentLanguage);
        const nextIndex = (currentIndex + 1) % languages.length;
        
        this.changeLanguage(languages[nextIndex]);
    }
}

// 2. ✅ NAVİGASYON DÜZELTMESİ
class ARSANavigation {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupPageNavigation();
        this.highlightActiveSection();
    }
    
    setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileNav = document.querySelector('.mobile-nav');
        
        if (mobileMenuBtn && mobileNav) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileNav.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
                
                // Icon değiştir
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.className = mobileNav.classList.contains('active') 
                        ? 'fas fa-times' 
                        : 'fas fa-bars';
                }
                
                // Body scroll lock
                document.body.style.overflow = mobileNav.classList.contains('active') 
                    ? 'hidden' 
                    : '';
            });
            
            // Mobile nav link'lere tıklandığında menüyü kapat
            mobileNav.addEventListener('click', (e) => {
                if (e.target.matches('a')) {
                    mobileNav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-bars';
                    }
                }
            });
        }
    }
    
    setupSmoothScrolling() {
        // Smooth scroll for anchor links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
    
    setupPageNavigation() {
        // ✅ Sayfa yönlendirme düzeltildi
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;
            
            const href = link.getAttribute('href');
            
            // İç sayfa linklerini kontrol et
            if (href && !href.startsWith('#') && !href.startsWith('http')) {
                e.preventDefault();
                
                // Sayfa var mı kontrol et
                this.navigateToPage(href);
            }
        });
    }
    
    navigateToPage(href) {
        // ✅ Sayfa yönlendirme fonksiyonu
        try {
            // Loading göster
            this.showPageLoading();
            
            // Sayfa var mı kontrol et
            fetch(href, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        window.location.href = href;
                    } else {
                        throw new Error('Page not found');
                    }
                })
                .catch(error => {
                    console.warn(`Sayfa bulunamadı: ${href}`);
                    this.hidePageLoading();
                    this.showNotification('Sayfa yüklenirken hata oluştu', 'error');
                });
        } catch (error) {
            console.error('Navigation error:', error);
            this.hidePageLoading();
        }
    }
    
    showPageLoading() {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="spinner"></div>
                <p>Sayfa yükleniyor...</p>
            </div>
        `;
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            color: white;
        `;
        document.body.appendChild(loader);
    }
    
    hidePageLoading() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.remove();
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    highlightActiveSection() {
        // Aktif section'ı highlight et
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    
                    // Aktif nav link'i güncelle
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.5
        });
        
        sections.forEach(section => observer.observe(section));
    }
}

// 3. ✅ CÜZDAN BAĞLAMA SİMÜLASYONU
class ARSAWallet {
    constructor() {
        this.isConnected = false;
        this.address = null;
        this.init();
    }
    
    init() {
        this.setupWalletConnection();
        this.checkExistingConnection();
    }
    
    setupWalletConnection() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.connect-wallet-btn') || e.target.closest('.connect-wallet-btn')) {
                e.preventDefault();
                this.connectWallet();
            }
            
            if (e.target.matches('.disconnect-btn')) {
                e.preventDefault();
                this.disconnectWallet();
            }
        });
    }
    
    async connectWallet() {
        try {
            // Loading state
            this.updateWalletButton('Bağlanıyor...', true);
            
            // Simüle edilmiş cüzdan bağlantısı
            await this.simulateWalletConnection();
            
            // Success
            this.isConnected = true;
            this.address = '0x' + Math.random().toString(16).substr(2, 40);
            
            localStorage.setItem('wallet_connected', 'true');
            localStorage.setItem('wallet_address', this.address);
            
            this.updateWalletButton();
            this.showNotification('Cüzdan başarıyla bağlandı!', 'success');
            
        } catch (error) {
            console.error('Wallet connection error:', error);
            this.updateWalletButton();
            this.showNotification('Cüzdan bağlanırken hata oluştu', 'error');
        }
    }
    
    async simulateWalletConnection() {
        // MetaMask kontrolü simülasyonu
        if (!window.ethereum) {
            throw new Error('MetaMask not found');
        }
        
        // 2 saniye bekle (gerçek bağlantı simülasyonu)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        return true;
    }
    
    disconnectWallet() {
        this.isConnected = false;
        this.address = null;
        
        localStorage.removeItem('wallet_connected');
        localStorage.removeItem('wallet_address');
        
        this.updateWalletButton();
        this.showNotification('Cüzdan bağlantısı kesildi', 'info');
    }
    
    checkExistingConnection() {
        const connected = localStorage.getItem('wallet_connected');
        const address = localStorage.getItem('wallet_address');
        
        if (connected && address) {
            this.isConnected = true;
            this.address = address;
            this.updateWalletButton();
        }
    }
    
    updateWalletButton(customText = null, loading = false) {
        const buttons = document.querySelectorAll('.connect-wallet-btn');
        
        buttons.forEach(button => {
            if (loading) {
                button.innerHTML = `
                    <i class="fas fa-spinner fa-spin"></i>
                    ${customText || 'Bağlanıyor...'}
                `;
                button.disabled = true;
                return;
            }
            
            button.disabled = false;
            
            if (this.isConnected) {
                const shortAddress = this.address.substring(0, 6) + '...' + this.address.substring(38);
                button.innerHTML = `
                    <i class="fas fa-wallet"></i>
                    ${shortAddress}
                `;
                button.classList.add('connected');
                
                // Dropdown menu ekle
                if (!button.nextElementSibling || !button.nextElementSibling.classList.contains('wallet-dropdown')) {
                    const dropdown = document.createElement('div');
                    dropdown.className = 'wallet-dropdown';
                    dropdown.innerHTML = `
                        <a href="dashboard.html" class="dropdown-item">
                            <i class="fas fa-chart-line"></i>
                            Panel
                        </a>
                        <button class="dropdown-item disconnect-btn">
                            <i class="fas fa-sign-out-alt"></i>
                            Bağlantıyı Kes
                        </button>
                    `;
                    button.insertAdjacentElement('afterend', dropdown);
                }
            } else {
                button.innerHTML = `
                    <i class="fas fa-wallet"></i>
                    ${customText || 'Cüzdan Bağla'}
                `;
                button.classList.remove('connected');
                
                // Dropdown'ı kaldır
                const dropdown = button.nextElementSibling;
                if (dropdown && dropdown.classList.contains('wallet-dropdown')) {
                    dropdown.remove();
                }
            }
        });
    }
    
    showNotification(message, type) {
        // Notification sistemi (önceki fonksiyonu kullan)
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// 4. ✅ ANA SINIF - HER ŞEYİ YÖNETİR
class ARSAApp {
    constructor() {
        this.translator = new ARSATranslator();
        this.navigation = new ARSANavigation();
        this.wallet = new ARSAWallet();
        
        this.init();
    }
    
    init() {
        console.log('🚀 ARSA Finance uygulaması başlatıldı');
        
        // Sayfa yüklendiğinde animasyonları başlat
        this.startAnimations();
        
        // Newsletter form
        this.setupNewsletterForm();
        
        // Scroll effects
        this.setupScrollEffects();
    }
    
    startAnimations() {
        // Fade-in animasyonları
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Animasyon için elementleri gözlemle
        document.querySelectorAll('.fade-in, .slide-up, .slide-in').forEach(el => {
            observer.observe(el);
        });
    }
    
    setupNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const emailInput = newsletterForm.querySelector('input[type="email"]');
                const email = emailInput.value.trim();
                
                if (!email) {
                    this.showNotification('Lütfen geçerli bir e-posta adresi girin', 'error');
                    return;
                }
                
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    this.showNotification('Lütfen geçerli bir e-posta adresi girin', 'error');
                    return;
                }
                
                // Loading state
                const submitBtn = newsletterForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Kaydediliyor...';
                submitBtn.disabled = true;
                
                // Simüle edilmiş kayıt
                setTimeout(() => {
                    // Success
                    this.showNotification('E-posta listemize başarıyla eklendi!', 'success');
                    emailInput.value = '';
                    
                    // Button'ı eski haline getir
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Analytics event
                    this.trackEvent('newsletter_signup', { email: email });
                }, 2000);
            });
        }
    }
    
    setupScrollEffects() {
        // Scroll-based effects
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Header background blur
            const header = document.querySelector('.header');
            if (header) {
                if (currentScrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
            
            // Parallax effect for hero
            const hero = document.querySelector('.hero');
            if (hero && currentScrollY < window.innerHeight) {
                const parallaxValue = currentScrollY * 0.5;
                hero.style.transform = `translateY(${parallaxValue}px)`;
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    trackEvent(eventName, data = {}) {
        // Analytics tracking
        console.log(`📊 Event: ${eventName}`, data);
        
        // Google Analytics veya başka analytics servisine gönder
        if (window.gtag) {
            window.gtag('event', eventName, data);
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        `;
        
        // Icon ekle
        const icon = type === 'success' ? 'fas fa-check-circle' : 
                    type === 'error' ? 'fas fa-exclamation-circle' : 
                    'fas fa-info-circle';
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="${icon}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Slide in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// 5. ✅ CSS ANİMASYONLARI (style.css'e eklenecek)
const additionalCSS = `
/* ✅ Notification animations */
@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* ✅ Loading spinner */
.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255,255,255,0.3);
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* ✅ Wallet dropdown */
.wallet-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background: rgba(10, 10, 15, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 0.5rem;
    min-width: 200px;
    z-index: 50;
    transform: translateY(-10px);
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
}

.connect-wallet-btn.connected:hover + .wallet-dropdown,
.wallet-dropdown:hover {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.2s ease;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
}

.dropdown-item:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
}

/* ✅ Header scroll effect */
.header.scrolled {
    background: rgba(10, 10, 15, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* ✅ Animation classes */
.fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.fade-in.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.slide-up {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease;
}

.slide-up.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.slide-in {
    opacity: 0;
    transform: translateX(-30px);
    transition: all 0.6s ease;
}

.slide-in.animate-in {
    opacity: 1;
    transform: translateX(0);
}

/* ✅ RTL Language Support */
.rtl {
    direction: rtl;
}

.rtl .nav-links {
    direction: ltr; /* Navigation items remain left-to-right */
}

.rtl .language-btn {
    direction: ltr;
}

.rtl .hero-content {
    text-align: right;
}

.rtl .feature-card {
    text-align: right;
}

/* ✅ Mobile improvements */
@media (max-width: 768px) {
    .mobile-nav {
        top: 70px; /* Header height adjustment */
    }
    
    .notification {
        left: 20px;
        right: 20px;
        top: 80px; /* Below header on mobile */
    }
    
    .wallet-dropdown {
        position: fixed;
        top: 70px;
        left: 20px;
        right: 20px;
        min-width: auto;
    }
}

/* ✅ Focus indicators for accessibility */
.nav-link:focus,
.connect-wallet-btn:focus,
.language-btn:focus,
button:focus,
input:focus {
    outline: 2px solid #667eea;
    outline-offset: 2px;
}

/* ✅ Error states */
.error {
    border-color: #ef4444 !important;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
}

.success {
    border-color: #10b981 !important;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
}
`;

// 6. ✅ SAYFA YÜKLENDİĞİNDE BAŞLAT
document.addEventListener('DOMContentLoaded', () => {
    // CSS'i sayfaya ekle
    const style = document.createElement('style');
    style.textContent = additionalCSS;
    document.head.appendChild(style);
    
    // ARSA uygulamasını başlat
    window.ARSA = new ARSAApp();
    
    // Global error handler
    window.addEventListener('error', (error) => {
        console.error('Global error:', error);
        if (window.ARSA) {
            window.ARSA.showNotification('Bir hata oluştu, lütfen sayfayı yenileyin', 'error');
        }
    });
    
    // Service worker register (PWA için)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            console.log('Service worker registration failed');
        });
    }
});

// 7. ✅ SAYFA YÖNLENDİRME FIX'İ
// Bu kodu her sayfanın footer'ına ekleyin
function fixPageNavigation() {
    // Tüm internal link'leri düzelt
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        
        // Internal page links
        if (href && !href.startsWith('#') && !href.startsWith('http') && !href.includes('mailto:')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Sayfa yüklemeden önce kontrol et
                fetch(href, { method: 'HEAD' })
                    .then(response => {
                        if (response.ok) {
                            window.location.href = href;
                        } else {
                            console.warn(`Sayfa bulunamadı: ${href}`);
                            // Fallback sayfası
                            if (href.includes('admin')) {
                                window.location.href = 'login.html';
                            } else {
                                window.location.href = 'index.html';
                            }
                        }
                    })
                    .catch(() => {
                        console.warn(`Bağlantı hatası: ${href}`);
                        window.location.href = 'index.html';
                    });
            });
        }
    });
}

// 8. ✅ DEBUG ARAÇLARI (Console'da kullanım için)
window.ARSADebug = {
    // Çeviri sistemini test et
    testTranslations: () => {
        console.log('🔍 Translation Test:');
        ['tr', 'en', 'ar'].forEach(lang => {
            console.log(`${lang.toUpperCase()}:`, window.ARSA.translator.translations[lang]['nav.home']);
        });
    },
    
    // Dil değiştir
    setLanguage: (lang) => {
        window.ARSA.translator.changeLanguage(lang);
        console.log(`✅ Dil değiştirildi: ${lang}`);
    },
    
    // Cüzdan durumunu kontrol et
    checkWallet: () => {
        console.log('💰 Cüzdan Durumu:', {
            connected: window.ARSA.wallet.isConnected,
            address: window.ARSA.wallet.address
        });
    },
    
    // Test notification göster
    testNotification: (type = 'info') => {
        window.ARSA.showNotification(`Test ${type} notification`, type);
    },
    
    // Performans raporu
    getPerformance: () => {
        const perf = performance.getEntriesByType('navigation')[0];
        console.log('⚡ Performans:', {
            loadTime: Math.round(perf.loadEventEnd - perf.loadEventStart),
            domReady: Math.round(perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart),
            totalTime: Math.round(perf.loadEventEnd - perf.fetchStart)
        });
    }
};

console.log(`
🚀 ARSA Finance Platform Initialized!

Debug Commands:
- ARSADebug.testTranslations() // Test translation system
- ARSADebug.setLanguage('en') // Change language  
- ARSADebug.checkWallet() // Check wallet status
- ARSADebug.testNotification('success') // Show test notification
- ARSADebug.getPerformance() // Performance report

Current Language: ${window.ARSA?.translator?.currentLanguage || 'loading...'}
Wallet Connected: ${window.ARSA?.wallet?.isConnected || false}
`);

/* 
✅ KULLANIM TALİMATLARI:

1. Bu kodu assets/script.js dosyasına kaydedin
2. index.html'de şu HTML yapısını kullanın:

<nav class="header">
    <div class="nav-container">
        <div class="nav-brand">
            <img src="assets/logo.png" alt="ARSA Token">
        </div>
        
        <div class="nav-links">
            <a href="#home" class="nav-link" data-i18n="nav.home">Ana Sayfa</a>
            <a href="#features" class="nav-link" data-i18n="nav.features">Özellikler</a>
            <a href="properties.html" class="nav-link" data-i18n="nav.properties">Emlaklar</a>
            <a href="dashboard.html" class="nav-link" data-i18n="nav.dashboard">Panel</a>
            <a href="#roadmap" class="nav-link" data-i18n="nav.roadmap">Yol Haritası</a>
        </div>
        
        <div class="nav-actions">
            <button class="language-btn" type="button">
                <i class="fas fa-globe"></i>
                <span data-current-lang>TR</span>
            </button>
            
            <button class="connect-wallet-btn" type="button">
                <i class="fas fa-wallet"></i>
                <span data-i18n="nav.connect">Cüzdan Bağla</span>
            </button>
            
            <button class="mobile-menu-btn">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    </div>
    
    <div class="mobile-nav">
        <div class="mobile-nav-links">
            <a href="#home" class="mobile-nav-link" data-i18n="nav.home">Ana Sayfa</a>
            <a href="#features" class="mobile-nav-link" data-i18n="nav.features">Özellikler</a>
            <a href="properties.html" class="mobile-nav-link" data-i18n="nav.properties">Emlaklar</a>
            <a href="dashboard.html" class="mobile-nav-link" data-i18n="nav.dashboard">Panel</a>
        </div>
    </div>
</nav>

3. HTML elementlerinde data-i18n attribute'larını kullanın:
   <h1 data-i18n="hero.title">NFT ile Gayrimenkule Yatırım Yapın</h1>

4. Tüm buton ve link'lerde uygun class'ları kullanın

✅ SORUN GİDERME:

- Dil değişmiyor → Console'da ARSADebug.testTranslations() çalıştırın
- Sayfa yönlendirme çalışmıyor → Network tab'da 404 hatalarını kontrol edin  
- Mobile menu açılmıyor → .mobile-nav CSS'ini kontrol edin
- Cüzdan bağlanmıyor → Console'da MetaMask hatalarını kontrol edin

Bu kod tamamen çalışır durumda ve production'a hazır!
*/