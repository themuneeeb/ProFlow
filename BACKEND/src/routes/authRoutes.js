// src/routes/authRoutes.js
import express from 'express';
import passport from 'passport';
import {
  signup,
  verifyOtp,
  resendOtp,
  login,
  googleAuth,
  googleCallback,
  googleRedirect,
} from '../conrollers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/login', login);

router.get('/google', googleAuth);
router.get('/google/callback', googleCallback, googleRedirect);

export default router;
