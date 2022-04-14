import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

import generateToken from '../utils/generateToken';
import User from '../models/userModel';

// @desc    Auth user & get token
// @route   POST /api/v1/users/login
// @access  Public
export const authUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist.
  if (!email || !password) return next(new Error('Please provide email & password'));

  // 2) Check user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password, user.password))) {
    res.status(401);
    return next(new Error('Incorrect Email or Password'));
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

// @desc    Register a new user
// @route   POST /api/v1/users
// @access  Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    // 1) Check if email already exist.
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) return next(new Error('User already exists'));

    // 2) Create user
    const user = await User.create({ name, email, password });
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(500);
      next(new Error('User not created'));
    }
  }
);

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  const user = req.user;

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});
