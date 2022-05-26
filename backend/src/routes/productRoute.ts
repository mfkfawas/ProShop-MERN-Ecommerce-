import express from 'express';

import {
  deleteProduct,
  getAllProducts,
  getProduct,
} from '../controller/productController';
import { admin, protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getAllProducts);
router.route('/:productId').get(getProduct).delete(protect, admin, deleteProduct);

export default router;
