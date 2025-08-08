// ARSA Token - Güvenli ve Modern JavaScript Çözümleri
// Bu dosya mevcut projenizdeki güvenlik açıklarını düzeltir

// 1. Güvenli State Management Sistemi
class SecureStateManager {
    constructor() {
        this.state = new Proxy({}, {
            set: (target, property, value) => {
                // Input sanitization
                if (typeof value === 'string') {
                    value = this.sanitizeInput(value);
                }
                target[property] = value;
                this.notifySubscribers(property, value);
                return true;
            }
        });
        this.subscribers = new Map();
        this.history = [];
    }

    sanitizeInput(input) {
        // XSS prevention
        return input
            .replace(/[<>\"']/g, (match) => {
                const entities = {
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#x27;'
                };
                return entities[match];
            });
    }

    setState(updates) {
        // Track changes for audit
        this.history.push({
            timestamp: Date.now(),
            changes: updates,
            user: this.getCurrentUser()
        });

        Object.assign(this.state, updates);
    }

    subscribe(key, callback) {
        if (!this.subscribers.has(key)) {
            this.subscribers.set(key, new Set());
        }
        this.subscribers.get(key).add(callback);
    }

    notifySubscribers(key, value) {
        if (this.subscribers.has(key)) {
            this.subscribers.get(key).forEach(callback => {
                try {
                    callback(value);
                } catch (error) {
                    console.error('Subscriber error:', error);
                }
            });
        }
    }

    getCurrentUser() {
        return this.state.currentUser || 'anonymous';
    }
}

// 2. Güvenli Authentication System
class SecureAuthManager {
    constructor() {
        this.sessionTimeout = 30 * 60 * 1000; // 30 minutes
        this.maxLoginAttempts = 5;
        this.loginAttempts = new Map();
        this.initCSRFProtection();
    }

    initCSRFProtection() {
        // Generate CSRF token
        this.csrfToken = this.generateSecureToken();
        
        // Add token to all forms
        document.addEventListener('DOMContentLoaded', () => {
            this.addCSRFTokens();
        });
    }

    generateSecureToken() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    addCSRFTokens() {
        document.querySelectorAll('form').forEach(form => {
            if (!form.querySelector('input[name="csrf_token"]')) {
                const csrfInput = document.createElement('input');
                csrfInput.type = 'hidden';
                csrfInput.name = 'csrf_token';
                csrfInput.value = this.csrfToken;
                form.appendChild(csrfInput);
            }
        });
    }

    async authenticateUser(username, password, csrfToken) {
        // CSRF token validation
        if (csrfToken !== this.csrfToken) {
            throw new Error('CSRF token mismatch');
        }

        // Rate limiting check
        if (this.isRateLimited(username)) {
            throw new Error('Too many login attempts. Please wait.');
        }

        // Hash password (in production, use bcrypt or similar)
        const hashedPassword = await this.hashPassword(password);
        
        try {
            // Simulate secure API call
            const response = await this.secureAPICall('/auth/login', {
                username: this.sanitizeInput(username),
                password: hashedPassword,
                timestamp: Date.now()
            });

            if (response.success) {
                this.clearLoginAttempts(username);
                this.createSecureSession(response.user, response.token);
                return response.user;
            } else {
                this.recordFailedAttempt(username);
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            this.recordFailedAttempt(username);
            throw error;
        }
    }

    isRateLimited(username) {
        const attempts = this.loginAttempts.get(username);
        if (!attempts) return false;
        
        return attempts.count >= this.maxLoginAttempts && 
               Date.now() - attempts.lastAttempt < 15 * 60 * 1000; // 15 min lockout
    }

    recordFailedAttempt(username) {
        const current = this.loginAttempts.get(username) || { count: 0, lastAttempt: 0 };
        this.loginAttempts.set(username, {
            count: current.count + 1,
            lastAttempt: Date.now()
        });
    }

    clearLoginAttempts(username) {
        this.loginAttempts.delete(username);
    }

    async hashPassword(password) {
        // Use Web Crypto API for secure hashing
        const encoder = new TextEncoder();
        const data = encoder.encode(password + this.getSalt());
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    getSalt() {
        // In production, this should be environment-specific
        return 'arsa_salt_2025_secure';
    }

    createSecureSession(user, token) {
        const sessionData = {
            user,
            token,
            timestamp: Date.now(),
            expires: Date.now() + this.sessionTimeout,
            fingerprint: this.generateFingerprint()
        };

        // Use encrypted session storage
        this.encryptAndStore('adminSession', sessionData);
        
        // Set auto-logout timer
        this.scheduleSessionExpiry();
    }

    generateFingerprint() {
        // Browser fingerprinting for additional security
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('ARSA Security Check', 2, 2);
        
        return canvas.toDataURL().slice(-20) + 
               navigator.userAgent.slice(-20) + 
               screen.width + 'x' + screen.height;
    }

    sanitizeInput(input) {
        return input.replace(/[<>\"'&]/g, '');
    }

    async secureAPICall(endpoint, data) {
        // Simulate secure API with proper headers
        const headers = {
            'Content-Type': 'application/json',
            'X-CSRF-Token': this.csrfToken,
            'X-Requested-With': 'XMLHttpRequest'
        };

        // In production, this would be actual API call
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate authentication logic
                const validUsers = [
                    { username: 'admin', passwordHash: 'expected_hash_admin', role: 'superadmin' },
                    { username: 'manager', passwordHash: 'expected_hash_manager', role: 'manager' }
                ];

                const user = validUsers.find(u => u.username === data.username);
                if (user) {
                    resolve({
                        success: true,
                        user: { username: user.username, role: user.role },
                        token: this.generateSecureToken()
                    });
                } else {
                    resolve({ success: false });
                }
            }, 1000);
        });
    }

