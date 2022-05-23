import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  updatePassword,
  getUsers,
  deleteUser,
} from '../controller/userController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// always use admin middleware after protect middleware.
router.route('/').post(registerUser).get(protect, admin, getUsers);

router.route('/:id').delete(protect, admin, deleteUser);

router.route('/login').post(authUser);

router.route('/profile').get(protect, getUserProfile).patch(protect, updateUserProfile);

router.patch('/updateMyPassword', protect, updatePassword);

export default router;
