import app from '../src/app.js';
import supertest from 'supertest';

import endConnection from '../src/database/endConnection.js';
import clearDatabase from '../src/database/clearDatabase.js';
import { insertSession } from '../src/database/sessions.js';
import { insertUser } from '../src/database/users.js';

import signUpFactory from './factories/signUpFactory.js';
import { encryptPassword } from './factories/loginFactory.js';
import tokenFactory from './factories/tokenFactory.js';

afterAll(async () => {
    await clearDatabase();
    endConnection();
});

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
});

describe('post /token', () => {
    it('returns 200 for a correct token', async () => {
        const result = await supertest(app)
            .post('/token')
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(200);
    });
});
