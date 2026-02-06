const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'aic_admin',
  password: 'aic_password_secure',
  host: 'localhost',
  port: 5432,
  database: 'aic_platform',
});

async function createTestUser() {
  try {
    const hash = await bcrypt.hash('password123', 10);
    const res = await pool.query(
      `INSERT INTO users (email, password_hash, name, role, is_active, is_super_admin, permissions)
       VALUES ($1, $2, $3, $4, TRUE, TRUE, $5)
       ON CONFLICT (email) DO UPDATE 
       SET password_hash = $2, role = $4, name = $3, is_super_admin = TRUE, permissions = $5
       RETURNING id`,
      ['test@aic.co.za', hash, 'Test Auditor', 'ADMIN', JSON.stringify({ can_publish: true, can_verify: true })]
    );
    console.log('Test User created. ID:', res.rows[0].id);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

createTestUser();
