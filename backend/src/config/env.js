const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || '3306', 10),
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'school_cms',
  SESSION_SECRET: process.env.SESSION_SECRET || 'school_admin_secret_key_change_in_production_2026',
  STORAGE_DRIVER: process.env.STORAGE_DRIVER || 'local',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5000'
};
