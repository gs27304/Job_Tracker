import express from 'express';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser
} from '../controllers/authController.js';

import { validateAuthInput } from '../utils/validators.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', validateAuthInput, registerUser);
router.post('/login', validateAuthInput, loginUser);
router.post('/logout', authMiddleware, logoutUser);
router.get('/me', authMiddleware, getCurrentUser);

export default router;