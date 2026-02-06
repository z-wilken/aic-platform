const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'aic_admin',
  password: 'aic_password_secure',
  host: 'localhost',
  port: 5432,
  database: 'aic_platform',
});

async function reset() {
  try {
    const hash = await bcrypt.hash('AICAdmin2026!', 10);
    const res = await pool.query(
        'UPDATE users SET password_hash = $1, is_active = TRUE, role = $3 WHERE email = $2 RETURNING id', 
        [hash, 'zanderwilken2005@gmail.com', 'ADMIN']
    );
    if (res.rows.length > 0) {
        console.log('Password reset successfully for zanderwilken2005@gmail.com');
    } else {
        console.log('User not found.');
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

reset();
