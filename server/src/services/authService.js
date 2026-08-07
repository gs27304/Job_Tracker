import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import env from '../config/env.js';
import AppError from '../utils/AppError.js';

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, env.jwtSecret, { expiresIn: '7d' });
};

export const registerUserService = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new AppError('Please provide name, email and password', 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('User already exists', 400);
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user);

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email },
  };
};

export const loginUserService = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError('Please provide email and password', 400);
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = generateToken(user);

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email },
  };
};

export const getCurrentUserService = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
};
