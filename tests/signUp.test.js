import app from '../src/app.js';
import supertest from 'supertest';

import endConnection from '../src/database/endConnection.js';
import { deleteUsers } from '../src/database/users.js';

import stringFactory from './factories/stringFactory.js';
import numberFactory from './factories/numberFactory.js';
import signUpFactory from './factories/signUpFactory.js';

afterAll(async () => {
    await deleteUsers();
    endConnection();
});

beforeAll(async () => {
    await deleteUsers();
});

describe('post /sign-up', () => {
    const signUpBody = signUpFactory();

    it('returns 400 for an empty body sent', async () => {
        const result = await supertest(app).post('/sign-up').send({});
        expect(result.status).toEqual(400);
    });

    it('returns 400 for an incorrect body sent', async () => {
        const result = await supertest(app).post('/sign-up').send({
            name: stringFactory(),
            email: numberFactory(),
            password: '',
        });
        expect(result.status).toEqual(400);
    });

    it('returns 200 when a correct user is sent', async () => {
        const result = await supertest(app).post('/sign-up').send(signUpBody);
        expect(result.status).toEqual(200);
    });

    it('returns 409 when an already added email is sent', async () => {
        const result = await supertest(app).post('/sign-up').send(signUpBody);
        expect(result.status).toEqual(409);
    });
});
