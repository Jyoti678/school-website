const db = require('../config/db');

async function getPrincipal() {
  const rows = await db.query('SELECT * FROM principal_info WHERE id = 1 LIMIT 1');
  return rows[0] || null;
}

async function updatePrincipal(data) {
  const { name, designation, photo_url, message } = data;
  await db.query(
    `UPDATE principal_info SET
      name = ?, designation = ?, photo_url = ?, message = ?
     WHERE id = 1`,
    [name, designation, photo_url, message]
  );
  return getPrincipal();
}

module.exports = {
  getPrincipal,
  updatePrincipal
};
