const db = require('../config/db');

async function getAllNotices() {
  return await db.query('SELECT * FROM notices ORDER BY publish_date DESC, id DESC');
}

async function getPublicNotices() {
  return await db.query(
    `SELECT * FROM notices 
     WHERE is_published = 1 
       AND publish_date <= CURDATE() 
       AND (expiry_date IS NULL OR expiry_date >= CURDATE())
     ORDER BY publish_date DESC, id DESC`
  );
}

async function getNoticeById(id) {
  const rows = await db.query('SELECT * FROM notices WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

async function createNotice(data) {
  const { title, description, publish_date, expiry_date = null, attachment_url = null, is_published = 1 } = data;
  const result = await db.query(
    'INSERT INTO notices (title, description, publish_date, expiry_date, attachment_url, is_published) VALUES (?, ?, ?, ?, ?, ?)',
    [title, description, publish_date, expiry_date || null, attachment_url || null, is_published]
  );
  return getNoticeById(result.insertId);
}

async function updateNotice(id, data) {
  const { title, description, publish_date, expiry_date, attachment_url, is_published } = data;
  await db.query(
    'UPDATE notices SET title = ?, description = ?, publish_date = ?, expiry_date = ?, attachment_url = ?, is_published = ? WHERE id = ?',
    [title, description, publish_date, expiry_date || null, attachment_url || null, is_published, id]
  );
  return getNoticeById(id);
}

async function deleteNotice(id) {
  const notice = await getNoticeById(id);
  await db.query('DELETE FROM notices WHERE id = ?', [id]);
  return notice;
}

module.exports = {
  getAllNotices,
  getPublicNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice
};
