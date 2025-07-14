import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
// ... other imports

const app = express();
app.use(cors());
app.use(express.json());

// connect to Mongo
connectDB();

// routes
app.use('/api/auth', authRoutes);
// ... other routers

export default app;
