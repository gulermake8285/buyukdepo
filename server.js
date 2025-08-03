const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5500', 'http://127.0.0.1:5500'],
    credentials: true
}));
app.use(express.json());
app.use(express.static('.'));

// Users veritabanı (JSON dosyası) işlemleri
class UserDatabase {
    static async loadUsers() {
        try {
            const data = await fs.readFile(USERS_FILE, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // Dosya yoksa boş array döndür
                return [];
            }
            throw error;
        }
    }

    static async saveUsers(users) {
        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
    }

    static async findUserByEmail(email) {
        const users = await this.loadUsers();
        return users.find(user => user.email.toLowerCase() === email.toLowerCase());
    }

    static async createUser(userData) {
        const users = await this.loadUsers();
        
        // Kullanıcı ID'si oluştur
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        
        const newUser = {
            id: newId,
            email: userData.email.toLowerCase(),
            password: userData.password,
            role: userData.role || 'user',
            createdAt: new Date().toISOString(),
            lastLogin: null
        };

        users.push(newUser);
        await this.saveUsers(users);
        
        // Şifreyi response'dan çıkar
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    static async updateLastLogin(userId) {
        const users = await this.loadUsers();
        const userIndex = users.findIndex(user => user.id === userId);
        
        if (userIndex !== -1) {
            users[userIndex].lastLogin = new Date().toISOString();
            await this.saveUsers(users);
        }
    }
}

// API Routes

// POST /register - Kullanıcı kaydı
app.post('/register', async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        // Validasyon
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Tüm alanlar gereklidir'
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Şifreler eşleşmiyor'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Şifre en az 6 karakter olmalıdır'
            });
        }

        // Email format kontrolü
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Geçerli bir e-posta adresi giriniz'
            });
        }

        // Kullanıcı zaten var mı kontrol et
        const existingUser = await UserDatabase.findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Bu e-posta adresi zaten kayıtlı'
            });
        }

        // Şifreyi hash'le
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Kullanıcıyı oluştur
        const newUser = await UserDatabase.createUser({
            email,
            password: hashedPassword
        });

        console.log(`✅ Yeni kullanıcı kaydedildi: ${email}`);

        res.status(201).json({
            success: true,
            message: 'Kullanıcı başarıyla kaydedildi',
            user: newUser
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Sunucu hatası'
        });
    }
});

// POST /login - Kullanıcı girişi
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validasyon
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'E-posta ve şifre gereklidir'
            });
        }

        // Kullanıcıyı bul
        const user = await UserDatabase.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Geçersiz e-posta veya şifre'
            });
        }

        // Şifreyi kontrol et
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Geçersiz e-posta veya şifre'
            });
        }

        // Son giriş zamanını güncelle
        await UserDatabase.updateLastLogin(user.id);

        console.log(`✅ Kullanıcı giriş yaptı: ${email}`);

        // Şifreyi response'dan çıkar
        const { password: userPassword, ...userWithoutPassword } = user;

        res.json({
            success: true,
            message: 'Giriş başarılı',
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Sunucu hatası'
        });
    }
});

// GET /profile - Kullanıcı profili (opsiyonel)
app.get('/profile/:userId', async (req, res) => {
    try {
        const users = await UserDatabase.loadUsers();
        const user = users.find(u => u.id === parseInt(req.params.userId));
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Kullanıcı bulunamadı'
            });
        }

        const { password, ...userWithoutPassword } = user;
        res.json({
            success: true,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Sunucu hatası'
        });
    }
});

// GET /users - Tüm kullanıcıları listele (admin için)
app.get('/users', async (req, res) => {
    try {
        const users = await UserDatabase.loadUsers();
        const usersWithoutPasswords = users.map(({ password, ...user }) => user);
        
        res.json({
            success: true,
            users: usersWithoutPasswords,
            count: users.length
        });

    } catch (error) {
        console.error('Users list error:', error);
        res.status(500).json({
            success: false,
            message: 'Sunucu hatası'
        });
    }
});

// İlk admin kullanıcısını oluştur
async function createDefaultAdmin() {
    try {
        const users = await UserDatabase.loadUsers();
        const adminExists = users.some(user => user.role === 'admin');
        
        if (!adminExists) {
            const defaultAdminPassword = await bcrypt.hash('admin123', 12);
            const adminUser = {
                id: 1,
                email: 'admin@arsa.token',
                password: defaultAdminPassword,
                role: 'admin',
                createdAt: new Date().toISOString(),
                lastLogin: null
            };
            
            users.push(adminUser);
            await UserDatabase.saveUsers(users);
            console.log('🔐 Default admin created: admin@arsa.token / admin123');
        }
    } catch (error) {
        console.error('Error creating default admin:', error);
    }
}

// Server başlatma
app.listen(PORT, async () => {
    console.log('🚀 ARSA Token Backend Server Started');
    console.log(`📡 Server running on http://localhost:${PORT}`);
    console.log('🔧 CORS enabled for frontend integration');
    
    // Default admin oluştur
    await createDefaultAdmin();
    
    console.log('✅ Backend ready for login/register requests');
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Server shutting down gracefully...');
    process.exit(0);
});

module.exports = app;