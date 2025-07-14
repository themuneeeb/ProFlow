import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
// ... other imports

const app = express();
app.use(cors());
app.use(express.json());

// connect to Mongo
connectDB();

// routes
// ... other routers

export default app;
