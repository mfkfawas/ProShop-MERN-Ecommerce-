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

// @desc    Create a product
// @route   POST /api/v1/products
// @access  Private/Admin
export const CreateProduct = asyncHandler(
  async (req: Request | any, res: Response, next: NextFunction) => {
    const product = new Product({
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

    const createdProduct = await product.save();
    res.status(201).json({ success: true, data: createdProduct });
  }
);

// @desc    Update a product
// @route   PATCH /api/v1/products/:productId
// @access  Private/Admin
export const UpdateProduct = asyncHandler(
  async (req: Request | any, res: Response, next: NextFunction) => {
    const { name, description, price, image, brand, category, countInStock } = req.body;

    const product = await Product.findById(req.params.productId);

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

    const updatedProduct = await product.save();
    res.status(200).json({ success: true, data: updatedProduct });
  }
);
