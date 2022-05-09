"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./middleware/globalErrorHandler"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
}));
app.use('/api/v1/products', productRoute_1.default);
app.use('/api/v1/users', userRoute_1.default);
app.use('/api/v1/orders', orderRoute_1.default);
//
app.all('*', (req, res, next) => {
    res.status(404);
    next(new Error(`Can't find ${req.originalUrl} on this server!`));
});
app.use(globalErrorHandler_1.default);
exports.default = app;
