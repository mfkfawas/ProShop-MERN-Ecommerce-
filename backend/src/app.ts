import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import globalErrorHandler from './middleware/globalErrorHandler';
import productRouter from './routes/productRoute';
import userRouter from './routes/userRoute';
import orderRouter from './routes/orderRoute';
import uploadRouter from './routes/uploadRoute';

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/upload', uploadRouter);

app.get('/api/config/paypal', (req: Request, res: Response) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const dirname = path.resolve();
app.use('/uploads', express.static(path.join(dirname, '../../uploads')));

//
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  next(new Error(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

export default app;
