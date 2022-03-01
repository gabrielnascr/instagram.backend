import { migrate } from 'postgres-migrations';
import pkg from 'pg';
import {
  DATABASE_URL,
} from '../src/environment';

const { Client } = pkg;

const runMigrations = async () => {
  const client = new Client({ connectionString: DATABASE_URL });
  await client.connect();
  try {
    await migrate({ client }, 'db/');
  } finally {
    await client.end();
  }
};

runMigrations();
