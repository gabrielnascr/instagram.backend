import { Pool } from 'pg';

import {
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
} from '../environment';

const pool = new Pool({
  user: DB_USER || 'gabriel',
  host: DB_HOST || 'localhost',
  database: DB_NAME || 'instagram',
  password: DB_PASSWORD || 'gabriel',
  port: DB_PORT || 5432,
});

export default pool;
