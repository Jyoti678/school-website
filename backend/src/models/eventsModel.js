const db = require('../config/db');

async function getAllEvents() {
  return await db.query('SELECT * FROM events ORDER BY event_date DESC, id DESC');
}

async function getPublicEvents() {
  return await db.query(
    'SELECT * FROM events WHERE is_published = 1 ORDER BY event_date ASC, id DESC'
  );
}

async function getEventById(id) {
  const rows = await db.query('SELECT * FROM events WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

async function createEvent(data) {
  const { name, description, event_date, event_time, location, image_url, is_published = 1 } = data;
  const result = await db.query(
    'INSERT INTO events (name, description, event_date, event_time, location, image_url, is_published) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, description, event_date, event_time, location, image_url, is_published]
  );
  return getEventById(result.insertId);
}

async function updateEvent(id, data) {
  const { name, description, event_date, event_time, location, image_url, is_published } = data;
  await db.query(
    'UPDATE events SET name = ?, description = ?, event_date = ?, event_time = ?, location = ?, image_url = ?, is_published = ? WHERE id = ?',
    [name, description, event_date, event_time, location, image_url, is_published, id]
  );
  return getEventById(id);
}

async function deleteEvent(id) {
  const item = await getEventById(id);
  await db.query('DELETE FROM events WHERE id = ?', [id]);
  return item;
}

module.exports = {
  getAllEvents,
  getPublicEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
