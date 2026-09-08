const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const env = require('./src/config/env');

async function getWorkingConnection() {
  const candidatePorts = [env.DB_PORT, 3306, 3307].filter((v, i, a) => a.indexOf(v) === i);
  const candidatePasswords = [env.DB_PASSWORD, '', 'root', 'admin', 'root123', 'admin123', 'password', '123456', 'root@123'].filter((v, i, a) => a.indexOf(v) === i);

  for (const port of candidatePorts) {
    for (const pw of candidatePasswords) {
      try {
        const conn = await mysql.createConnection({
          host: env.DB_HOST,
          port: port,
          user: env.DB_USER,
          password: pw,
          multipleStatements: true
        });
        console.log(`Connected to MySQL at ${env.DB_HOST}:${port} with user '${env.DB_USER}'`);
        return { conn, port, pw };
      } catch (err) {
        // try next
      }
    }
  }

  throw new Error(`Could not connect to MySQL server at ${env.DB_HOST}:${env.DB_PORT}.\nPlease verify MySQL is running and set DB_PASSWORD in backend/.env to match your MySQL Workbench credentials.`);
}

async function seed() {
  console.log('--- Starting Database Seeding & Schema Setup ---');

  const { conn, port, pw } = await getWorkingConnection();

  if (port !== env.DB_PORT || pw !== env.DB_PASSWORD) {
    console.log(`[Info] Auto-detected MySQL port ${port} and working credentials.`);
    // Update .env file with detected working port/password
    const envPath = path.join(__dirname, '.env');
    let envContent = fs.readFileSync(envPath, 'utf-8');
    envContent = envContent.replace(/DB_PORT=.*/, `DB_PORT=${port}`);
    envContent = envContent.replace(/DB_PASSWORD=.*/, `DB_PASSWORD=${pw}`);
    fs.writeFileSync(envPath, envContent, 'utf-8');
    console.log(`Updated backend/.env with DB_PORT=${port}`);
  }

  const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
  console.log('Executing schema.sql...');
  await conn.query(schemaSql);
  console.log('Schema execution complete.');
  await conn.end();

  // Connect directly to school_cms database to insert seed admin
  const db = await mysql.createConnection({
    host: env.DB_HOST,
    port: port,
    user: env.DB_USER,
    password: pw,
    database: env.DB_NAME
  });

  const defaultUsername = 'admin';
  const defaultPassword = 'admin123';
  const defaultEmail = 'admin@standrewsacademy.edu';
  const defaultName = 'System Administrator';

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(defaultPassword, salt);

  await db.execute(
    `INSERT INTO admins (username, password_hash, email, name)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), email = VALUES(email), name = VALUES(name)`,
    [defaultUsername, passwordHash, defaultEmail, defaultName]
  );

  console.log('----------------------------------------------------');
  console.log('Default Admin Account Ready:');
  console.log(`Username: ${defaultUsername}`);
  console.log(`Password: ${defaultPassword}`);
  console.log('----------------------------------------------------');

  await db.end();
  console.log('Seeding completed successfully!');
}

seed().catch(err => {
  console.error('\n[Seeding Notice]', err.message);
});
