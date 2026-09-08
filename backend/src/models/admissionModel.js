const db = require('../config/db');

async function getAdmissionInfo() {
  const rows = await db.query('SELECT * FROM admission_info WHERE id = 1 LIMIT 1');
  return rows[0] || null;
}

async function updateAdmissionInfo(data) {
  const { info, eligibility, procedure_info, required_documents, important_dates, prospectus_url } = data;
  await db.query(
    `UPDATE admission_info SET
      info = ?, eligibility = ?, procedure_info = ?, required_documents = ?,
      important_dates = ?, prospectus_url = ?
     WHERE id = 1`,
    [info, eligibility, procedure_info, required_documents, important_dates, prospectus_url]
  );
  return getAdmissionInfo();
}

module.exports = {
  getAdmissionInfo,
  updateAdmissionInfo
};
