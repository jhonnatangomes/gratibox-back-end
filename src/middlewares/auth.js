import databaseError from '../helpers/databaseError.js';
import validateToken from '../validations/tokenValidation.js';
import { getSessionsByToken } from '../database/sessions.js';

export default async function auth(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return res.sendStatus(401);
    }

    const validation = validateToken(token);
    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }

    try {
        const session = await getSessionsByToken(token);
        if (!session.rowCount) {
            return res.sendStatus(401);
        }
        return next();
    } catch (error) {
        return databaseError(res, error);
    }
}