    encryptAndStore(key, data) {
        // Simple encryption for demo (use proper encryption in production)
        const encrypted = btoa(JSON.stringify(data));
        sessionStorage.setItem(key, encrypted);
    }

    decryptAndRetrieve(key) {
        try {
            const encrypted = sessionStorage.getItem(key);
            if (encrypted) {
                return JSON.parse(atob(encrypted));
            }
        } catch (error) {
            console.error('Decryption error:', error);
            this.clearSession();
        }
        return null;
    }

    scheduleSessionExpiry() {
        setTimeout(() => {
            this.handleSessionExpiry();
        }, this.sessionTimeout);
    }

    handleSessionExpiry() {
        this.clearSession();
        this.redirectToLogin();
        this.showNotification('Session expired. Please login again.', 'warning');
    }

    clearSession() {
        sessionStorage.removeItem('adminSession');
        this.csrfToken = this.generateSecureToken();
    }

    redirectToLogin() {
        if (window.adminPanel) {
            window.adminPanel.showAuthScreen();
        }
    }

    showNotification(message, type) {
        if (window.adminPanel) {
            window.adminPanel.showAlert(message, type);
        }
    }
}

// 3. Güvenli Form Validation System
class SecureFormValidator {
    constructor() {
        this.rules = new Map();
        this.sanitizers = new Map();
        this.initializeDefaultRules();
    }

    initializeDefaultRules() {
        this.addRule('required', (value) => {
            return value !== null && value !== undefined && value.toString().trim() !== '';
        });

        this.addRule('email', (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        });

        this.addRule('minLength', (value, length) => {
            return value.length >= length;
        });

        this.addRule('maxLength', (value, length) => {
            return value.length <= length;
        });

        this.addRule('alphanumeric', (value) => {
            return /^[a-zA-Z0-9]+$/.test(value);
        });

        this.addRule('numeric', (value) => {
            return !isNaN(value) && !isNaN(parseFloat(value));
        });

        this.addRule('positiveNumber', (value) => {
            return this.rules.get('numeric')(value) && parseFloat(value) > 0;
        });

        // Sanitizers
        this.addSanitizer('trim', (value) => value.trim());
        this.addSanitizer('lowercase', (value) => value.toLowerCase());
        this.addSanitizer('removeHTML', (value) => {
            const div = document.createElement('div');
            div.textContent = value;
            return div.innerHTML;
        });
    }

    addRule(name, validator) {
        this.rules.set(name, validator);
    }

    addSanitizer(name, sanitizer) {
        this.sanitizers.set(name, sanitizer);
    }

    sanitize(value, sanitizers = ['trim', 'removeHTML']) {
        let result = value;
        sanitizers.forEach(sanitizerName => {
            const sanitizer = this.sanitizers.get(sanitizerName);
            if (sanitizer) {
                result = sanitizer(result);
            }
        });
        return result;
    }

