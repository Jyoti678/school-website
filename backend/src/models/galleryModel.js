const db = require('../config/db');

async function getAllGalleryItems() {
  return await db.query('SELECT * FROM gallery ORDER BY display_order ASC, id DESC');
}

async function getActiveGalleryItems(category = null) {
  if (category && category !== 'All') {
    return await db.query('SELECT * FROM gallery WHERE is_active = 1 AND category = ? ORDER BY display_order ASC, id DESC', [category]);
  }
  return await db.query('SELECT * FROM gallery WHERE is_active = 1 ORDER BY display_order ASC, id DESC');
}

async function getGalleryById(id) {
  const rows = await db.query('SELECT * FROM gallery WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

async function createGalleryItem(data) {
  const { title, category = 'General', description, image_url, display_order = 0, is_active = 1 } = data;
  const result = await db.query(
    'INSERT INTO gallery (title, category, description, image_url, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?)',
    [title, category, description, image_url, display_order, is_active]
  );
  return getGalleryById(result.insertId);
}

async function updateGalleryItem(id, data) {
  const { title, category, description, image_url, display_order, is_active } = data;
  await db.query(
    'UPDATE gallery SET title = ?, category = ?, description = ?, image_url = ?, display_order = ?, is_active = ? WHERE id = ?',
    [title, category, description, image_url, display_order, is_active, id]
  );
  return getGalleryById(id);
}

async function deleteGalleryItem(id) {
  const item = await getGalleryById(id);
  await db.query('DELETE FROM gallery WHERE id = ?', [id]);
  return item;
}

module.exports = {
  getAllGalleryItems,
  getActiveGalleryItems,
  getGalleryById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
};
