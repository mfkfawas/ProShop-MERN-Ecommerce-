import express from 'express';
import { addOrderItems } from '../controller/orderController';
import protect from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(protect, addOrderItems);

export default router;
