import '../dotenv/setup.js';
import express from 'express';
import cors from 'cors';

import signUp from './controllers/signUp.js';
import login from './controllers/login.js';
import { subscribeToPlan, getUserPlan } from './controllers/plans.js';
import tokenAuth from './controllers/tokenAuth.js';
import { getUserDeliveries, postReview } from './controllers/delivery.js';

import auth from './middlewares/auth.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/plans', auth);
app.use('/deliveries', auth);
app.use('/review', auth);

app.post('/sign-up', signUp);
app.post('/login', login);
app.post('/plans', subscribeToPlan);
app.get('/plans', getUserPlan);
app.post('/token', tokenAuth);
app.get('/deliveries', getUserDeliveries);
app.post('/review', postReview);

export default app;
