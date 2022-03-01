import 'dotenv/config';

// AWS credentials enviroviment variables
const {
  AWS_BUCKET_NAME,
  AWS_BUCKET_REGION,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
} = process.env;

// Database credentials enviroviment variables
const {
  DB_HOST,
  DB_USER,
  DB_PORT,
  DB_PASSWORD,
  DB_NAME,
  DATABASE_URL,
} = process.env;

// Auth configuration enviroviment variables
const {
  JWT_SECRET,
} = process.env;

export {
  AWS_BUCKET_NAME,
  AWS_BUCKET_REGION,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
};

export {
  DB_HOST,
  DB_USER,
  DB_PORT,
  DB_PASSWORD,
  DB_NAME,
  DATABASE_URL,
};

export {
  JWT_SECRET,
};
