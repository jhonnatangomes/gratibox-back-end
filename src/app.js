import '../dotenv/setup.js';
import express from 'express';
import cors from 'cors';

import signUp from './controllers/signUp.js';
import login from './controllers/login.js';
import subscribeToPlan from './controllers/plans.js';
import {
    getPlansAndProducts,
    getDeliveryDates,
} from './controllers/plansData.js';

import auth from './middlewares/auth.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/plans', auth);

app.post('/sign-up', signUp);
app.post('/login', login);
app.post('/plans', subscribeToPlan);
app.get('/plans/info', getPlansAndProducts);
app.get('/plans/:planType/dates', getDeliveryDates);

export default app;
