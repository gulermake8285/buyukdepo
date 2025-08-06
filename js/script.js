
// script.js - dil kontrolü + veri çekme
document.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('selectedLanguage') || 'en';
  translatePage(lang);
  const langSelector = document.getElementById('languageSelect');
  if (langSelector) {
    langSelector.value = lang;
    langSelector.addEventListener('change', (e) => {
      const selected = e.target.value;
      localStorage.setItem('selectedLanguage', selected);
      translatePage(selected);
    });
  }
});

function translatePage(lang) {
  const translations = {
    en: {
      title: "Property Listing",
      addProperty: "Add Property"
    },
    tr: {
      title: "Emlak Listesi",
      addProperty: "Emlak Ekle"
    }
  };
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    el.textContent = translations[lang][key] || el.textContent;
  });
}