    validate(value, validationRules) {
        const errors = [];
        
        for (const [ruleName, ruleParams] of Object.entries(validationRules)) {
            const rule = this.rules.get(ruleName);
            if (rule) {
                const isValid = Array.isArray(ruleParams) 
                    ? rule(value, ...ruleParams)
                    : rule(value, ruleParams);
                
                if (!isValid) {
                    errors.push(this.getErrorMessage(ruleName, ruleParams));
                }
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }

    getErrorMessage(ruleName, params) {
        const messages = {
            required: 'Bu alan zorunludur',
            email: 'Geçerli bir email adresi giriniz',
            minLength: `En az ${params} karakter olmalıdır`,
            maxLength: `En fazla ${params} karakter olabilir`,
            alphanumeric: 'Sadece harf ve rakam kullanabilirsiniz',
            numeric: 'Sadece sayı girebilirsiniz',
            positiveNumber: 'Pozitif bir sayı giriniz'
        };
        
        return messages[ruleName] || 'Geçersiz değer';
    }

    validateForm(formElement) {
        const results = new Map();
        const inputs = formElement.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            const rules = this.parseValidationAttributes(input);
            if (Object.keys(rules).length > 0) {
                const sanitizedValue = this.sanitize(input.value);
                const validation = this.validate(sanitizedValue, rules);
                results.set(input.name || input.id, validation);
                
                // Update UI
                this.updateFieldValidationUI(input, validation);
            }
        });
        
        return results;
    }

    parseValidationAttributes(input) {
        const rules = {};
        
        if (input.hasAttribute('required')) {
            rules.required = true;
        }
        
        if (input.type === 'email') {
            rules.email = true;
        }
        
        if (input.hasAttribute('minlength')) {
            rules.minLength = parseInt(input.getAttribute('minlength'));
        }
        
        if (input.hasAttribute('maxlength')) {
            rules.maxLength = parseInt(input.getAttribute('maxlength'));
        }
        
        if (input.type === 'number') {
            rules.numeric = true;
            if (input.hasAttribute('min') && parseFloat(input.getAttribute('min')) >= 0) {
                rules.positiveNumber = true;
            }
        }
        
        return rules;
    }

    updateFieldValidationUI(input, validation) {
        const errorElement = document.getElementById(`${input.id}-error`) || 
                           document.querySelector(`[data-error-for="${input.id}"]`);
        
        if (validation.isValid) {
            input.classList.remove('invalid');
            input.classList.add('valid');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
            if (errorElement) {
                errorElement.textContent = validation.errors[0];
                errorElement.style.display = 'block';
            }
        }
    }
}

// 4. Güvenli Event Handler System
class SecureEventManager {
    constructor() {
        this.handlers = new Map();
        this.rateLimits = new Map();
        this.eventHistory = [];
    }

    addEventListener(element, event, handler, options = {}) {
        const {
            rateLimit = null,
            sanitize = true,
            validate = null,
            once = false
        } = options;

        const wrappedHandler = (e) => {
            try {
                // Rate limiting
                if (rateLimit && this.isRateLimited(handler, rateLimit)) {
                    e.preventDefault();
                    return;
                }

                // Input sanitization for form events
                if (sanitize && (e.type === 'submit' || e.type === 'input')) {
                    this.sanitizeEvent(e);
                }

                // Validation
                if (validate && !validate(e)) {
                    e.preventDefault();
                    return;
                }

                // Log event for audit
                this.logEvent(e, handler.name);

                // Execute handler
                handler(e);

                // Remove if once
                if (once) {
                    this.removeEventListener(element, event, handler);
                }

            } catch (error) {
                console.error('Event handler error:', error);
                this.handleEventError(error, e);
            }
        };

        element.addEventListener(event, wrappedHandler);
        
        // Store reference for cleanup
        const key = this.generateHandlerKey(element, event, handler);
        this.handlers.set(key, wrappedHandler);
    }

    removeEventListener(element, event, handler) {
        const key = this.generateHandlerKey(element, event, handler);
        const wrappedHandler = this.handlers.get(key);
        
        if (wrappedHandler) {
            element.removeEventListener(event, wrappedHandler);
            this.handlers.delete(key);
        }
    }

