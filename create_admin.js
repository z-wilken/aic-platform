const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'aic_admin',
  password: process.env.POSTGRES_PASSWORD || 'aic_password_secure',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DB || 'aic_platform',
});

async function createSuperAdmin() {
  const email = 'zanderwilken2005@gmail.com';
  const password = 'AICAdmin2026!';
  const name = 'Zander Wilken (Super Admin)';
  const role = 'ADMIN';

  console.log('Attempting to create/update super admin:', email);
  console.log('Database config:', {
    user: process.env.POSTGRES_USER || 'aic_admin',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || '5432',
    database: process.env.POSTGRES_DB || 'aic_platform',
  });

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const res = await pool.query(
      `INSERT INTO users (email, password_hash, name, role, is_active, is_super_admin, permissions)
       VALUES ($1, $2, $3, $4, TRUE, TRUE, $5)
       ON CONFLICT (email) DO UPDATE 
       SET password_hash = $2, role = $4, name = $3, is_super_admin = TRUE, permissions = $5
       RETURNING id, role`,
      [email, hash, name, role, JSON.stringify({ can_publish: true, can_verify: true })]
    );

    console.log('Super Admin user created/updated successfully. ID:', res.rows[0].id, 'Role:', res.rows[0].role);
  } catch (err) {
    console.error('Error creating Super Admin:', err);
  } finally {
    await pool.end();
  }
}

createSuperAdmin();
