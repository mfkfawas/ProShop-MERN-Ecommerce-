import mongoose, { Document } from 'mongoose';
const validator = require('validator');
const bcrypt = require('bcryptjs');

interface UserType extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name!!!'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email.'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid Email.'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password.'],
      minlength: 8,
      select: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserType>('User', userSchema);

export default User;
