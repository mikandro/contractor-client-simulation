import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './routes/adminRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(bodyParser.json());
app.use('/admin', adminRoutes);

app.use(errorHandler);

export default app;
