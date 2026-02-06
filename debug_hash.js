const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'aic_admin',
  password: process.env.POSTGRES_PASSWORD || 'aic_password_secure',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DB || 'aic_platform',
});

async function checkHash() {
  const email = 'zanderwilken2005@gmail.com';
  try {
    const res = await pool.query('SELECT password_hash FROM users WHERE email = $1', [email]);
    if (res.rows.length > 0) {
      console.log('Stored Hash:', res.rows[0].password_hash);
    } else {
      console.log('User not found.');
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

checkHash();