    isRateLimited(handler, limit) {
        const key = handler.toString();
        const now = Date.now();
        const lastCall = this.rateLimits.get(key);
        
        if (!lastCall || now - lastCall >= limit) {
            this.rateLimits.set(key, now);
            return false;
        }
        
        return true;
    }

    sanitizeEvent(event) {
        if (event.target && event.target.tagName === 'INPUT') {
            const input = event.target;
            if (input.type === 'text' || input.type === 'email') {
                input.value = this.sanitizeString(input.value);
            }
        }
    }

    sanitizeString(str) {
        return str.replace(/[<>\"'&]/g, (match) => {
            const entities = {
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;',
                '&': '&amp;'
            };
            return entities[match];
        });
    }

    logEvent(event, handlerName) {
        this.eventHistory.push({
            timestamp: Date.now(),
            type: event.type,
            target: event.target?.tagName,
            handler: handlerName,
            user: this.getCurrentUser()
        });

        // Keep only last 100 events
        if (this.eventHistory.length > 100) {
            this.eventHistory.shift();
        }
    }

    handleEventError(error, event) {
        // Log error securely
        console.error('Secure event error:', {
            error: error.message,
            event: event.type,
            timestamp: Date.now()
        });

        // Show user-friendly message
        if (window.adminPanel) {
            window.adminPanel.showAlert('İşlem sırasında bir hata oluştu', 'error');
        }
    }

    getCurrentUser() {
        return window.stateManager?.state?.currentUser?.username || 'anonymous';
    }

    generateHandlerKey(element, event, handler) {
        return `${element.tagName}-${event}-${handler.name}-${Math.random()}`;
    }

    cleanup() {
        // Clean up all event listeners
        this.handlers.clear();
        this.rateLimits.clear();
        this.eventHistory = [];
    }
}

// 5. Content Security Policy Helper
class CSPManager {
    constructor() {
        this.nonces = new Set();
        this.initCSP();
    }

    initCSP() {
        // Add CSP meta tag if not present
        if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
            const cspMeta = document.createElement('meta');
            cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
            cspMeta.setAttribute('content', this.generateCSPDirective());
            document.head.appendChild(cspMeta);
        }
    }

    generateCSPDirective() {
        return [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline'", // In production, use nonces
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "font-src 'self'",
            "connect-src 'self'",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'"
        ].join('; ');
    }

    generateNonce() {
        const array = new Uint8Array(16);
        crypto.getRandomValues(array);
        const nonce = btoa(String.fromCharCode(...array));
        this.nonces.add(nonce);
        return nonce;
    }

    addScriptWithNonce(scriptContent) {
        const nonce = this.generateNonce();
        const script = document.createElement('script');
        script.nonce = nonce;
        script.textContent = scriptContent;
        document.head.appendChild(script);
        return nonce;
    }
}

// 6. Advanced Error Handling and Logging
class SecureErrorHandler {
    constructor() {
        this.errorQueue = [];
        this.maxErrors = 50;
        this.sensitivePatterns = [
            /password/i,
            /token/i,
            /secret/i,
            /key/i,
            /auth/i
        ];
        this.initErrorHandling();
    }

