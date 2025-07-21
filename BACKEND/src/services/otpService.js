// src/services/otpService.js
import OTP from '../models/Otp.js';
import User from '../models/User.js';
import { sendMail } from './emailService.js';

// Send a 6‑digit code, valid for 15 minutes
export async function sendOtpToEmail(email) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  // Replace any existing OTP for this email
  await OTP.findOneAndDelete({ email });
  await OTP.create({ email, code, expiresAt });

  await sendMail({
    to: email,
    subject: 'Your ProFlow verification code',
    text: `Your ProFlow verification code is ${code}. It expires in 15 minutes.`,
  });

  return true;
}

export async function verifyOtp(email, code) {
  const record = await OTP.findOne({ email, code });
  if (!record || record.expiresAt < new Date()) {
    throw new Error('Invalid or expired OTP');
  }
  // mark user verified
  await User.findOneAndUpdate({ email }, { verified: true });
  await OTP.deleteMany({ email });
  return true;
}
