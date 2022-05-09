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

      // const createdOrder = await order.save();

      res.status(201).json('createdOrder');
    }
  }
);

// @desc    Get Order by ID
// @route   GET /api/v1/orders/:id
// @access  Private
export const getOrderById = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.id).populate('user', ['name', 'email']);
    console.log(order);

    if (!order) {
      res.status(404);
      return next(new Error('Order not found'));
    }

    res.status(200).json(order);
  }
);