    initErrorHandling() {
        // Global error handling
        window.addEventListener('error', (event) => {
            this.handleError(event.error, 'Global Error');
        });

        // Promise rejection handling
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason, 'Unhandled Promise Rejection');
        });

        // Performance monitoring
        if ('PerformanceObserver' in window) {
            this.initPerformanceMonitoring();
        }
    }

    handleError(error, context = 'Unknown') {
        const errorInfo = {
            timestamp: Date.now(),
            message: this.sanitizeErrorMessage(error.message || error.toString()),
            stack: this.sanitizeStack(error.stack),
            context,
            url: window.location.href,
            userAgent: navigator.userAgent,
            user: this.getCurrentUser()
        };

        // Add to error queue
        this.errorQueue.push(errorInfo);
        
        // Maintain queue size
        if (this.errorQueue.length > this.maxErrors) {
            this.errorQueue.shift();
        }

        // Log to console (sanitized)
        console.error(`[${context}]`, errorInfo.message);

        // Send to monitoring service (in production)
        this.sendToMonitoring(errorInfo);

        // Show user notification if critical
        if (this.isCriticalError(error)) {
            this.showUserNotification();
        }
    }

    sanitizeErrorMessage(message) {
        let sanitized = message;
        
        // Remove sensitive information
        this.sensitivePatterns.forEach(pattern => {
            sanitized = sanitized.replace(pattern, '[REDACTED]');
        });

        // Remove potential XSS
        sanitized = sanitized.replace(/[<>\"']/g, '');
        
        return sanitized;
    }

    sanitizeStack(stack) {
        if (!stack) return '';
        
        // Remove sensitive paths and information
        return stack
            .split('\n')
            .map(line => line.replace(/file:\/\/.*?\/([^\/]+)$/, 'file://[REDACTED]/$1'))
            .join('\n');
    }

    isCriticalError(error) {
        const criticalPatterns = [
            /network/i,
            /fetch/i,
            /authentication/i,
            /authorization/i
        ];
        
        return criticalPatterns.some(pattern => 
            pattern.test(error.message || error.toString())
        );
    }

    showUserNotification() {
        if (window.adminPanel) {
            window.adminPanel.showAlert(
                'Bir sistem hatası oluştu. Lütfen sayfayı yenileyin.',
                'error'
            );
        }
    }

    sendToMonitoring(errorInfo) {
        // In production, send to error monitoring service
        // Example: Sentry, LogRocket, or custom endpoint
        console.log('Error logged for monitoring:', errorInfo);
    }

    getCurrentUser() {
        return window.stateManager?.state?.currentUser?.username || 'anonymous';
    }

    initPerformanceMonitoring() {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 1000) { // Slow operations > 1s
                    this.handleError(
                        new Error(`Slow operation: ${entry.name} took ${entry.duration}ms`),
                        'Performance'
                    );
                }
            }
        });

        observer.observe({ entryTypes: ['measure', 'navigation'] });
    }

    getErrorReport() {
        return {
            totalErrors: this.errorQueue.length,
            recentErrors: this.errorQueue.slice(-10),
            errorsByContext: this.groupErrorsByContext(),
            timestamp: Date.now()
        };
    }

    groupErrorsByContext() {
        const grouped = {};
        this.errorQueue.forEach(error => {
            if (!grouped[error.context]) {
                grouped[error.context] = 0;
            }
            grouped[error.context]++;
        });
        return grouped;
    }
}

// 7. Secure API Client
class SecureAPIClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.requestQueue = [];
        this.isOnline = navigator.onLine;
        this.retryAttempts = 3;
        this.timeout = 30000;
        this.initNetworkMonitoring();
    }

    initNetworkMonitoring() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.processQueue();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }

    async request(endpoint, options = {}) {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            timeout: this.timeout,
            ...options
        };

        // Add authentication token
        const token = this.getAuthToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // Add CSRF token
        const csrfToken = this.getCSRFToken();
        if (csrfToken) {
            config.headers['X-CSRF-Token'] = csrfToken;
        }

        // Queue request if offline
        if (!this.isOnline) {
            return this.queueRequest(endpoint, config);
        }

        return this.executeRequest(endpoint, config);
    }

    async executeRequest(endpoint, config, attempt = 1) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), config.timeout);

            const response = await fetch(`${this.baseURL}${endpoint}`, {
                ...config,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            // Validate response headers for security
            this.validateResponseHeaders(response);

            const data = await response.json();
            return this.sanitizeResponse(data);

        } catch (error) {
            if (attempt < this.retryAttempts && this.shouldRetry(error)) {
                await this.delay(Math.pow(2, attempt) * 1000); // Exponential backoff
                return this.executeRequest(endpoint, config, attempt + 1);
            }
            throw error;
        }
    }

    validateResponseHeaders(response) {
        const securityHeaders = [
            'X-Content-Type-Options',
            'X-Frame-Options',
            'X-XSS-Protection'
        ];

        securityHeaders.forEach(header => {
            if (!response.headers.get(header)) {
                console.warn(`Missing security header: ${header}`);
            }
        });
    }

    sanitizeResponse(data) {
        // Recursively sanitize response data
        if (typeof data === 'string') {
            return this.sanitizeString(data);
        }
        
        if (Array.isArray(data)) {
            return data.map(item => this.sanitizeResponse(item));
        }
        
        if (data && typeof data === 'object') {
            const sanitized = {};
            Object.keys(data).forEach(key => {
                sanitized[key] = this.sanitizeResponse(data[key]);
            });
            return sanitized;
        }
        
        return data;
    }

    sanitizeString(str) {
        return str.replace(/[<>\"'&]/g, (match) => {
            const entities = {
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;',
                '&': '&amp;'
            };
            return entities[match];
        });
    }

    shouldRetry(error) {
        // Retry on network errors, not on 4xx errors
        return error.name === 'TypeError' || 
               error.message.includes('fetch') ||
               error.message.includes('network');
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    queueRequest(endpoint, config) {
        return new Promise((resolve, reject) => {
            this.requestQueue.push({
                endpoint,
                config,
                resolve,
                reject,
                timestamp: Date.now()
            });
        });
    }

    async processQueue() {
        while (this.requestQueue.length > 0) {
            const request = this.requestQueue.shift();
            
            // Check if request is still valid (not too old)
            if (Date.now() - request.timestamp < 5 * 60 * 1000) { // 5 minutes
                try {
                    const result = await this.executeRequest(request.endpoint, request.config);
                    request.resolve(result);
                } catch (error) {
                    request.reject(error);
                }
            } else {
                request.reject(new Error('Request expired'));
            }
        }
    }

    getAuthToken() {
        // Get token from secure session
        if (window.authManager) {
            const session = window.authManager.decryptAndRetrieve('adminSession');
            return session?.token;
        }
        return null;
    }

    getCSRFToken() {
        // Get CSRF token
        if (window.authManager) {
            return window.authManager.csrfToken;
        }
        return null;
    }
}

