const db = require('../config/db');

async function getAllFacilities() {
  return await db.query('SELECT * FROM facilities ORDER BY display_order ASC, id DESC');
}

async function getActiveFacilities() {
  return await db.query('SELECT * FROM facilities WHERE is_active = 1 ORDER BY display_order ASC, id DESC');
}

async function getFacilityById(id) {
  const rows = await db.query('SELECT * FROM facilities WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

async function createFacility(data) {
  const { name, description, image_url, display_order = 0, is_active = 1 } = data;
  const result = await db.query(
    'INSERT INTO facilities (name, description, image_url, display_order, is_active) VALUES (?, ?, ?, ?, ?)',
    [name, description, image_url, display_order, is_active]
  );
  return getFacilityById(result.insertId);
}

async function updateFacility(id, data) {
  const { name, description, image_url, display_order, is_active } = data;
  await db.query(
    'UPDATE facilities SET name = ?, description = ?, image_url = ?, display_order = ?, is_active = ? WHERE id = ?',
    [name, description, image_url, display_order, is_active, id]
  );
  return getFacilityById(id);
}

async function deleteFacility(id) {
  const facility = await getFacilityById(id);
  await db.query('DELETE FROM facilities WHERE id = ?', [id]);
  return facility;
}

module.exports = {
  getAllFacilities,
  getActiveFacilities,
  getFacilityById,
  createFacility,
  updateFacility,
  deleteFacility
};
