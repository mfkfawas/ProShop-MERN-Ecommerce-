"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.getAllProducts = void 0;
const products_1 = __importDefault(require("../data/products"));
const getAllProducts = (req, res, next) => {
    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: products_1.default.length,
        data: {
            data: products_1.default,
        },
    });
};
exports.getAllProducts = getAllProducts;
const getProduct = (req, res, next) => {
    const productId = req.params.productId;
    const product = products_1.default.find(p => p._id === productId);
    if (product) {
        res.status(200).json(product);
    }
    else {
        res.status(404).json({ message: 'Product not found' });
    }
};
exports.getProduct = getProduct;
