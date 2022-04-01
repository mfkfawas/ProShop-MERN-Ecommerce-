import express from 'express';

import productRouter from './routes/productRoute';

const app = express();

app.use('/api/products', productRouter);

export default app;
