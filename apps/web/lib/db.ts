import { Pool } from 'pg';

const pool = new Pool({
  user: 'aic_admin',
  host: 'localhost',
  database: 'aic_platform',
  password: 'aic_password_secure',
  port: 5432,
});

export default pool;
