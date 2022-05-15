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
exports.getMyOrders = exports.updateOrderToPaid = exports.getOrderById = exports.addOrderItems = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const orderModel_1 = __importDefault(require("../models/orderModel"));
// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
exports.addOrderItems = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, } = req.body;
    if (Array.isArray(orderItems) && orderItems.length === 0) {
        res.status(400);
        return next(new Error('No order items'));
    }
    else {
        const order = new orderModel_1.default({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        const createdOrder = yield order.save();
        res.status(201).json(createdOrder);
    }
}));
// @desc    Get Order by ID
// @route   GET /api/v1/orders/:id
// @access  Private
exports.getOrderById = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.default.findById(req.params.id).populate('user', ['name', 'email']);
    if (!order) {
        res.status(404);
        return next(new Error('Order not found'));
    }
    res.status(200).json(order);
}));
// @desc    Update order to paid
// @route   GET /api/v1/orders/:id/pay
// @access  Private
exports.updateOrderToPaid = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.default.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };
        const updatedOrder = yield order.save();
        res.status(200).json(updatedOrder);
    }
}));
// @desc    Get logged in user's orders
// @route   GET /api/v1/orders/myorders
// @access  Private
exports.getMyOrders = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield orderModel_1.default.find({ user: req.user._id });
    res.status(200).json(orders);
}));
