// ARSA Token - Complete JavaScript - UPDATED VERSION (Admin Logo Access Removed)

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
        'footer.follow': 'Follow ARSA Token',
        
        // Admin Panel - COMPLETE TRANSLATIONS
        'admin.login.title': 'Admin Access',
        'admin.login.subtitle': 'Secure area - Administrator credentials required',
        'admin.login.username': 'Username',
        'admin.login.password': 'Password',
        'admin.login.button': 'Access Admin Panel',
        'admin.login.back': '← Back to Website',
        'admin.logout': '🔒 Logout',
        'admin.security.indicator': '🛡️ Secure Session Active',
        
        'admin.panel.title': '🎛️ Admin Panel',
        'admin.panel.subtitle': 'Manage properties, NFTs, and platform operations',
        
        'admin.property.add.title': '🏢 Add New Property',
        'admin.property.add.name': 'Property Title',
        'admin.property.add.location': 'Location',
        'admin.property.add.value': 'Total Property Value (€)',
        'admin.property.add.yield': 'Annual Yield (%)',
        'admin.property.add.nfts': 'Number of NFTs',
        'admin.property.add.description': 'Property Description',
        'admin.property.add.button': 'Add Property',
        
        'admin.stats.title': '📊 Platform Statistics',
        'admin.stats.properties': 'Total Properties',
        'admin.stats.investors': 'Active Investors',
        'admin.stats.tvl': 'Total Value Locked',
        'admin.stats.nfts': 'NFTs Sold',
        'admin.stats.revenue': 'Monthly Revenue',
        
        'admin.rental.title': '💰 Rental Distribution',
        'admin.rental.amount': 'Monthly Rental Amount (€)',
        'admin.rental.info.title': 'Distribution Info',
        'admin.rental.info.text': 'Rental income will be automatically distributed to all NFT holders proportionally based on their ownership percentage.',
        'admin.rental.button': 'Distribute Rentals',
        
        'admin.users.title': '👥 User Management',
        'admin.users.recent': 'Recent Transactions',
        'admin.users.rental.received': 'Rental Received',
        'admin.users.rental.monthly': 'Monthly distribution',
        
        'admin.nft.title': '🎨 NFT Management',
        'admin.nft.property': 'Property Selection',
        'admin.nft.price': 'NFT Price (€)',
        'admin.nft.available': 'Available NFTs',
        'admin.nft.pause': 'Pause Sales',
        'admin.nft.update': 'Update Pricing',
        
        'admin.settings.title': '⚙️ System Settings',
        'admin.settings.fee': 'Platform Fee (%)',
        'admin.settings.minimum': 'Minimum Investment (€)',
        'admin.settings.token.price': 'ARSA Token Price (€)',
        'admin.settings.warning.title': '⚠️ Important',
        'admin.settings.warning.text': 'Changes to system settings will affect all future transactions. Please verify before saving.',
        'admin.settings.save': 'Save Settings',
        
        // Property Detail Page - COMPLETE TRANSLATIONS
        'property.back': '← Back to Properties',
        'property.title': 'Downtown Office Complex',
        'property.location': '📍 Potsdamer Platz 1, Berlin, Germany',
        'property.status.available': '🟢 Available for Investment',
        'property.status.verified': '✅ Verified Property',
        
        'property.gallery.title': 'Premium Office Building',
        'property.gallery.subtitle': 'Modern workspace in Berlin\'s financial district',
        
        'property.details.title': '📋 Property Information',
        'property.details.type': 'Property Type',
        'property.details.type.value': 'Commercial Office Building',
        'property.details.area': 'Total Area',
        'property.details.floors': 'Floors',
        'property.details.floors.value': '8 Floors + Underground Parking',
        'property.details.year': 'Year Built',
        'property.details.year.value': '2019 (Recently Renovated 2023)',
        'property.details.occupancy': 'Occupancy Rate',
        'property.details.occupancy.value': '92% (High Demand Area)',
        'property.details.tenants': 'Current Tenants',
        'property.details.tenants.value': '5 Companies (Tech, Finance, Legal)',
        'property.details.registry': 'Property Registration',
        
        'property.legal.title': '📄 Legal Documents & Verification',
        'property.legal.deed.title': 'Property Title Deed (Grundbuch)',
        'property.legal.deed.desc': 'Official ownership document from Berlin Land Registry',
        'property.legal.permit.title': 'Building Permit & Compliance',
        'property.legal.permit.desc': 'Valid construction permits and safety certificates',
        'property.legal.income.title': 'Rental Income Records',
        'property.legal.income.desc': 'Last 12 months rental income history',
        'property.legal.structure.title': 'Legal Structure & NFT Rights',
        'property.legal.structure.desc': 'How NFT ownership translates to real estate rights',
        'property.legal.view': 'View',
        
        'property.howto.title': '💡 How It Works (Simple Explanation)',
        'property.howto.step1.title': '1. Real Property:',
        'property.howto.step1.text': 'This is a real office building in Berlin that we legally own. You can visit it, it has real tenants paying real rent.',
        'property.howto.step2.title': '2. Split into 8,500 Pieces:',
        'property.howto.step2.text': 'We divided this €850,000 building into 8,500 digital pieces (NFTs). Each piece costs €100.',
        'property.howto.step3.title': '3. You Buy Pieces:',
        'property.howto.step3.text': 'When you buy NFTs, you own that portion of the real building. It\'s like owning shares in a company, but for real estate.',
        'property.howto.step4.title': '4. Earn Rent:',
        'property.howto.step4.text': 'Every month, the building earns ~€51,200 in rent. We split this money among all NFT owners based on how many pieces they own.',
        'property.howto.step5.title': '5. Your Rights:',
        'property.howto.step5.text': 'You have legal ownership rights, voting rights on major decisions, and can sell your NFTs anytime.',
        
        'property.investment.title': '🏗️ Investment Opportunity',
        'property.nft.status': 'NFT Sales Status',
        'property.nft.sold': 'Sold',
        'property.nft.available': 'Available',
        'property.nft.progress': 'Funding Progress',
        'property.nft.complete': 'Complete',
        
        'property.trust.verified': 'Property verified by German authorities',
        'property.trust.legal': 'Legal ownership structure established',
        'property.trust.income': '12 months of rental income proven',
        'property.trust.audited': 'Smart contract audited & secure',
        
        'property.stats.value': 'Total Property Value',
        'property.stats.price': 'Price per NFT',
        'property.stats.rent': 'Monthly Rent (Total)',
        'property.stats.yield': 'Annual Yield',
        'property.stats.monthly': 'Monthly Income per NFT',
        
        'property.calc.title': '💰 Investment Calculator',
        'property.calc.nfts': 'NFTs you\'ll own:',
        'property.calc.monthly': 'Monthly income:',
        'property.calc.annual': 'Annual return:',
        'property.calc.total': 'Total investment:',
        
        'property.wallet.connect': '🔗 Connect Wallet',
        'property.wallet.purchase': 'Purchase NFTs',
        'property.wallet.payment': '💳 Payment in ARSA Tokens or ETH',

        // Dashboard Translations - COMPLETE
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

        // Properties Page Translations - COMPLETE
        'properties.page.title': 'Investment Properties',
        'properties.page.subtitle': 'Discover premium real estate opportunities across Europe',
        'properties.page.stats.total': '24',
        'properties.page.stats.total.label': 'Total Properties',
        'properties.page.stats.available': '18',
        'properties.page.stats.available.label': 'Available Now',
        'properties.page.stats.value': '€45.2M',
        'properties.page.stats.value.label': 'Total Portfolio Value',
        'properties.page.stats.yield': '7.8%',
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

        // Property Types and Status
        'properties.type.office': 'Office',
        'properties.type.residential': 'Residential',
        'properties.type.retail': 'Retail',
        'properties.type.warehouse': 'Warehouse',
        'properties.type.hotel': 'Hotel',
        'properties.status.available': 'Available',
        'properties.status.selling': 'Selling Fast',
        'properties.status.sold': 'Sold Out',

        // Individual Properties
        'properties.berlin.office.title': 'Downtown Office Complex',
        'properties.berlin.office.location': '📍 Berlin, Germany',
        'properties.amsterdam.apartment.title': 'Luxury Apartment Complex',
        'properties.amsterdam.apartment.location': '📍 Amsterdam, Netherlands',
        'properties.vienna.retail.title': 'Retail Shopping Center',
        'properties.vienna.retail.location': '📍 Vienna, Austria',
        'properties.hamburg.warehouse.title': 'Logistics Warehouse Hub',
        'properties.hamburg.warehouse.location': '📍 Hamburg, Germany',
        'properties.munich.hotel.title': 'Business Hotel Munich',
        'properties.munich.hotel.location': '📍 Munich, Germany',
        'properties.frankfurt.office.title': 'Financial District Tower',
        'properties.frankfurt.office.location': '📍 Frankfurt, Germany',
        'properties.zurich.retail.title': 'Premium Shopping District',
        'properties.zurich.retail.location': '📍 Zurich, Switzerland',
        'properties.london.office.title': 'Canary Wharf Office Tower',
        'properties.london.office.location': '📍 London, United Kingdom',
        'properties.paris.apartment.title': 'Luxury Paris Residences',
        'properties.paris.apartment.location': '📍 Paris, France',

        // Property Stats
        'properties.stats.value': 'Total Value',
        'properties.stats.yield': 'Annual Yield',
        'properties.stats.available': 'Available',

        // Investment Summary
        'properties.summary.nft.price': 'NFT Price:',
        'properties.summary.monthly.income': 'Monthly Income/NFT:',
        'properties.summary.min.investment': 'Min. Investment:',
        'properties.summary.status': 'Status:',

        // Property Actions
        'properties.action.view': 'View Details',
        'properties.action.invest': 'Invest Now',
        'properties.action.sold': 'Sold Out',

        // Pagination
        'properties.pagination.previous': 'Previous',
        'properties.pagination.next': 'Next',
        
        // Home page properties section
        'properties.view.all': '🏢 View All Properties (24 Available)',
        'properties.view.all.subtitle': 'Explore our complete portfolio of premium real estate investments'
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
        'footer.follow': 'ARSA Token\'ı Takip Edin',
        
        // Admin Panel
        'admin.login.title': 'Yönetici Erişimi',
        'admin.login.subtitle': 'Güvenli alan - Yönetici kimlik bilgileri gerekli',
        'admin.login.username': 'Kullanıcı Adı',
        'admin.login.password': 'Şifre',
        'admin.login.button': 'Admin Paneline Giriş',
        'admin.login.back': '← Web Sitesine Geri Dön',
        'admin.logout': '🔒 Çıkış Yap',
        'admin.security.indicator': '🛡️ Güvenli Oturum Aktif',
        
        'admin.panel.title': '🎛️ Yönetici Paneli',
        'admin.panel.subtitle': 'Gayrimenkulleri, NFT\'leri ve platform operasyonlarını yönetin',
        
        'admin.property.add.title': '🏢 Yeni Gayrimenkul Ekle',
        'admin.property.add.name': 'Gayrimenkul Başlığı',
        'admin.property.add.location': 'Konum',
        'admin.property.add.value': 'Toplam Gayrimenkul Değeri (€)',
        'admin.property.add.yield': 'Yıllık Getiri (%)',
        'admin.property.add.nfts': 'NFT Sayısı',
        'admin.property.add.description': 'Gayrimenkul Açıklaması',
        'admin.property.add.button': 'Gayrimenkul Ekle',
        
        'admin.stats.title': '📊 Platform İstatistikleri',
        'admin.stats.properties': 'Toplam Gayrimenkul',
        'admin.stats.investors': 'Aktif Yatırımcılar',
        'admin.stats.tvl': 'Toplam Kilitli Değer',
        'admin.stats.nfts': 'Satılan NFT\'ler',
        'admin.stats.revenue': 'Aylık Gelir',
        
        'admin.rental.title': '💰 Kira Dağıtımı',
        'admin.rental.amount': 'Aylık Kira Tutarı (€)',
        'admin.rental.info.title': 'Dağıtım Bilgisi',
        'admin.rental.info.text': 'Kira geliri, sahiplik yüzdesine göre tüm NFT sahiplerine otomatik olarak orantılı şekilde dağıtılacaktır.',
        'admin.rental.button': 'Kira Dağıt',
        
        'admin.users.title': '👥 Kullanıcı Yönetimi',
        'admin.users.recent': 'Son İşlemler',
        'admin.users.rental.received': 'Kira Alındı',
        'admin.users.rental.monthly': 'Aylık dağıtım',
        
        'admin.nft.title': '🎨 NFT Yönetimi',
        'admin.nft.property': 'Gayrimenkul Seçimi',
        'admin.nft.price': 'NFT Fiyatı (€)',
        'admin.nft.available': 'Mevcut NFT\'ler',
        'admin.nft.pause': 'Satışları Durdur',
        'admin.nft.update': 'Fiyatlandırmayı Güncelle',
        
        'admin.settings.title': '⚙️ Sistem Ayarları',
        'admin.settings.fee': 'Platform Ücreti (%)',
        'admin.settings.minimum': 'Minimum Yatırım (€)',
        'admin.settings.token.price': 'ARSA Token Fiyatı (€)',
        'admin.settings.warning.title': '⚠️ Önemli',
        'admin.settings.warning.text': 'Sistem ayarlarındaki değişiklikler gelecekteki tüm işlemleri etkileyecektir. Kaydetmeden önce lütfen doğrulayın.',
        'admin.settings.save': 'Ayarları Kaydet',
        
        // Property Detail Page
        'property.back': '← Gayrimenkullere Geri Dön',
        'property.title': 'Şehir Merkezi Ofis Kompleksi',
        'property.location': '📍 Potsdamer Platz 1, Berlin, Almanya',
        'property.status.available': '🟢 Yatırım İçin Mevcut',
        'property.status.verified': '✅ Doğrulanmış Gayrimenkul',
        
        'property.gallery.title': 'Premium Ofis Binası',
        'property.gallery.subtitle': 'Berlin\'in finans bölgesinde modern çalışma alanı',
        
        'property.details.title': '📋 Gayrimenkul Bilgileri',
        'property.details.type': 'Gayrimenkul Türü',
        'property.details.type.value': 'Ticari Ofis Binası',
        'property.details.area': 'Toplam Alan',
        'property.details.floors': 'Kat Sayısı',
        'property.details.floors.value': '8 Kat + Yeraltı Otoparkı',
        'property.details.year': 'Yapım Yılı',
        'property.details.year.value': '2019 (Son Renovasyon 2023)',
        'property.details.occupancy': 'Doluluk Oranı',
        'property.details.occupancy.value': '%92 (Yüksek Talep Bölgesi)',
        'property.details.tenants': 'Mevcut Kiracılar',
        'property.details.tenants.value': '5 Şirket (Teknoloji, Finans, Hukuk)',
        'property.details.registry': 'Gayrimenkul Kaydı',
        
        'property.legal.title': '📄 Yasal Dökümanlar ve Doğrulama',
        'property.legal.deed.title': 'Gayrimenkul Tapu Senedi (Grundbuch)',
        'property.legal.deed.desc': 'Berlin Tapu Sicilinden resmi mülkiyet belgesi',
        'property.legal.permit.title': 'Yapı Ruhsatı ve Uygunluk',
        'property.legal.permit.desc': 'Geçerli yapı ruhsatları ve güvenlik sertifikaları',
        'property.legal.income.title': 'Kira Geliri Kayıtları',
        'property.legal.income.desc': 'Son 12 aylık kira geliri geçmişi',
        'property.legal.structure.title': 'Yasal Yapı ve NFT Hakları',
        'property.legal.structure.desc': 'NFT sahipliğinin gayrimenkul haklarına nasıl dönüştüğü',
        'property.legal.view': 'Görüntüle',
        
        'property.howto.title': '💡 Nasıl Çalışır (Basit Açıklama)',
        'property.howto.step1.title': '1. Gerçek Gayrimenkul:',
        'property.howto.step1.text': 'Bu, Berlin\'de yasal olarak sahip olduğumuz gerçek bir ofis binasıdır. Ziyaret edebilirsiniz, gerçek kira ödeyen kiracıları vardır.',
        'property.howto.step2.title': '2. 8.500 Parçaya Bölünmüş:',
        'property.howto.step2.text': 'Bu €850.000 değerindeki binayı 8.500 dijital parçaya (NFT) böldük. Her parça €100 maliyetinde.',
        'property.howto.step3.title': '3. Parça Satın Alırsınız:',
        'property.howto.step3.text': 'NFT satın aldığınızda, gerçek binanın o kısmına sahip olursunuz. Bir şirkette hisse sahibi olmak gibi, ama gayrimenkul için.',
        'property.howto.step4.title': '4. Kira Kazanırsınız:',
        'property.howto.step4.text': 'Her ay bina yaklaşık €51.200 kira kazanır. Bu parayı sahip olduğunuz parça sayısına göre tüm NFT sahipleri arasında paylaştırırız.',
        'property.howto.step5.title': '5. Haklarınız:',
        'property.howto.step5.text': 'Yasal sahiplik haklarınız, önemli kararlarda oy haklarınız ve NFT\'lerinizi istediğiniz zaman satabilme hakkınız vardır.',
        
        'property.investment.title': '🏗️ Yatırım Fırsatı',
        'property.nft.status': 'NFT Satış Durumu',
        'property.nft.sold': 'Satılan',
        'property.nft.available': 'Mevcut',
        'property.nft.progress': 'Fonlama İlerlemesi',
        'property.nft.complete': 'Tamamlandı',
        
        'property.trust.verified': 'Gayrimenkul Alman makamları tarafından doğrulandı',
        'property.trust.legal': 'Yasal sahiplik yapısı kuruldu',
        'property.trust.income': '12 aylık kira geliri kanıtlandı',
        'property.trust.audited': 'Akıllı sözleşme denetlendi ve güvenli',
        
        'property.stats.value': 'Toplam Gayrimenkul Değeri',
        'property.stats.price': 'NFT Başına Fiyat',
        'property.stats.rent': 'Aylık Kira (Toplam)',
        'property.stats.yield': 'Yıllık Getiri',
        'property.stats.monthly': 'NFT Başına Aylık Gelir',
        
        'property.calc.title': '💰 Yatırım Hesaplayıcısı',
        'property.calc.nfts': 'Sahip olacağınız NFT\'ler:',
        'property.calc.monthly': 'Aylık gelir:',
        'property.calc.annual': 'Yıllık getiri:',
        'property.calc.total': 'Toplam yatırım:',
        
        'property.wallet.connect': '🔗 Cüzdan Bağla',
        'property.wallet.purchase': 'NFT Satın Al',
        'property.wallet.payment': '💳 ARSA Token veya ETH ile ödeme',

        // Dashboard Translations
        'dashboard.title': 'Portföyüm',
        'dashboard.subtitle': 'Gayrimenkul NFT yatırımlarınızı ve kazançlarınızı takip edin',
        'dashboard.wallet.required.title': 'Cüzdan Bağlantısı Gerekli',
        'dashboard.wallet.required.text': 'Portföyünüzü görüntülemek ve gayrimenkul NFT yatırımlarınızı takip etmek için lütfen cüzdanınızı bağlayın.',
        'dashboard.wallet.connect': '🔗 Cüzdan Bağla',
        
        'dashboard.profile.welcome': 'Hoş geldiniz, Yatırımcı!',
        'dashboard.profile.member': 'Üye olma tarihi: Ocak 2025',
        'dashboard.profile.edit': '✏️ Profili Düzenle',
        'dashboard.profile.settings': '⚙️ Ayarlar',
        'dashboard.profile.export': '📊 Veri Dışa Aktar',
        
        'dashboard.summary.total.investment': 'Toplam Yatırım',
        'dashboard.summary.total.change': 'Bu ay +%12.5',
        'dashboard.summary.total.nfts': 'Toplam NFT Sayısı',
        'dashboard.summary.nfts.change': 'Bu ay +5 NFT',
        'dashboard.summary.monthly.income': 'Aylık Gelir',
        'dashboard.summary.income.change': 'Geçen aydan +€3.20',
        
        'dashboard.nft.portfolio.title': 'NFT Portföyüm',
        'dashboard.nft.berlin.office': 'Berlin Ofis Kompleksi',
        'dashboard.nft.amsterdam.apartment': 'Amsterdam Apartmanları',
        'dashboard.nft.hamburg.warehouse': 'Hamburg Depo',
        'dashboard.nft.investment': 'Yatırım',
        'dashboard.nft.monthly': 'Aylık',
        'dashboard.nft.view': 'Detayları Görüntüle',
        'dashboard.nft.sell': 'NFT Sat',
        
        'dashboard.income.history.title': 'Son Gelir Geçmişi',
        'dashboard.income.date': 'Tarih',
        'dashboard.income.property': 'Gayrimenkul',
        'dashboard.income.amount': 'Tutar',
        'dashboard.income.nfts': 'NFT\'ler',
        'dashboard.income.status': 'Durum',
        'dashboard.income.berlin.office': 'Berlin Ofis',
        'dashboard.income.amsterdam.apartment': 'Amsterdam Apartmanları',
        'dashboard.income.hamburg.warehouse': 'Hamburg Depo',
        'dashboard.income.all.properties': 'Tüm Gayrimenkuller',
        'dashboard.income.received': 'Alındı',
        'dashboard.income.pending': 'Beklemede',
        
        'dashboard.performance.title': 'Portföy Performansı',
        'dashboard.performance.placeholder': 'Portföy performans grafiği',
        'dashboard.performance.growth': 'Bu ay +%12.5 büyüme',
        
        'dashboard.actions.browse': 'Gayrimenkulleri İncele',
        'dashboard.actions.browse.desc': 'Yeni yatırım fırsatlarını keşfet',
        'dashboard.actions.withdraw': 'Kazanç Çek',
        'dashboard.actions.withdraw.desc': 'Geliri cüzdanınıza transfer edin',
        'dashboard.actions.stake': 'ARSA Token Stake Et',
        'dashboard.actions.stake.desc': 'Ek ödüller kazanın',
        'dashboard.actions.referral': 'Arkadaş Davet Et',
        'dashboard.actions.referral.desc': 'Bonus ödüller kazanın',

        // Properties Page Translations
        'properties.page.title': 'Yatırım Gayrimenkulleri',
        'properties.page.subtitle': 'Avrupa\'da premium gayrimenkul fırsatlarını keşfedin',
        'properties.page.stats.total': '24',
        'properties.page.stats.total.label': 'Toplam Gayrimenkul',
        'properties.page.stats.available': '18',
        'properties.page.stats.available.label': 'Şimdi Mevcut',
        'properties.page.stats.value': '€45.2M',
        'properties.page.stats.value.label': 'Toplam Portföy Değeri',
        'properties.page.stats.yield': '%7.8',
        'properties.page.stats.yield.label': 'Ortalama Getiri',

        // Search and Filters
        'properties.search.placeholder': 'Şehir, emlak adı veya türe göre arayın...',
        'properties.filter.location': 'Konum',
        'properties.filter.all.locations': 'Tüm Konumlar',
        'properties.filter.type': 'Gayrimenkul Türü',
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
        'properties.results.properties': 'gayrimenkul',
        'properties.sort.newest': 'En Yeni Önce',
        'properties.sort.price.low': 'Fiyat: Düşükten Yükseğe',
        'properties.sort.price.high': 'Fiyat: Yüksekten Düşüğe',
        'properties.sort.yield.high': 'En Yüksek Getiri',
        'properties.sort.yield.low': 'En Düşük Getiri',
        'properties.sort.name': 'İsim A-Z',

        // Property Types and Status
        'properties.type.office': 'Ofis',
        'properties.type.residential': 'Konut',
        'properties.type.retail': 'Ticari',
        'properties.type.warehouse': 'Depo',
        'properties.type.hotel': 'Otel',
        'properties.status.available': 'Mevcut',
        'properties.status.selling': 'Hızla Satıyor',
        'properties.status.sold': 'Tükendi',

        // Individual Properties
        'properties.berlin.office.title': 'Şehir Merkezi Ofis Kompleksi',
        'properties.berlin.office.location': '📍 Berlin, Almanya',
        'properties.amsterdam.apartment.title': 'Lüks Apartman Kompleksi',
        'properties.amsterdam.apartment.location': '📍 Amsterdam, Hollanda',
        'properties.vienna.retail.title': 'Ticari Alışveriş Merkezi',
        'properties.vienna.retail.location': '📍 Viyana, Avusturya',
        'properties.hamburg.warehouse.title': 'Lojistik Depo Merkezi',
        'properties.hamburg.warehouse.location': '📍 Hamburg, Almanya',
        'properties.munich.hotel.title': 'İş Oteli Münih',
        'properties.munich.hotel.location': '📍 Münih, Almanya',
        'properties.frankfurt.office.title': 'Finans Bölgesi Kulesi',
        'properties.frankfurt.office.location': '📍 Frankfurt, Almanya',
        'properties.zurich.retail.title': 'Premium Alışveriş Bölgesi',
        'properties.zurich.retail.location': '📍 Zürih, İsviçre',
        'properties.london.office.title': 'Canary Wharf Ofis Kulesi',
        'properties.london.office.location': '📍 Londra, İngiltere',
        'properties.paris.apartment.title': 'Lüks Paris Rezidansları',
        'properties.paris.apartment.location': '📍 Paris, Fransa',

        // Property Stats
        'properties.stats.value': 'Toplam Değer',
        'properties.stats.yield': 'Yıllık Getiri',
        'properties.stats.available': 'Mevcut',

        // Investment Summary
        'properties.summary.nft.price': 'NFT Fiyatı:',
        'properties.summary.monthly.income': 'Aylık Gelir/NFT:',
        'properties.summary.min.investment': 'Min. Yatırım:',
        'properties.summary.status': 'Durum:',

        // Property Actions
        'properties.action.view': 'Detayları Görüntüle',
        'properties.action.invest': 'Şimdi Yatırım Yap',
        'properties.action.sold': 'Tükendi',

        // Pagination
        'properties.pagination.previous': 'Önceki',
        'properties.pagination.next': 'Sonraki',
        
        // Home page properties section
        'properties.view.all': '🏢 Tüm Emlakları Gör (24 Mevcut)',
        'properties.view.all.subtitle': 'Premium gayrimenkul yatırımlarının tam portföyümüzü keşfedin'
    },
    
    ar: {
        // Navigation
        'nav.home': 'الرئيسية',
        'nav.properties': 'العقارات',
        'nav.dashboard': 'لوحة التحكم',
        'nav.admin': 'الإدارة',
        'nav.about': 'معلومات عنا',
        'nav.connect': 'ربط المحفظة'
        // ... rest of Arabic translations ...
    }
};

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

