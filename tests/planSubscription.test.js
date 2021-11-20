import app from '../src/app.js';
import supertest from 'supertest';

import endConnection from '../src/database/endConnection.js';
import {
    insertPlan,
    insertDeliveryDate,
    insertProducts,
    getPlan,
    getUsersProducts,
} from '../src/database/plans.js';
import { getCity, getState, getAdress } from '../src/database/adresses.js';
import { insertUser } from '../src/database/users.js';
import { insertSession } from '../src/database/sessions.js';
import clearDatabase from '../src/database/clearDatabase.js';

import { planFactory, incorrectPlanFactory } from './factories/planFactory.js';
import { encryptPassword } from './factories/loginFactory.js';
import signUpFactory from './factories/signUpFactory.js';
import tokenFactory from './factories/tokenFactory.js';
import stringFactory from './factories/stringFactory.js';

const plan = planFactory();
const token = tokenFactory();

afterAll(async () => {
    await clearDatabase();
    endConnection();
});

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
    await insertProducts(plan.products[0]);
    await insertProducts(plan.products[1]);
    await insertProducts(plan.products[2]);
});

describe('post /plans', () => {
    it('returns 401 when no token is sent', async () => {
        const result = await supertest(app).post('/plans').send(plan);
        expect(result.status).toEqual(401);
    });

    it('returns 400 when a non-token is sent', async () => {
        const result = await supertest(app)
            .post('/plans')
            .send(plan)
            .set('Authorization', `Bearer ${stringFactory()}`);
        expect(result.status).toEqual(400);
    });

    it('returns 401 when a non-existent uuid is sent', async () => {
        const result = await supertest(app)
            .post('/plans')
            .send(plan)
            .set('Authorization', `Bearer ${tokenFactory()}`);
        expect(result.status).toEqual(401);
    });

    it('returns 400 when an incorrect body is sent', async () => {
        const result = await supertest(app)
            .post('/plans')
            .send(incorrectPlanFactory())
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(400);
    });

    it('returns 200, inserts adress in database if it doesnt exist there and creates a plan', async () => {
        const result = await supertest(app)
            .post('/plans')
            .send(plan)
            .set('Authorization', `Bearer ${token}`);
        const city = await getCity(plan.deliveryInfo.city);
        const state = await getState(plan.deliveryInfo.state);
        const adress = await getAdress(
            plan.deliveryInfo.adress,
            plan.deliveryInfo.zipcode,
            city.rows[0].id,
            state.rows[0].id
        );
        const planSearch = await getPlan(plan.planType);
        const usersProducts = await getUsersProducts(plan.products[0]);
        const usersProducts2 = await getUsersProducts(plan.products[1]);
        const usersProducts3 = await getUsersProducts(plan.products[2]);

        expect(result.status).toEqual(200);
        expect(city.rows[0].name).toEqual(plan.deliveryInfo.city);
        expect(state.rows[0].name).toEqual(plan.deliveryInfo.state);
        expect(adress.rows[0].adress).toEqual(plan.deliveryInfo.adress);
        expect(adress.rows[0].zipcode).toEqual(plan.deliveryInfo.zipcode);
        expect(planSearch.rowCount).toEqual(1);
        expect(usersProducts.rowCount).toEqual(1);
        expect(usersProducts2.rowCount).toEqual(1);
        expect(usersProducts3.rowCount).toEqual(1);
    });

    it('returns 200 and doesnt insert adress if it already exists', async () => {
        const result = await supertest(app)
            .post('/plans')
            .send(plan)
            .set('Authorization', `Bearer ${token}`);

        const city = await getCity(plan.deliveryInfo.city);
        const state = await getState(plan.deliveryInfo.state);
        const adress = await getAdress(
            plan.deliveryInfo.adress,
            plan.deliveryInfo.zipcode,
            city.rows[0].id,
            state.rows[0].id
        );
        expect(result.status).toEqual(200);
        expect(city.rowCount).toEqual(1);
        expect(state.rowCount).toEqual(1);
        expect(adress.rowCount).toEqual(1);
    });
});
