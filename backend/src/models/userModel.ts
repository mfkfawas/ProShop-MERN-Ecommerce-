import mongoose, { Document } from 'mongoose';
const validator = require('validator');
const bcrypt = require('bcryptjs');

interface UserType extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  matchPassword: (candidatePassword: string, userPassword: string) => Promise<boolean>;
  changedPasswordAfterTokenIssued: (JWTIssuedTimeStamp: number) => Promise<boolean>;
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  // this.passwordConfirm = undefined
});

//Update changePasswordAt property of the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.matchPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfterTokenIssued = async function (JWTIssuedTimeStamp: number) {
  //By default, we return false from this method. And that will then mean user has'nt changed his password
  //after the token has been issued.
  if (this.passwordChangedAt) {
    const passwordLastChangedTimeStamp = this.passwordChangedAt.getTime() / 1000;

    return JWTIssuedTimeStamp < passwordLastChangedTimeStamp;
  }

  return false;
};

const User = mongoose.model<UserType>('User', userSchema);

export default User;
