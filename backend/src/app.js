const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const env = require('./config/env');
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Trust Render's HTTPS reverse proxy
if (env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Security Headers (Configure content security policy to allow embeds/images)
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS Configuration
app.use(cors({
  origin: true,
  credentials: true
}));

// Body Parsing Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Session Configuration
app.use(session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: 'school_cms_sid',
  cookie: {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Serve Uploaded Media Files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Serve Frontend Static Files
const frontendDir = path.join(__dirname, '../../frontend');
app.use(express.static(frontendDir));

// API Routes
app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);

// Fallback for Admin HTML pages if direct URL requested without extension
app.get('/admin', (req, res) => {
  res.sendFile(path.join(frontendDir, 'admin/index.html'));
});

// Central Error Handling Middleware
app.use(errorHandler);

module.exports = app;
