import express from 'express';

import {
  CreateProduct,
  createProductReview,
  deleteProduct,
  getAllProducts,
  getProduct,
  UpdateProduct,
} from '../controller/productController';
import { admin, protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getAllProducts).post(protect, admin, CreateProduct);

router
  .route('/:productId')
  .get(getProduct)
  .delete(protect, admin, deleteProduct)
  .patch(protect, admin, UpdateProduct);

router.route('/:productId/reviews').post(protect, createProductReview);

export default router;
