"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});
const productSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, 'Please provide the admin user'],
        ref: 'User',
    },
    name: {
        type: String,
        unique: true,
        required: [true, 'A product must have a name.'],
        maxlength: [40, 'A product name must have less or equal to 40 characters.'],
        minlength: [10, 'A product name must have more or equal to 40 characters.'],
    },
    image: {
        type: String,
        required: [true, 'A product must have a image.'],
    },
    brand: {
        type: String,
        required: [true, 'A product must have a brand.'],
    },
    category: {
        type: String,
        required: [true, 'A product must have a category.'],
    },
    description: {
        type: String,
        required: [true, 'A product must have a description.'],
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: (val) => Math.round(val * 10) / 10,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, 'A product must have a price.'],
        default: 0,
    },
    countInStock: {
        type: Number,
        required: [true, 'A product must have its count in stock.'],
        default: 0,
    },
}, {
    timestamps: true,
});
const Product = mongoose_1.default.model('Product', productSchema);
exports.default = Product;
