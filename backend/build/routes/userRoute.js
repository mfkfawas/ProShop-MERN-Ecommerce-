"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// always use admin middleware after protect middleware.
router.route('/').post(userController_1.registerUser).get(authMiddleware_1.protect, authMiddleware_1.admin, userController_1.getUsers);
router.route('/:id').delete(authMiddleware_1.protect, authMiddleware_1.admin, userController_1.deleteUser);
router.route('/login').post(userController_1.authUser);
router.route('/profile').get(authMiddleware_1.protect, userController_1.getUserProfile).patch(authMiddleware_1.protect, userController_1.updateUserProfile);
router.patch('/updateMyPassword', authMiddleware_1.protect, userController_1.updatePassword);
exports.default = router;
