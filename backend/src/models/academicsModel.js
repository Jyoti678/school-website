const db = require('../config/db');

async function getAcademics() {
  const rows = await db.query('SELECT * FROM academics_info WHERE id = 1 LIMIT 1');
  return rows[0] || null;
}

async function updateAcademics(data) {
  const { curriculum, methodology, academic_info } = data;
  await db.query(
    `UPDATE academics_info SET
      curriculum = ?, methodology = ?, academic_info = ?
     WHERE id = 1`,
    [curriculum, methodology, academic_info]
  );
  return getAcademics();
}

module.exports = {
  getAcademics,
  updateAcademics
};
