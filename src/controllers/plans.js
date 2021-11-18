import databaseError from '../helpers/databaseError.js';
import validatePlan from '../validations/planValidation.js';

async function subscribeToPlan(req, res) {
    const validation = validatePlan(req.body);
    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }

    try {
        return res.send();
    } catch (error) {
        return databaseError(res, error);
    }
}

export default subscribeToPlan;
