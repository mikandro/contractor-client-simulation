import express from 'express';
import bodyParser from 'body-parser';
import contractsRoutes from './routes/contractsRoutes';
import jobsRoutes from './routes/jobsRoutes';
import balancesRoutes from './routes/balancesRoutes';
import adminRoutes from './routes/adminRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(bodyParser.json());
app.use('/contracts', contractsRoutes);
app.use('/jobs', jobsRoutes);
app.use('/balances', balancesRoutes);
app.use('/admin', adminRoutes);

app.use(errorHandler);

export default app;
