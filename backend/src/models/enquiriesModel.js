const db = require('../config/db');

// Contact Enquiries
async function createContactEnquiry(data) {
  const { name, phone, email, message } = data;
  const result = await db.query(
    'INSERT INTO contact_enquiries (name, phone, email, message) VALUES (?, ?, ?, ?)',
    [name, phone, email, message]
  );
  return result.insertId;
}

async function getContactEnquiries() {
  return await db.query('SELECT * FROM contact_enquiries ORDER BY created_at DESC');
}

async function updateContactStatus(id, status) {
  await db.query('UPDATE contact_enquiries SET status = ? WHERE id = ?', [status, id]);
}

async function deleteContactEnquiry(id) {
  await db.query('DELETE FROM contact_enquiries WHERE id = ?', [id]);
}

// Admission Enquiries
async function createAdmissionEnquiry(data) {
  const { parent_student_name, phone, email, class_interested, message } = data;
  const result = await db.query(
    'INSERT INTO admission_enquiries (parent_student_name, phone, email, class_interested, message) VALUES (?, ?, ?, ?, ?)',
    [parent_student_name, phone, email, class_interested, message]
  );
  return result.insertId;
}

async function getAdmissionEnquiries() {
  return await db.query('SELECT * FROM admission_enquiries ORDER BY created_at DESC');
}

async function updateAdmissionStatus(id, status) {
  await db.query('UPDATE admission_enquiries SET status = ? WHERE id = ?', [status, id]);
}

async function deleteAdmissionEnquiry(id) {
  await db.query('DELETE FROM admission_enquiries WHERE id = ?', [id]);
}

module.exports = {
  createContactEnquiry,
  getContactEnquiries,
  updateContactStatus,
  deleteContactEnquiry,
  createAdmissionEnquiry,
  getAdmissionEnquiries,
  updateAdmissionStatus,
  deleteAdmissionEnquiry
};
