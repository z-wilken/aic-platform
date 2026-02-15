import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST || '127.0.0.1',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DB,
  connectionTimeoutMillis: 5000, // 5 second timeout
});

export const query = async (text: string, params?: unknown[]) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    // Task m44: Institutional logging - never log query text or params
    console.log('executed query', { duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database Error:', (error as Error).message);
    throw error;
  }
};
