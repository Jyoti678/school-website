/**
 * Public School Website Client Script
 * Dynamically binds header, footer, settings, and page content from REST API.
 */

let globalSettings = null;

// Initialize Header & Footer with Live School Settings
async function initSiteHeaderFooter() {
  try {
    const res = await apiRequest('/public/settings');
    if (res.data) {
      globalSettings = res.data;
      renderHeaderFooter(res.data);
    }
  } catch (err) {
    console.error('Could not load site settings:', err.message);
  }
}

function renderHeaderFooter(s) {
  // Top bar info
  const topPhone = document.getElementById('top-bar-phone');
  if (topPhone && s.phone) topPhone.innerHTML = `📞 ${s.phone}`;

  const topEmail = document.getElementById('top-bar-email');
  if (topEmail && s.email) topEmail.innerHTML = `✉️ ${s.email}`;

  const topTimings = document.getElementById('top-bar-timings');
  if (topTimings && s.timings) topTimings.innerHTML = `🕒 ${s.timings}`;

  // Brand header
  const brandName = document.getElementById('brand-school-name');
  if (brandName && s.school_name) brandName.textContent = s.school_name;

  const brandTagline = document.getElementById('brand-tagline');
  if (brandTagline && s.tagline) brandTagline.textContent = s.tagline;

  const brandLogo = document.getElementById('brand-logo-img');
  if (brandLogo && s.logo_url) brandLogo.src = s.logo_url;

  const heroImage = document.getElementById('hero-image');
  const heroPlaceholder = document.getElementById('hero-media-placeholder');
  if (heroImage && heroPlaceholder) {
    if (s.hero_image_url) {
      heroImage.src = s.hero_image_url;
      heroImage.style.display = 'block';
      heroPlaceholder.style.display = 'none';
    } else {
      heroImage.removeAttribute('src');
      heroImage.style.display = 'none';
      heroPlaceholder.style.display = 'flex';
    }
  }

  // Footer info
  const footerTitle = document.getElementById('footer-school-name');
  if (footerTitle && s.school_name) footerTitle.textContent = s.school_name;

  const footerDesc = document.getElementById('footer-description');
  if (footerDesc && s.description) footerDesc.textContent = s.description;

  const footerAddress = document.getElementById('footer-address');
  if (footerAddress && s.address) footerAddress.textContent = s.address;

  const footerPhone = document.getElementById('footer-phone');
  if (footerPhone && s.phone) footerPhone.textContent = s.phone;

  const footerEmail = document.getElementById('footer-email');
  if (footerEmail && s.email) footerEmail.textContent = s.email;

  const footerCopyright = document.getElementById('footer-copyright');
  if (footerCopyright && s.school_name) {
    footerCopyright.innerHTML = `&copy; ${new Date().getFullYear()} ${s.school_name}. All Rights Reserved. Managed via Admin CMS.`;
  }
}

// Setup Mobile Navigation Drawer
function setupMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const mainNav = document.getElementById('main-nav-container');

  if (toggleBtn && mainNav) {
    toggleBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initSiteHeaderFooter();
  setupMobileNav();
});
