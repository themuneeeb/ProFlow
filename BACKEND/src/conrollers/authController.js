// Import necessary modules using ES module syntax
import passport from 'passport';
import { signupSchema, loginSchema } from '../utils/validate.js';
import { registerUser, loginUser } from '../services/authService.js';

// POST /api/auth/signup
async function signup(req, res, next) {
  try {
    const { error, value } = signupSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const token = await registerUser(value);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/login
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

// GET /api/auth/google
const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// GET /api/auth/google/callback
const googleCallback = passport.authenticate('google', {
  failureRedirect: '/login',
  session: false,
});
function googleRedirect(req, res) {
  // Issue JWT after successful Google login
  const token = registerUser.generateToken(req.user); 
  // send token to front-end
  res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
}

export { signup, login, googleAuth, googleCallback, googleRedirect };
