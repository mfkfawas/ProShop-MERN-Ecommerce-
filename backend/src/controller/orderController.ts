import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

import Order from '../models/orderModel';

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
export const addOrderItems = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (Array.isArray(orderItems) && orderItems.length === 0) {
      res.status(400);
      return next(new Error('No order items'));
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
    }
  }
);

// @desc    Get Order by ID
// @route   GET /api/v1/orders/:id
// @access  Private
export const getOrderById = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.id).populate('user', ['name', 'email']);

    if (!order) {
      res.status(404);
      return next(new Error('Order not found'));
    }

    res.status(200).json(order);
  }
);

// @desc    Update order to paid
// @route   GET /api/v1/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now() as any;
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      } as any;

      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    }
  }
);

// @desc    Get logged in user's orders
// @route   GET /api/v1/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  }
);
