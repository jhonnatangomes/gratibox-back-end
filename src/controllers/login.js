import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import databaseError from '../helpers/databaseError.js';
import validateLogin from '../validations/loginValidation.js';
import { getUserByEmail } from '../database/users.js';
import { insertSession } from '../database/sessions.js';

export default async function login(req, res) {
    try {
        const { email, password } = req.body;
        const validation = validateLogin(req.body);
        if (validation.error) {
            return res.status(400).send(validation.error.details[0].message);
        }

        const user = await getUserByEmail(email);
        if (
            !user.rowCount ||
            !bcrypt.compareSync(password, user.rows[0].password)
        ) {
            return res.status(401).send('User and/or password incorrect');
        }

        const token = uuid();
        await insertSession(user.rows[0].id, token);
        return res.send({
            name: user.rows[0].name,
            token,
        });
    } catch (error) {
        return databaseError(res, error);
    }
}
