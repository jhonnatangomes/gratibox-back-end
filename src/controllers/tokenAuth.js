import databaseError from '../helpers/databaseError.js';
import { getSessionsByToken } from '../database/sessions.js';

export default async function tokenAuth(req, res) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    try {
        const session = await getSessionsByToken(token);
        if (!session.rowCount) {
            return res.sendStatus(401);
        }
        return res.send();
    } catch (error) {
        return databaseError(res, error);
    }
}
