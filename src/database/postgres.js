import { Pool } from 'pg';

const pool = new Pool({
  user: 'gabriel',
  host: 'localhost',
  database: 'instagram',
  password: 'gabriel153tt@',
  port: 5432
})

export default pool;