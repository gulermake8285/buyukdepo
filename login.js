document.getElementById('loginForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email')?.value.trim();
  const password = document.getElementById('password')?.value.trim();
  const messageDiv = document.getElementById('message');

  if (!email || !password) {
    messageDiv.textContent = 'Lütfen tüm alanları doldurun!';
    messageDiv.className = 'message error';
    return;
  }

  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userRole', data.role);
        window.location.href = 'dashboard.html';
      } else {
        messageDiv.textContent = data.message || 'Giriş başarısız!';
        messageDiv.className = 'message error';
      }
    })
    .catch(() => {
      messageDiv.textContent = 'Sunucuya bağlanılamadı.';
      messageDiv.className = 'message error';
    });
});
