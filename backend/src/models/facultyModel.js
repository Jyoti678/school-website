const db = require('../config/db');

async function getAllFaculty() {
  return await db.query('SELECT * FROM faculty ORDER BY display_order ASC, id DESC');
}

async function getActiveFaculty() {
  return await db.query('SELECT * FROM faculty WHERE is_active = 1 ORDER BY display_order ASC, id DESC');
}

async function getFacultyById(id) {
  const rows = await db.query('SELECT * FROM faculty WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

async function createFaculty(data) {
  const { name, designation, department, photo_url, biography, display_order = 0, is_active = 1 } = data;
  const result = await db.query(
    'INSERT INTO faculty (name, designation, department, photo_url, biography, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, designation, department, photo_url, biography, display_order, is_active]
  );
  return getFacultyById(result.insertId);
}

async function updateFaculty(id, data) {
  const { name, designation, department, photo_url, biography, display_order, is_active } = data;
  await db.query(
    'UPDATE faculty SET name = ?, designation = ?, department = ?, photo_url = ?, biography = ?, display_order = ?, is_active = ? WHERE id = ?',
    [name, designation, department, photo_url, biography, display_order, is_active, id]
  );
  return getFacultyById(id);
}

async function deleteFaculty(id) {
  const item = await getFacultyById(id);
  await db.query('DELETE FROM faculty WHERE id = ?', [id]);
  return item;
}

module.exports = {
  getAllFaculty,
  getActiveFaculty,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty
};
