import express from 'express';
import cors from 'cors';

import productRouter from './routes/productRoute';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use('/api/products', productRouter);

export default app;
