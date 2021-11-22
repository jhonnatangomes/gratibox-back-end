import app from '../src/app.js';
import supertest from 'supertest';

import endConnection from '../src/database/endConnection.js';
import { insertUser } from '../src/database/users.js';
import { insertSession } from '../src/database/sessions.js';
import { insertComplaint, insertDelivery } from '../src/database/deliveries.js';
import clearDatabase from '../src/database/clearDatabase.js';

import { encryptPassword } from './factories/loginFactory.js';
import signUpFactory from './factories/signUpFactory.js';
import tokenFactory from './factories/tokenFactory.js';
import stringFactory from './factories/stringFactory.js';
import deliveryFactory from './factories/deliveryFactory.js';

const token = tokenFactory();
let userId;

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
});

describe('get /deliveries', () => {
    afterEach(async () => {
        const complaintId = (await insertComplaint(stringFactory())).rows[0].id;
        const delivery = deliveryFactory(userId, complaintId);
        await insertDelivery(
            userId,
            delivery.date,
            delivery.review,
            complaintId,
            delivery.comments
        );
        await insertDelivery(
            userId,
            delivery.date,
            delivery.review,
            complaintId,
            delivery.comments
        );
        await insertDelivery(
            userId,
            delivery.date,
            delivery.review,
            complaintId,
            delivery.comments
        );
        await insertDelivery(
            userId,
            delivery.date,
            delivery.review,
            complaintId,
            delivery.comments
        );
    });

    it('returns 204 when there are no deliveries for that user', async () => {
        const result = await supertest(app)
            .get('/deliveries')
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(204);
    });

    it('returns 200 and a list of 3 deliveries when there are deliveries', async () => {
        const result = await supertest(app)
            .get('/deliveries')
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(200);
        expect(result.body.length).toEqual(3);
    });

    it('returns 401 when no token is sent', async () => {
        const result = await supertest(app).get('/deliveries');
        expect(result.status).toEqual(401);
    });

    it('returns 400 when a non-token is sent', async () => {
        const result = await supertest(app)
            .get('/deliveries')
            .set('Authorization', `Bearer ${stringFactory()}`);
        expect(result.status).toEqual(400);
    });

    it('returns 401 when a non-existent uuid is sent', async () => {
        const result = await supertest(app)
            .get('/deliveries')
            .set('Authorization', `Bearer ${tokenFactory()}`);
        expect(result.status).toEqual(401);
    });
});
