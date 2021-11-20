import app from '../src/app.js';
import supertest from 'supertest';

import endConnection from '../src/database/endConnection.js';
import clearDatabase from '../src/database/clearDatabase.js';
import { insertSession } from '../src/database/sessions.js';
import { insertUser } from '../src/database/users.js';
import {
    insertPlan,
    insertDeliveryDate,
    insertProducts,
} from '../src/database/plans.js';

import signUpFactory from './factories/signUpFactory.js';
import { encryptPassword } from './factories/loginFactory.js';
import tokenFactory from './factories/tokenFactory.js';
import stringFactory from './factories/stringFactory.js';
import { planFactory } from './factories/planFactory.js';

afterAll(async () => {
    await clearDatabase();
    endConnection();
});

const plan = planFactory();
const token = tokenFactory();

beforeAll(async () => {
    await clearDatabase();

    const signUpBody = signUpFactory();
    const userId = (
        await insertUser(
            signUpBody.name,
            signUpBody.email,
            encryptPassword(signUpBody.password)
        )
    ).rows[0].id;
    await insertSession(userId, token);
    const planId = (await insertPlan(plan.planType)).rows[0].id;
    await insertDeliveryDate(planId, plan.deliveryDate);
    await insertProducts(plan.products);
});

describe('get /plans', () => {
    it('returns 401 when no token is sent', async () => {
        const result = await supertest(app).get('/plans');
        expect(result.status).toEqual(401);
    });

    it('returns 400 when a non-token is sent', async () => {
        const result = await supertest(app)
            .get('/plans')
            .set('Authorization', `Bearer ${stringFactory()}`);
        expect(result.status).toEqual(400);
    });

    it('returns 401 when a non-existent uuid is sent', async () => {
        const result = await supertest(app)
            .get('/plans')
            .set('Authorization', `Bearer ${tokenFactory()}`);
        expect(result.status).toEqual(401);
    });

    it('returns 200 and an object containing plans and products', async () => {
        const result = await supertest(app)
            .get('/plans')
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(200);
        expect(result.body.length).toEqual(1);
    });
});

describe('get /plans/:planType/dates', () => {
    it('returns 200 and delivery dates', async () => {
        const result = await supertest(app)
            .get(`/plans/${plan.planType}/dates`)
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(200);
        expect(result.body.length).toEqual(1);
    });
});

describe('get /plans/products', () => {
    it('returns 200 and delivery dates', async () => {
        const result = await supertest(app)
            .get(`/plans/products`)
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(200);
        expect(result.body.length).toEqual(1);
    });
});
