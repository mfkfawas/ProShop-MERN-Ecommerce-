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
exports.updateUser = exports.getUserById = exports.deleteUser = exports.getUsers = exports.updatePassword = exports.updateUserProfile = exports.getUserProfile = exports.registerUser = exports.authUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const userModel_1 = __importDefault(require("../models/userModel"));
// @desc    Auth user & get token
// @route   POST /api/v1/users/login
// @access  Public
exports.authUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // 1) Check if email and password exist.
    if (!email || !password) {
        res.status(401);
        return next(new Error('Please provide email & password'));
    }
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
// @desc    Register a new user
// @route   POST /api/v1/users
// @access  Public
exports.registerUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    // 1) Check if email already exist.
    const userAlreadyExists = yield userModel_1.default.findOne({ email });
    if (userAlreadyExists)
        return next(new Error('User already exists'));
    // 2) Create user
    const user = yield userModel_1.default.create({ name, email, password });
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: (0, generateToken_1.default)(user._id),
        });
    }
    else {
        res.status(500);
        next(new Error('User not created'));
    }
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
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el))
            newObj[el] = obj[el];
    });
    return newObj;
};
// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
exports.updateUserProfile = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.password) {
        res.status(400);
        return next(new Error('This route is not for password updates. Please use /updateMyPassword'));
    }
    const filteredBody = filterObj(req.body, 'name', 'email');
    const updatedUser = (yield userModel_1.default.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true,
    }));
    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: (0, generateToken_1.default)(updatedUser._id),
    });
}));
exports.updatePassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1) Get the user from the collection.
    const user = yield userModel_1.default.findById(req.user.id).select('+password');
    // 2) Check if the POSTed password is correct.
    if (!(yield user.matchPassword(req.body.currentPassword, user.password))) {
        res.status(401);
        return next(new Error('The password you entered does not match!'));
    }
    // 3) If so, update the password.
    user.password = req.body.password;
    yield user.save();
    // 4) Log the user in, send the JWT.
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: (0, generateToken_1.default)(user._id),
    });
}));
// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
exports.getUsers = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.default.find();
    res.status(200).json({
        success: true,
        data: users,
    });
}));
// @desc    Delete User
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
exports.deleteUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.params.id);
    if (!user) {
        res.status(404);
        return next(new Error('User not found'));
    }
    yield user.remove();
    res.status(204).json({
        success: true,
        data: null,
    });
}));
// @desc    Get user by id
// @route   GET /api/v1/users/:id
// @access  Private/Admin
exports.getUserById = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.params.id);
    if (!user) {
        res.status(404);
        return next(new Error('User not found'));
    }
    res.status(200).json({
        success: true,
        data: user,
    });
}));
// @desc    Update user
// @route   PATCH /api/v1/users/:id
// @access  Private/Admin
exports.updateUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.params.id);
    if (!user) {
        res.status(404);
        return next(new Error('User not found'));
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    const updatedUser = yield user.save();
    res.status(200).json({
        success: true,
        data: updatedUser,
    });
}));
