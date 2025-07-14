import mongoose from 'mongoose';
import config from './index.js';
export default async function connectDB() {
  await mongoose.connect(config.MONGO_URI);
  console.log('MongoDB connected');
}
