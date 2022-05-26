"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controller/productController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route('/').get(productController_1.getAllProducts).post(authMiddleware_1.protect, authMiddleware_1.admin, productController_1.CreateProduct);
router
    .route('/:productId')
    .get(productController_1.getProduct)
    .delete(authMiddleware_1.protect, authMiddleware_1.admin, productController_1.deleteProduct)
    .patch(authMiddleware_1.protect, authMiddleware_1.admin, productController_1.UpdateProduct);
exports.default = router;
