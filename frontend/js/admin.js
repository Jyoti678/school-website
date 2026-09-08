/**
 * Admin Panel CMS Client Logic
 * Handles Authentication state, CRUD modals, File uploads, Table binding, and Status updates.
 */

// Verify Admin Session on Page Load
async function checkAdminAuth() {
  const isLoginPage = window.location.pathname.endsWith('login.html');
  try {
    const res = await apiRequest('/admin/auth/me');
    if (res.authenticated) {
      if (isLoginPage) {
        window.location.href = '/admin/index.html';
      } else {
        const adminNameEl = document.getElementById('admin-name-display');
        if (adminNameEl && res.admin) {
          adminNameEl.textContent = res.admin.name || res.admin.username;
        }
      }
    } else if (!isLoginPage) {
      window.location.href = '/admin/login.html';
    }
  } catch (err) {
    if (!isLoginPage) {
      window.location.href = '/admin/login.html';
    }
  }
}

// Handle Logout
async function handleLogout() {
  try {
    await apiRequest('/admin/auth/logout', 'POST');
    window.location.href = '/admin/login.html';
  } catch (err) {
    alert('Logout failed: ' + err.message);
  }
}

// Helper: Upload file and return URL
async function uploadFileHelper(fileInputId) {
  const input = document.getElementById(fileInputId);
  if (!input || !input.files || input.files.length === 0) return null;

  const formData = new FormData();
  formData.append('file', input.files[0]);

  const res = await apiRequest('/admin/upload', 'POST', formData, true);
  return res.data ? res.data.url : null;
}

// Modal Toggle Helpers
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
  checkAdminAuth();
});
