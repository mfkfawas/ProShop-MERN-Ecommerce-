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
exports.deleteProduct = exports.getProduct = exports.getAllProducts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const productModel_1 = __importDefault(require("../models/productModel"));
// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getAllProducts = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productModel_1.default.find({});
    if (!products) {
        res.status(404);
        return next(new Error('No products found'));
    }
    // SEND RESPONSE
    res.status(200).json(products);
}));
// @desc    Get single product
// @route   GET /api/v1/products/:productId
// @access  Public
exports.getProduct = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const product = yield productModel_1.default.findById(productId);
    if (!product) {
        res.status(404);
        return next(new Error('Product not found'));
    }
    res.status(200).json(product);
}));
// @desc    Delete a product
// @route   DELETE /api/v1/products/:productId
// @access  Private/Admin
exports.deleteProduct = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const product = yield productModel_1.default.findById(productId);
    if (!product) {
        res.status(404);
        return next(new Error('Product not found'));
    }
    yield product.remove();
    res.status(204).json({ success: true, data: null });
}));
