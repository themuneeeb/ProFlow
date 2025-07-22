// src/app.js

import express from 'express'
import cors from 'cors'                    // Cross-Origin Resource Sharing
import passport from 'passport'
import dotenv from 'dotenv'
import morgan from 'morgan'               // HTTP request logger (dev only)
import connectDB from './config/db.js'    // our MongoDB connection fn
import './config/passport.js'             // sets up GoogleStrategy, serialize/deserialize

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js' // user-related routes (e.g., getMe)
import errorHandler from './middlewares/errorHandler.js' // centralized error handler

// ───────────────────────────────────────────────────────────────
// Load environment variables from .env into process.env
// ───────────────────────────────────────────────────────────────
dotenv.config()

// ───────────────────────────────────────────────────────────────
// Initialize Express app
// ───────────────────────────────────────────────────────────────
const app = express()

// ───────────────────────────────────────────────────────────────
// Connect to MongoDB (returns a Promise)
// ───────────────────────────────────────────────────────────────
connectDB()

// ───────────────────────────────────────────────────────────────
// Middleware
// ───────────────────────────────────────────────────────────────
// In development, log each request to the console
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Parse incoming JSON bodies
app.use(express.json())

// Enable CORS for front-end origin
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // allow cookies and auth headers
  })
)

// Initialize Passport (for Google OAuth & later strategies)
app.use(passport.initialize())

// ───────────────────────────────────────────────────────────────
// Routes
// ───────────────────────────────────────────────────────────────
// All auth routes (signup, login, Google OAuth)
app.use('/auth', authRoutes)
app.use('/users', userRoutes)   // User-related routes (e.g., getMe)

// ───────────────────────────────────────────────────────────────
// 404 Handler
// ───────────────────────────────────────────────────────────────
// If no route matched, forward a 404 error to the error handler
app.use((req, res, next) => {
  const err = new Error(`Not Found - ${req.originalUrl}`)
  err.statusCode = 404
  next(err)
})

// ───────────────────────────────────────────────────────────────
// Global Error Handler
// ───────────────────────────────────────────────────────────────
// Catches all errors passed with `next(err)` and sends JSON response
app.use(errorHandler)

// ───────────────────────────────────────────────────────────────
// Export the app for server entry (and for testing)
// ───────────────────────────────────────────────────────────────
export default app
