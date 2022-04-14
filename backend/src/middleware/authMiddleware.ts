const { promisify } = require('util');
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const protect = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  // 1) Getting token & check if its there.
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    res.status(401);
    return next(new Error('You are not logged in!!! Please login to get access'));
  }

  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists.
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    res.status(401);
    return next(new Error('The user belonging to this token is no longer exist!'));
  }

  // 4) Check if the user changed password after the token was issued.
  if (await currentUser.changedPasswordAfterTokenIssued(decoded.iat)) {
    res.status(401);
    return next(new Error('User recently changed password! Please login again.'));
  }

  req.user = currentUser;
  next();
});

export default protect;
