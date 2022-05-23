import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

import generateToken from '../utils/generateToken';
import User from '../models/userModel';

// @desc    Auth user & get token
// @route   POST /api/v1/users/login
// @access  Public
export const authUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // 1) Check if email and password exist.
    if (!email || !password) {
      res.status(401);
      return next(new Error('Please provide email & password'));
    }

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
  }
);

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
export const getUserProfile = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const user = req.user;

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
);

const filterObj = (obj: any, ...allowedFields: any) => {
  const newObj = {} as any;
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    if (req.body.password) {
      res.status(400);
      return next(
        new Error('This route is not for password updates. Please use /updateMyPassword')
      );
    }

    const filteredBody = filterObj(req.body, 'name', 'email');

    const updatedUser = (await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true,
    })) as any;

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  }
);

export const updatePassword = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    // 1) Get the user from the collection.
    const user: any = await User.findById(req.user.id).select('+password');

    // 2) Check if the POSTed password is correct.
    if (!(await user.matchPassword(req.body.currentPassword, user.password))) {
      res.status(401);
      return next(new Error('The password you entered does not match!'));
    }

    // 3) If so, update the password.
    user.password = req.body.password;
    await user.save();

    // 4) Log the user in, send the JWT.
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  }
);

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
export const getUsers = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: users,
    });
  }
);

// @desc    Delete User
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      return next(new Error('User not found'));
    }

    await user.remove();

    res.status(204).json({
      success: true,
      data: null,
    });
  }
);
