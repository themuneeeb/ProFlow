// server/src/config/db.js
import mongoose from 'mongoose';
import config from './index.js';

async function connectDB() {
  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('[DB] MongoDB connected successfully');
  } catch (error) {
    console.error('[DB] MongoDB connection error:', error.message);
    // Exit process with failure
    process.exit(1);
  }
}

export default connectDB;