// Newsletter form - IMPROVED
function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            
            // Email validation
            if (typeof validateInput === 'function') {
                if (!validateInput({value: email}, 'email')) {
                    if (typeof showNotification === 'function') {
                        showNotification('Please enter a valid email address', 'error');
                    } else {
                        alert('Please enter a valid email address');
                    }
                    return;
                }
            }
            
            // Show loading state
            const submitBtn = this.querySelector('.newsletter-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                const successMessages = {
                    en: `Thank you for subscribing! You'll receive updates about new investment opportunities at ${email}`,
                    tr: `Abone olduğunuz için teşekkürler! ${email} adresine yeni yatırım fırsatları hakkında güncellemeler alacaksınız`,
                    ar: `شكراً لك على الاشتراك! ستتلقى تحديثات حول فرص الاستثمار الجديدة على ${email}`
                };
                
                const message = successMessages[currentLanguage] || successMessages.en;
                
                if (typeof showNotification === 'function') {
                    showNotification('Successfully subscribed to newsletter!', 'success');
                } else {
                    alert(message);
                }
                
                // Reset form
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Store subscription in local storage for demo
                if (typeof safeLocalStorage === 'function') {
                    const subscriptions = JSON.parse(safeLocalStorage('get', 'newsletter_subscriptions') || '[]');
                    subscriptions.push({
                        email: email,
                        date: new Date().toISOString(),
                        language: currentLanguage
                    });
                    safeLocalStorage('set', 'newsletter_subscriptions', JSON.stringify(subscriptions));
                }
            }, 2000);
        });
    }
}

