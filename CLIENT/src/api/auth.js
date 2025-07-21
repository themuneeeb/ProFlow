// src/api/auth.js
import api from './axiosConfig';

export const signup = async (values) => {
  return await api.post('/auth/signup', values);
};

export const login = async (values) => {
  return await api.post('/auth/login', values);
};

export const verifyOtp = ({ email, code }) =>
  api.post('/auth/verify-otp', { email, code });

export const resendOtp = ({ email }) =>
  api.post('/auth/resend-otp', { email });