import databaseError from '../helpers/databaseError.js';
import { getDeliveries } from '../database/deliveries.js';
import { getUserIdByToken } from '../database/sessions.js';

async function getUserDeliveries(req, res) {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        const userId = (await getUserIdByToken(token)).rows[0].id;
        const deliveries = await getDeliveries(userId);
        if (!deliveries.rowCount) {
            return res.sendStatus(204);
        }

        return res.send(deliveries.rows);
    } catch (error) {
        return databaseError(res, error);
    }
}

export default getUserDeliveries;
