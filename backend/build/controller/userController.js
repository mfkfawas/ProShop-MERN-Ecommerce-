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
exports.getUserProfile = exports.authUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const userModel_1 = __importDefault(require("../models/userModel"));
// @desc    Auth user & get token
// @route   POST /api/v1/users/login
// @access  Public
exports.authUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // 1) Check if email and password exist.
    if (!email || !password)
        return next(new Error('Please provide email & password'));
    // 2) Check user exists && password is correct
    const user = yield userModel_1.default.findOne({ email }).select('+password');
    if (!user || !(yield user.matchPassword(password, user.password))) {
        res.status(401);
        return next(new Error('Incorrect Email or Password'));
    }
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: (0, generateToken_1.default)(user._id),
    });
}));
// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
exports.getUserProfile = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    });
}));
