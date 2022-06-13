"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const globalErrorHandler_1 = __importDefault(require("./middleware/globalErrorHandler"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const uploadRoute_1 = __importDefault(require("./routes/uploadRoute"));
const app = (0, express_1.default)();
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
}));
app.use('/api/v1/products', productRoute_1.default);
app.use('/api/v1/users', userRoute_1.default);
app.use('/api/v1/orders', orderRoute_1.default);
app.use('/api/v1/upload', uploadRoute_1.default);
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));
const dirname = path_1.default.resolve();
app.use('/uploads', express_1.default.static(path_1.default.join(dirname, '../../uploads')));
//
app.all('*', (req, res, next) => {
    res.status(404);
    next(new Error(`Can't find ${req.originalUrl} on this server!`));
});
app.use(globalErrorHandler_1.default);
exports.default = app;
