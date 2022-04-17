import mongoose, { Document } from 'mongoose';
const validator = require('validator');
const bcrypt = require('bcryptjs');

export interface UserType {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  passwordChangedAt?: any;
}

export interface UserDocument extends UserType, Document {
  createdAt: Date;
  updatedAt: Date;
  matchPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
  changedPasswordAfterTokenIssued(JWTIssuedTimeStamp: number): Promise<boolean>;
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
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });

userSchema.pre('save', async function (this: UserDocument, next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

//Update changePasswordAt property of the user
userSchema.pre('save', async function (this: UserDocument, next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.matchPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfterTokenIssued = async function (
  this: UserDocument,
  JWTIssuedTimeStamp: number
): Promise<boolean> {
  if (this.passwordChangedAt) {
    const passwordLastChangedTimeStamp = this.passwordChangedAt.getTime() / 1000;

    return JWTIssuedTimeStamp < passwordLastChangedTimeStamp;
  }

  return false;
};

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
