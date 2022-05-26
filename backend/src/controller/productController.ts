import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

import Product from '../models/productModel';

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
export const getAllProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find({});

    if (!products) {
      res.status(404);
      return next(new Error('No products found'));
    }

    // SEND RESPONSE
    res.status(200).json(products);
  }
);

// @desc    Get single product
// @route   GET /api/v1/products/:productId
// @access  Public
export const getProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404);
      return next(new Error('Product not found'));
    }

    res.status(200).json(product);
  }
);

// @desc    Delete a product
// @route   DELETE /api/v1/products/:productId
// @access  Private/Admin
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404);
      return next(new Error('Product not found'));
    }

    await product.remove();
    res.status(204).json({ success: true, data: null });
  }
);
