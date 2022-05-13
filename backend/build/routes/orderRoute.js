"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controller/orderController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.route('/').post(authMiddleware_1.default, orderController_1.addOrderItems);
router.route('/:id').get(authMiddleware_1.default, orderController_1.getOrderById);
router.route('/:id/pay').patch(authMiddleware_1.default, orderController_1.updateOrderToPaid);
exports.default = router;
