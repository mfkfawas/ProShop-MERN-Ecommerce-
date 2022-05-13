import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from '../controller/orderController';
import protect from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').patch(protect, updateOrderToPaid);

export default router;
