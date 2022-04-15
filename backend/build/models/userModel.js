"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next();
        const salt = yield bcrypt.genSalt(process.env.SALT_ROUNDS);
        this.password = yield bcrypt.hash(this.password, salt);
    });
});
//Update changePasswordAt property of the user
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password') || this.isNew)
            return next();
        this.passwordChangedAt = Date.now() - 1000;
        next();
    });
});
userSchema.methods.matchPassword = function (candidatePassword, userPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(candidatePassword, userPassword);
    });
};
userSchema.methods.changedPasswordAfterTokenIssued = function (JWTIssuedTimeStamp) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.passwordChangedAt) {
            const passwordLastChangedTimeStamp = this.passwordChangedAt.getTime() / 1000;
            return JWTIssuedTimeStamp < passwordLastChangedTimeStamp;
        }
        return false;
    });
};
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
