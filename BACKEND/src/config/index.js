// Import necessary modules using ES syntax
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Destructure and validate required vars
const {
  PORT,
  MONGO_URI,
  JWT_SECRET,
  NODE_ENV = 'development',
} = process.env;

if (!MONGO_URI) {
  console.error('[CONFIG] ❌ MONGO_URI is not defined in .env');
  process.exit(1);
}

if (!JWT_SECRET) {
  console.error('[CONFIG] ❌ JWT_SECRET is not defined in .env');
  process.exit(1);
}

const config = {
  port: Number(PORT) || 5000,
  mongoUri: MONGO_URI,
  jwtSecret: JWT_SECRET,
  nodeEnv: NODE_ENV,
};

export default config;
