const bcrypt = require('bcryptjs');
const adminModel = require('../models/adminModel');

async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    const admin = await adminModel.findByUsername(username);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }

    const match = await bcrypt.compare(password, admin.password_hash);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }

    req.session.regenerate(err => {
      if (err) return next(err);

      req.session.admin = {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        email: admin.email
      };

      return res.json({
        success: true,
        message: 'Login successful.',
        admin: req.session.admin
      });
    });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Could not log out.' });
      }
      res.clearCookie('school_cms_sid');
      return res.json({ success: true, message: 'Logout successful.' });
    });
  } catch (err) {
    next(err);
  }
}

async function getMe(req, res, next) {
  try {
    if (req.session && req.session.admin) {
      return res.json({
        success: true,
        authenticated: true,
        admin: req.session.admin
      });
    }
    return res.json({
      success: true,
      authenticated: false,
      admin: null
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  login,
  logout,
  getMe
};
