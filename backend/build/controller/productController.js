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
exports.createProductReview = exports.UpdateProduct = exports.CreateProduct = exports.deleteProduct = exports.getProduct = exports.getAllProducts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const productModel_1 = __importDefault(require("../models/productModel"));
// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getAllProducts = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i', // case insensitive
            },
        }
        : {};
    const products = yield productModel_1.default.find(Object.assign({}, keyword));
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
// @desc    Create a product
// @route   POST /api/v1/products
// @access  Private/Admin
exports.CreateProduct = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new productModel_1.default({
        name: 'Product 1 From Thailand',
        description: 'Product 1 description',
        price: 10,
        image: 'https://via.placeholder.com/150',
        user: req.user._id,
        brand: 'Brand 1',
        category: 'Category 1',
        countInStock: 5,
        numReviews: 0,
    });
    const createdProduct = yield product.save();
    res.status(201).json({ success: true, data: createdProduct });
}));
// @desc    Update a product
// @route   PATCH /api/v1/products/:productId
// @access  Private/Admin
exports.UpdateProduct = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, image, brand, category, countInStock, _id } = req.body;
    const product = yield productModel_1.default.findById(req.params.productId);
    if (!product) {
        res.status(404);
        return next(new Error('Product not found'));
    }
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;
    const updatedProduct = yield product.save();
    res.status(200).json({ success: true, data: updatedProduct });
}));
// @desc    Create new review
// @route   POST /api/v1/products/:productId/review
// @access  Private
exports.createProductReview = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating, comment } = req.body;
    const product = yield productModel_1.default.findById(req.params.productId);
    if (!product) {
        res.status(404);
        return next(new Error('Product not found'));
    }
    const alreadyReviewed = product.reviews.some(review => review.user.toString() === req.user._id.toString());
    if (alreadyReviewed) {
        res.status(400);
        return next(new Error('You already reviewed this product'));
    }
    const newReview = {
        name: req.user.name,
        rating: +rating,
        comment: comment,
        user: req.user._id,
    };
    product.reviews.unshift(newReview);
    product.numReviews = product.reviews.length;
    product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;
    yield product.save();
    res.status(201).json({ message: 'Review created successfully' });
}));
