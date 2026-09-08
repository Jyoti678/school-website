const db = require('../config/db');

async function getAllAbout() {
  const rows = await db.query('SELECT * FROM about_content');
  const mapped = {};
  rows.forEach(r => {
    mapped[r.section_key] = r;
  });
  return mapped;
}

async function updateAboutSection(sectionKey, title, content) {
  await db.query(
    `INSERT INTO about_content (section_key, title, content)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE title = VALUES(title), content = VALUES(content)`,
    [sectionKey, title, content]
  );
  return getAllAbout();
}

module.exports = {
  getAllAbout,
  updateAboutSection
};
