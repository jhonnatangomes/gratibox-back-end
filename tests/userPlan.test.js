import app from '../src/app.js';
import supertest from 'supertest';

import endConnection from '../src/database/endConnection.js';
import {
    insertPlan,
    insertDeliveryDate,
    insertProducts,
    createPlan,
    createPlanProducts,
} from '../src/database/plans.js';
import { insertUser } from '../src/database/users.js';
import { insertSession } from '../src/database/sessions.js';
import {
    insertAdress,
    insertCity,
    insertState,
} from '../src/database/adresses.js';
import clearDatabase from '../src/database/clearDatabase.js';

import { realisticPlanFactory } from './factories/planFactory.js';
import { encryptPassword } from './factories/loginFactory.js';
import signUpFactory from './factories/signUpFactory.js';
import tokenFactory from './factories/tokenFactory.js';
import stringFactory from './factories/stringFactory.js';

const plan = realisticPlanFactory();
const token = tokenFactory();
let userId, planId, deliveryDateId, productId;

afterAll(async () => {
    await clearDatabase();
    endConnection();
});

beforeAll(async () => {
    await clearDatabase();
    const signUpBody = signUpFactory();

    userId = (
        await insertUser(
            signUpBody.name,
            signUpBody.email,
            encryptPassword(signUpBody.password)
        )
    ).rows[0].id;
    await insertSession(userId, token);
    planId = (await insertPlan(plan.planType)).rows[0].id;
    deliveryDateId = (await insertDeliveryDate(planId, plan.deliveryDate))
        .rows[0].id;
    productId = (await insertProducts(plan.products[0])).rows[0].id;

    await insertProducts(plan.products[1]);
    await insertProducts(plan.products[2]);
});

describe('get /plans', () => {
    afterEach(async () => {
        const cityId = (await insertCity(plan.deliveryInfo.city)).rows[0].id;
        const stateId = (await insertState(plan.deliveryInfo.state)).rows[0].id;
        const adressId = (
            await insertAdress(
                plan.deliveryInfo.adress,
                plan.deliveryInfo.zipcode,
                cityId,
                stateId
            )
        ).rows[0].id;

        await createPlan(userId, planId, deliveryDateId, adressId);
        await createPlanProducts(userId, productId);
    });

    it('returns 204 and an empty string when there are no plans for that user', async () => {
        const result = await supertest(app)
            .get('/plans')
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(204);
        expect(result.body).toEqual({});
    });

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

    it('returns 200 for a logged in user and an object', async () => {
        const result = await supertest(app)
            .get('/plans')
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(200);
        expect(result.body).toHaveProperty('planType');
        expect(result.body).toHaveProperty('subscriptionDate');
        expect(result.body).toHaveProperty('deliveryDates');
        expect(result.body).toHaveProperty('selectedProducts');
    });
});
