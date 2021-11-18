import bcrypt from 'bcrypt';
import databaseError from '../helpers/databaseError.js';
import validateSignUp from '../validations/signUpValidation.js';
import { getUserByEmail, insertUser } from '../database/users.js';

export default async function signUp(req, res) {
    try {
        const { name, email, password } = req.body;
        const validation = validateSignUp(req.body);
        if (validation.error) {
            return res.status(400).send(validation.error.details[0].message);
        }

        const user = await getUserByEmail(email);
        if (user.rowCount) {
            return res.sendStatus(409);
        }

        const encryptedPassword = bcrypt.hashSync(password, 10);
        await insertUser(name, email, encryptedPassword);
        return res.send();
    } catch (error) {
        return databaseError(res, error);
    }
}
