import express from 'express';
import { authUser, getUserProfile, registerUser } from '../controller/userController';
import protect from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(registerUser);

router.route('/login').post(authUser);

router.route('/profile').get(protect, getUserProfile);

export default router;
