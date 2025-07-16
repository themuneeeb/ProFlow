import jwt from 'jsonwebtoken';
import User from '../models/User.js';

async function registerUser({ name, email, password }) {
  const exists = await User.findOne({ email });
  if (exists) throw new Error('User already exists');
  const user = await User.create({ name, email, password, role: 'admin' });
  return generateToken(user);
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');
  const match = await user.matchPassword(password);
  if (!match) throw new Error('Invalid credentials');
  return generateToken(user);
}

function generateToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export { registerUser, loginUser };
