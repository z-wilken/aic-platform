import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'aic_admin',
  password: process.env.POSTGRES_PASSWORD || 'aic_password_secure',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DB || 'aic_platform',
});

export const query = async (text: string, params?: any[]) => {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
};
