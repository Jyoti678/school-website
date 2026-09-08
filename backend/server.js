const app = require('./src/app');
const env = require('./src/config/env');
const db = require('./src/config/db');

async function startServer() {
  try {
    // Verify database connection pool on startup
    await db.query('SELECT 1');
    console.log(`[Database] Successfully connected to MySQL database '${env.DB_NAME}' at ${env.DB_HOST}:${env.DB_PORT}`);

    app.listen(env.PORT, () => {
      console.log(`=======================================================`);
      console.log(`  School CMS Server Running in '${env.NODE_ENV}' mode  `);
      console.log(`  URL: http://localhost:${env.PORT}                      `);
      console.log(`  Public Website: http://localhost:${env.PORT}/index.html `);
      console.log(`  Admin Panel: http://localhost:${env.PORT}/admin/login.html`);
      console.log(`=======================================================`);
    });
  } catch (err) {
    console.error('[Startup Error] Failed to connect to MySQL database:', err.message);
    console.error('Please ensure MySQL service is running and credentials in .env are correct.');
    console.error('Run "npm run seed" to initialize database schema & seed admin user.');
    process.exit(1);
  }
}

startServer();
