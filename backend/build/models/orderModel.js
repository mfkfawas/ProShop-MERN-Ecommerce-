"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderItemsSchema = new mongoose_1.default.Schema({
    name: { type: String, required: [true, 'Please provide the name of the product'] },
    qty: { type: Number, required: [true, 'Please provide the quantity of the product'] },
    price: { type: Number, required: [true, 'Please provide the price of the product'] },
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, 'Please provide the product'],
        ref: 'Product',
    },
});
const orderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, 'Please provide the user who ordered item.'],
        ref: 'User',
    },
    orderItems: [orderItemsSchema],
    shippingAddress: {
        address: { type: String, required: [true, 'Please provide the shipping address.'] },
        city: { type: String, required: [true, 'Please provide the shipping city.'] },
        postalCode: { type: String, required: [true, 'Please provide the shipping postal code.'] },
        country: { type: String, required: [true, 'Please provide the shipping country.'] },
    },
    paymentMethod: {
        type: String,
        required: [true, 'Please provide a payment method.'],
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    taxPrice: {
        type: Number,
        required: [true, 'Please provide a tax price.'],
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        required: [true, 'Please provide a shipping price.'],
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: [true, 'Please provide a total price.'],
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        required: [true, 'Please provide a payment status.'],
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: [true, 'Please provide a delivery status.'],
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
}, {
    timestamps: true,
});
const Order = mongoose_1.default.model('Order', orderSchema);
exports.default = Order;
