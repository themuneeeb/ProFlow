import express from 'express';
import {
  signup,
  login,
  googleAuth,
  googleCallback,
  googleRedirect,
} from './../conrollers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback, googleRedirect);

export default router;
