const db = require('../config/db');

async function findByUsername(username) {
  const rows = await db.query('SELECT * FROM admins WHERE username = ? LIMIT 1', [username]);
  return rows[0] || null;
}

async function findById(id) {
  const rows = await db.query('SELECT id, username, email, name, created_at FROM admins WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

module.exports = {
  findByUsername,
  findById
};
