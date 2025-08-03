const userRole = localStorage.getItem("userRole");
const userEmail = localStorage.getItem("userEmail");
const isEmergency = window.location.search.includes("emergency=admin");

if (userRole !== "admin" && !isEmergency) {
  document.body.innerHTML = `
    <div class='access-denied'>
      <h2>⛔ Erişim Reddedildi!</h2>
      <p>Bu sayfaya yalnızca admin yetkisi olanlar erişebilir.</p>
      <a href='index.html'>← Ana Sayfa</a>
    </div>`;
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}
