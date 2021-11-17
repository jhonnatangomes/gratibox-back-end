import '../dotenv/setup.js';
import express from 'express';
import cors from 'cors';

import signUp from './controllers/signUp.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-up', signUp);

export default app;
