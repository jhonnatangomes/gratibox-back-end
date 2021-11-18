import databaseError from '../helpers/databaseError.js';
import validatePlan from '../validations/planValidation.js';
import { getUserByName } from '../database/users.js';
import {
    checkPlan,
    checkDeliveryDate,
    checkProducts,
} from '../database/plans.js';

async function subscribeToPlan(req, res) {
    const validation = validatePlan(req.body);
    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }

    try {
        const planType = await checkPlan(req.body.planType);
        if (!planType.rowCount) {
            return res.status(404).send(`The requested plan doesn't exist`);
        }

        const deliveryDate = await checkDeliveryDate(req.body.deliveryDate);
        if (!deliveryDate.rowCount) {
            return res
                .status(404)
                .send(`The requested delivery date doesn't exist`);
        }

        const products = await checkProducts(req.body.products);
        if (!products.rowCount) {
            return res.status(404).send(`The requested products don't exist`);
        }

        const user = await getUserByName(req.body.deliveryInfo.name);
        if (!user.rowCount) {
            return res
                .status(404)
                .send(`This name isn't registered on database`);
        }

        return res.send();
    } catch (error) {
        return databaseError(res, error);
    }
}

export default subscribeToPlan;
