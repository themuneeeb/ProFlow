// src/routes/userRoutes.js
import express from 'express'
import { getMe } from '../conrollers/userController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

// GET /api/users/me
router.get('/me', protect, getMe)

export default router
