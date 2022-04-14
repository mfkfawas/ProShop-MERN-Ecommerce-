import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import globalErrorHandler from './middleware/globalErrorHandler';
import productRouter from './routes/productRoute';
import userRouter from './routes/userRoute';

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

//
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  next(new Error(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

export default app;