// 8. Initialization with Security Features
class SecureAppInitializer {
    constructor() {
        this.isInitialized = false;
        this.securityModules = new Map();
    }

    async initialize() {
        if (this.isInitialized) {
            console.warn('App already initialized');
            return;
        }

        try {
            // Initialize security modules
            await this.initSecurityModules();
            
            // Setup global instances
            this.setupGlobalInstances();
            
            // Initialize the admin panel with security
            await this.initSecureAdminPanel();
            
            // Setup monitoring
            this.setupMonitoring();
            
            this.isInitialized = true;
            console.log('🔒 Secure ARSA Token Admin Panel initialized');
            
        } catch (error) {
            console.error('Initialization failed:', error);
            this.handleInitializationError(error);
        }
    }

    async initSecurityModules() {
        // State Manager
        window.stateManager = new SecureStateManager();
        this.securityModules.set('stateManager', window.stateManager);

        // Auth Manager
        window.authManager = new SecureAuthManager();
        this.securityModules.set('authManager', window.authManager);

        // Form Validator
        window.formValidator = new SecureFormValidator();
        this.securityModules.set('formValidator', window.formValidator);

        // Event Manager
        window.eventManager = new SecureEventManager();
        this.securityModules.set('eventManager', window.eventManager);

        // CSP Manager
        window.cspManager = new CSPManager();
        this.securityModules.set('cspManager', window.cspManager);

        // Error Handler
        window.errorHandler = new SecureErrorHandler();
        this.securityModules.set('errorHandler', window.errorHandler);

        // API Client
        window.apiClient = new SecureAPIClient('/api');
        this.securityModules.set('apiClient', window.apiClient);
    }

    setupGlobalInstances() {
        // Make security modules available globally for the admin panel
        window.ARSA_SECURITY = {
            stateManager: window.stateManager,
            authManager: window.authManager,
            formValidator: window.formValidator,
            eventManager: window.eventManager,
            errorHandler: window.errorHandler,
            apiClient: window.apiClient
        };
    }

