// src/controllers/authController.js
import passport from 'passport';
import { sendOtpToEmail } from '../services/otpService.js';
import User from '../models/User.js';  
import { signupSchema, loginSchema } from '../utils/validate.js';
import {
  requestSignupOtp,
  confirmSignupOtp,
  loginUser,
  generateToken,
} from '../services/authService.js';

async function signup(req, res, next) {
  try {
    const { error, value } = signupSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const result = await requestSignupOtp(value);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function verifyOtp(req, res, next) {
  try {
    const { email, code } = req.body;
    const token = await confirmSignupOtp({ email, code });
    res.json({ token });
  } catch (err) {
    next(err);
  }
}

async function resendOtp(req, res, next) {
  try {
    const { email } = req.body;
    // 1) Verify user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No account found with that email' });
    }
    // 2) Send a fresh OTP
    await sendOtpToEmail(email);
    res.json({ message: 'OTP resent' });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const token = await loginUser(value);
    res.json({ token });
  } catch (err) {
    next(err);
  }
}

const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });
const googleCallback = passport.authenticate('google', { failureRedirect: '/login', session: false });
function googleRedirect(req, res) {
  const token = generateToken(req.user);
  res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
}

export { signup, verifyOtp, resendOtp, login, googleAuth, googleCallback, googleRedirect };
