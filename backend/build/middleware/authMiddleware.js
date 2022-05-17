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
exports.admin = exports.protect = void 0;
const { promisify } = require('util');
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
exports.protect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1) Getting token & check if its there.
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        res.status(401);
        return next(new Error('You are not logged in!!! Please login to get access'));
    }
    // 2) Verify token
    const decoded = yield promisify(jsonwebtoken_1.default.verify)(token, process.env.JWT_SECRET);
    // 3) Check if user still exists.
    const currentUser = yield userModel_1.default.findById(decoded.id);
    if (!currentUser) {
        res.status(401);
        return next(new Error('The user belonging to this token is no longer exist!'));
    }
    // 4) Check if the user changed password after the token was issued.
    if (yield currentUser.changedPasswordAfterTokenIssued(decoded.iat)) {
        res.status(401);
        return next(new Error('User recently changed password! Please login again.'));
    }
    req.user = currentUser;
    next();
}));
exports.admin = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user.isAdmin) {
        res.status(401);
        return next(new Error('Admins are only authorized to perform this action!'));
    }
    next();
}));
