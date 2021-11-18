import databaseError from '../helpers/databaseError.js';
import validatePlan from '../validations/planValidation.js';
import {
    getCity,
    getState,
    getAdress,
    insertCity,
    insertState,
    insertAdress,
    getPlanId,
    getDeliveryDateId,
    getProductsId,
    createPlan,
    createPlanProducts,
} from '../database/plans.js';
import { getUserIdByToken } from '../database/sessions.js';

async function subscribeToPlan(req, res) {
    const validation = validatePlan(req.body);
    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }
    const { deliveryInfo: adress } = req.body;
    const { city, state } = adress;
    const token = req.headers.authorization?.replace('Bearer ', '');

    try {
        const cityResult = await getCity(city);
        if (!cityResult.rowCount) {
            await insertCity(city);
        }

        const stateResult = await getState(state);
        if (!stateResult.rowCount) {
            await insertState(state);
        }

        let adressId;
        const adressResult = await getAdress(adress);
        if (!adressResult.rowCount) {
            adressId = (await insertAdress(adress)).rows[0].id;
        } else {
            adressId = adressResult.rows[0].id;
        }

        const userId = (await getUserIdByToken(token)).rows[0].id;
        const planId = (await getPlanId(req.body.planType)).rows[0].id;
        const deliveryDateId = (await getDeliveryDateId(req.body.deliveryDate))
            .rows[0].id;
        const productId = (await getProductsId(req.body.products)).rows[0].id;

        await createPlan(userId, planId, deliveryDateId, adressId);
        await createPlanProducts(userId, productId);
        return res.send();
    } catch (error) {
        return databaseError(res, error);
    }
}

export default subscribeToPlan;
