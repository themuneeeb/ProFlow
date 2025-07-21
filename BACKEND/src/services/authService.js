// src/services/authService.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendOtpToEmail, verifyOtp as svcVerifyOtp } from './otpService.js';

export async function requestSignupOtp({ name, email, password }) {
  // 1) Prevent dupes
  const existing = await User.findOne({ email });
  if (existing) {
    if (existing.googleId) {
      throw new Error('Already registered via Google; please sign in with Google');
    }
    if (existing.password) {
      throw new Error('User already exists');
    }
  }
  // 2) Create the user (unverified)
  let user = existing;
  if (!existing) {
    user = await User.create({ name, email, password, verified: false });
  }
  // 3) Send OTP
  await sendOtpToEmail(email);
  return { userId: user.id, message: 'OTP sent' };
}

export async function confirmSignupOtp({ email, code }) {
  // verify code & mark user.throws on failure
  await svcVerifyOtp(email, code);
  // return your JWT now that they’re verified
  const user = await User.findOne({ email });
  return generateToken(user);
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');
  if (user.googleId && !user.password) {
    throw new Error('Please login via Google');
  }
  if (!user.verified) {
    throw new Error('Please verify your email first');
  }
  const match = await user.matchPassword(password);
  if (!match) throw new Error('Invalid credentials');
  return generateToken(user);
}

export function generateToken(user) {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}
