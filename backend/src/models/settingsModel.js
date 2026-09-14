const db = require('../config/db');

async function getSettings() {
  const rows = await db.query('SELECT * FROM school_settings WHERE id = 1 LIMIT 1');
  return rows[0] || null;
}

async function updateSettings(data) {
  const {
    school_name, logo_url, hero_image_url, tagline, description, address,
    phone, email, timings, map_iframe_url,
    facebook_url, twitter_url, instagram_url, youtube_url
  } = data;

  await db.query(
    `UPDATE school_settings SET
      school_name = ?, logo_url = ?, hero_image_url = ?, tagline = ?, description = ?,
      address = ?, phone = ?, email = ?, timings = ?, map_iframe_url = ?,
      facebook_url = ?, twitter_url = ?, instagram_url = ?, youtube_url = ?
     WHERE id = 1`,
    [
      school_name, logo_url, hero_image_url, tagline, description, address,
      phone, email, timings, map_iframe_url,
      facebook_url, twitter_url, instagram_url, youtube_url
    ]
  );

  return getSettings();
}

module.exports = {
  getSettings,
  updateSettings
};
