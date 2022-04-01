import { Request, Response, NextFunction } from 'express';

import products from '../data/products';

export const getAllProducts = (req: Request, res: Response, next: NextFunction) => {
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      data: products,
    },
  });
};

export const getProduct = (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.productId;
  const product = products.find(p => p._id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};
