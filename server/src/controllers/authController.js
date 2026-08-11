import { getCurrentUserService, guestLoginService, loginUserService, registerUserService } from '../services/authService.js';


export const registerUser = async (req, res, next) => {
  try {
    const result = await registerUserService(req.body);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const result = await loginUserService(req.body);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const guestLogin = async (req, res, next) => {
  try {
    const result = await guestLoginService();

    res.status(200).json({
      success: true,
      message: 'Guest login successful',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req, res) => {
  res.status(200).json({ success: true, message: 'Logout successful' });
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await getCurrentUserService(req.user._id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