    async initSecureAdminPanel() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            await new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', resolve);
            });
        }

        // Initialize admin panel with security integration
        if (window.ModernAdminPanel) {
            window.adminPanel = new window.ModernAdminPanel();
            
            // Integrate security features
            this.integrateSecurity();
        }
    }

    integrateSecurity() {
        // Replace form submissions with secure validation
        document.querySelectorAll('form').forEach(form => {
            window.eventManager.addEventListener(form, 'submit', (e) => {
                e.preventDefault();
                const validation = window.formValidator.validateForm(form);
                
                let isValid = true;
                for (const [field, result] of validation) {
                    if (!result.isValid) {
                        isValid = false;
                        break;
                    }
                }
                
                if (isValid) {
                    // Process form securely
                    this.processSecureForm(form);
                } else {
                    window.adminPanel.showAlert('Lütfen form hatalarını düzeltin', 'error');
                }
            }, { 
                rateLimit: 1000, // 1 second rate limit
                sanitize: true 
            });
        });

        // Secure all buttons with rate limiting
        document.querySelectorAll('button').forEach(button => {
            if (button.type !== 'submit') {
                const originalHandler = button.onclick;
                if (originalHandler) {
                    button.onclick = null;
                    window.eventManager.addEventListener(button, 'click', originalHandler, {
                        rateLimit: 500 // 500ms rate limit
                    });
                }
            }
        });
    }

    processSecureForm(form) {
        const formData = new FormData(form);
        const data = {};
        
        // Sanitize form data
        for (const [key, value] of formData.entries()) {
            data[key] = window.formValidator.sanitize(value);
        }

        // Process based on form type
        if (form.id === 'loginForm') {
            this.handleSecureLogin(data);
        } else if (form.id === 'addPropertyForm') {
            this.handleSecurePropertyAdd(data);
        }
    }

    async handleSecureLogin(data) {
        try {
            const user = await window.authManager.authenticateUser(
                data.username,
                data.password,
                data.csrf_token
            );
            
            window.stateManager.setState({ currentUser: user });
            window.adminPanel.showDashboard();
            
        } catch (error) {
            window.adminPanel.showAlert(error.message, 'error');
        }
    }

    async handleSecurePropertyAdd(data) {
        try {
            // Validate property data
            const validation = this.validatePropertyData(data);
            if (!validation.isValid) {
                throw new Error(validation.errors.join(', '));
            }

            // Add property via secure API
            await window.apiClient.request('/properties', {
                method: 'POST',
                body: JSON.stringify(data)
            });

            window.adminPanel.showAlert('Emlak başarıyla eklendi', 'success');
            
        } catch (error) {
            window.adminPanel.showAlert(error.message, 'error');
        }
    }

    validatePropertyData(data) {
        const errors = [];
        
        if (!data.propertyName) errors.push('Emlak adı gerekli');
        if (!data.propertyLocation) errors.push('Konum gerekli');
        if (!data.propertyValue || data.propertyValue <= 0) errors.push('Geçerli değer gerekli');
        if (!data.propertyYield || data.propertyYield <= 0) errors.push('Geçerli getiri gerekli');
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }

    setupMonitoring() {
        // Performance monitoring
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.duration > 100) {
                        console.warn(`Slow operation: ${entry.name} - ${entry.duration}ms`);
                    }
                });
            });
            observer.observe({ entryTypes: ['measure'] });
        }

        // Memory monitoring
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
                    console.warn('High memory usage detected');
                    this.triggerGarbageCollection();
                }
            }, 60000); // Check every minute
        }
    }

    triggerGarbageCollection() {
        // Clean up event listeners
        window.eventManager.cleanup();
        
        // Clear old error logs
        if (window.errorHandler.errorQueue.length > 20) {
            window.errorHandler.errorQueue = window.errorHandler.errorQueue.slice(-20);
        }
    }

    handleInitializationError(error) {
        console.error('Critical initialization error:', error);
        
        // Show fallback UI
        document.body.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #1a1a3e;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                font-family: Arial, sans-serif;
            ">
                <h1>🔒 Güvenlik Hatası</h1>
                <p>Sistem güvenli başlatılamadı. Lütfen sayfayı yenileyin.</p>
                <button onclick="location.reload()" style="
                    background: #667eea;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    color: white;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 1rem;
                ">Sayfayı Yenile</button>
            </div>
        `;
    }

    // Health check method
    healthCheck() {
        const health = {
            timestamp: Date.now(),
            modules: {},
            overall: 'healthy'
        };

        for (const [name, module] of this.securityModules) {
            try {
                // Basic health check for each module
                health.modules[name] = {
                    loaded: !!module,
                    functional: typeof module === 'object'
                };
            } catch (error) {
                health.modules[name] = {
                    loaded: false,
                    functional: false,
                    error: error.message
                };
                health.overall = 'unhealthy';
            }
        }

        return health;
    }
}

// Auto-initialize when script loads
(function() {
    'use strict';
    
    // Create and start secure initialization
    const secureInit = new SecureAppInitializer();
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            secureInit.initialize();
        });
    } else {
        secureInit.initialize();
    }
    
    // Make initializer available globally for debugging
    window.ARSA_SECURITY_INIT = secureInit;
    
})();