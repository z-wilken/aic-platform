const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'aic_admin',
  password: process.env.POSTGRES_PASSWORD || 'aic_password_secure',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DB || 'aic_platform',
});

async function checkUser() {
  const email = 'zanderwilken2005@gmail.com';
  try {
    const res = await pool.query('SELECT id, email, name, role, is_active, is_super_admin, permissions FROM users WHERE email = $1', [email]);
    if (res.rows.length > 0) {
      console.log('User found:', JSON.stringify(res.rows[0], null, 2));
    } else {
      console.log('User NOT found in database.');
    }
  } catch (err) {
    console.error('Error checking user:', err);
  } finally {
    await pool.end();
  }
}

checkUser();
