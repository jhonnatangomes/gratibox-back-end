import app from '../src/app.js';
import supertest from 'supertest';

import endConnection from '../src/database/endConnection.js';
import { insertUser } from '../src/database/users.js';
import { getSessionsByUserEmail } from '../src/database/sessions.js';
import clearDatabase from '../src/database/clearDatabase.js';

import signUpFactory from './factories/signUpFactory.js';
import numberFactory from './factories/numberFactory.js';
import stringFactory from './factories/stringFactory.js';
import { emailFactory, encryptPassword } from './factories/loginFactory.js';

afterAll(async () => {
    await clearDatabase();
    endConnection();
});

beforeAll(async () => {
    await clearDatabase();
});

describe('post /login', () => {
    const signUpBody = signUpFactory();

    beforeAll(async () => {
        await insertUser(
            signUpBody.name,
            signUpBody.email,
            encryptPassword(signUpBody.password)
        );
    });

    it('returns 400 for an incorrect body sent', async () => {
        const result = await supertest(app)
            .post('/login')
            .send({ email: numberFactory(), password: '' });
        expect(result.status).toEqual(400);
    });

    it('returns 401 for an incorrect email', async () => {
        const result = await supertest(app)
            .post('/login')
            .send({ email: emailFactory(), password: signUpBody.password });
        expect(result.status).toEqual(401);
    });

    it('returns 401 for an incorrect password', async () => {
        const result = await supertest(app)
            .post('/login')
            .send({ email: signUpBody.email, password: stringFactory() });
        expect(result.status).toEqual(401);
    });

    it('returns 200 for a correct user', async () => {
        const result = await supertest(app)
            .post('/login')
            .send({ email: signUpBody.email, password: signUpBody.password });
        const session = await getSessionsByUserEmail(signUpBody.email);

        expect(result.status).toEqual(200);
        expect(result.body).toHaveProperty('name');
        expect(result.body).toHaveProperty('token');
        expect(session.rowCount).toEqual(1);
    });
});
