import express from 'express';

import { getAllProducts, getProduct } from '../controller/productController';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:productId', getProduct);

export default router;
