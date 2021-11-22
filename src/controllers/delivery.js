import databaseError from '../helpers/databaseError.js';
import {
    getDeliveries,
    getComplaintIdByName,
    updateDelivery,
} from '../database/deliveries.js';
import { getUserIdByToken } from '../database/sessions.js';
import validateReview from '../validations/reviewValidation.js';

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

async function postReview(req, res) {
    const validation = validateReview(req.body);
    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }

    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        const complaintId = (await getComplaintIdByName(req.body.complaint))
            .rows[0]?.id;
        const userId = (await getUserIdByToken(token)).rows[0].id;
        await updateDelivery(
            userId,
            req.body.date,
            req.body.review,
            complaintId || null,
            req.body.comments
        );
        return res.send();
    } catch (error) {
        return databaseError(res, error);
    }
}

export { getUserDeliveries, postReview };