// MAIN INITIALIZATION FUNCTION - IMPROVED (WITHOUT LOGO ADMIN ACCESS)
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

    // Setup newsletter form
    setupNewsletterForm();

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

// Web3 integration placeholders - IMPROVED
const Web3Integration = {
    // Arbitrum network configuration
    ARBITRUM_NETWORK: {
        chainId: '0xA4B1',
        chainName: 'Arbitrum One',
        rpcUrls: ['https://arb1.arbitrum.io/rpc'],
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18
        },
        blockExplorerUrls: ['https://arbiscan.io/']
    },

    // Contract addresses (placeholders)
    CONTRACTS: {
        ARSA_TOKEN: '0x0000000000000000000000000000000000000000',
        NFT_PROPERTY: '0x0000000000000000000000000000000000000000',
        RENTAL_DISTRIBUTOR: '0x0000000000000000000000000000000000000000'
    },

    // Connect to MetaMask - IMPROVED
    async connectMetaMask() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });
                
                if (accounts.length > 0) {
                    safeLocalStorage('set', 'wallet_connected', 'true');
                    safeLocalStorage('set', 'wallet_address', accounts[0]);
                    return accounts[0];
                }
                return null;
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
                
                const errorMessages = {
                    en: 'Failed to connect wallet. Please try again.',
                    tr: 'Cüzdan bağlantısı başarısız. Lütfen tekrar deneyin.',
                    ar: 'فشل في ربط المحفظة. يرجى المحاولة مرة أخرى.'
                };
                
                showNotification(errorMessages[currentLanguage] || errorMessages.en, 'error');
                return null;
            }
        } else {
            const installMessages = {
                en: 'Please install MetaMask to connect your wallet!',
                tr: 'Cüzdanınızı bağlamak için lütfen MetaMask yükleyin!',
                ar: 'يرجى تثبيت MetaMask لربط محفظتك!'
            };
            
            showNotification(installMessages[currentLanguage] || installMessages.en, 'error');
            
            // Redirect to MetaMask website
            setTimeout(() => {
                window.open('https://metamask.io/', '_blank');
            }, 2000);
            
            return null;
        }
    },

    // Switch to Arbitrum network
    async switchToArbitrum() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: this.ARBITRUM_NETWORK.chainId }],
            });
            return true;
        } catch (switchError) {
            // Network not added to MetaMask
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [this.ARBITRUM_NETWORK],
                    });
                    return true;
                } catch (addError) {
                    console.error('Error adding Arbitrum network:', addError);
                    return false;
                }
            }
            console.error('Error switching to Arbitrum:', switchError);
            return false;
        }
    },

    // Buy NFT function (placeholder)
    async buyNFT(propertyId, nftCount) {
        console.log(`Buying ${nftCount} NFTs for property ${propertyId}`);
        // Will implement actual smart contract interaction
        
        const simulatedTx = {
            hash: '0x' + Math.random().toString(16).substr(2, 64),
            propertyId,
            nftCount,
            timestamp: Date.now()
        };
        
        // Store transaction in local storage for demo
        const transactions = JSON.parse(safeLocalStorage('get', 'transactions') || '[]');
        transactions.push(simulatedTx);
        safeLocalStorage('set', 'transactions', JSON.stringify(transactions));
        
        return simulatedTx;
    },

    // Check ARSA token balance
    async getARSABalance(address) {
        console.log(`Getting ARSA balance for ${address}`);
        // Will implement actual token balance check
        return Math.floor(Math.random() * 10000) + 1000; // Placeholder random balance
    },

    // Get transaction history
    getTransactionHistory() {
        return JSON.parse(safeLocalStorage('get', 'transactions') || '[]');
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        translations,
        translatePage,
        connectWallet,
        Web3Integration,
        safeLocalStorage,
        validateInput,
        showNotification,
        formatCurrency,
        formatDate
    };
}