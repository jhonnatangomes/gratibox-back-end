import databaseError from '../helpers/databaseError.js';
import validatePlan from '../validations/planValidation.js';
import {
    getPlan,
    getDeliveryDate,
    getProduct,
    createPlan,
    createPlanProducts,
    getUserProducts,
    getPlanInfo,
} from '../database/plans.js';
import {
    getCity,
    getState,
    getAdress,
    insertCity,
    insertState,
    insertAdress,
} from '../database/adresses.js';
import { getUserIdByToken } from '../database/sessions.js';
import nextDeliveries from '../helpers/nextDeliveries.js';

async function subscribeToPlan(req, res) {
    const validation = validatePlan(req.body);
    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }
    const { deliveryInfo } = req.body;
    const { city, state } = deliveryInfo;
    const token = req.headers.authorization?.replace('Bearer ', '');

    try {
        let cityId;
        const cityResult = await getCity(city);
        if (!cityResult.rowCount) {
            cityId = (await insertCity(city)).rows[0].id;
        } else {
            cityId = cityResult.rows[0].id;
        }

        let stateId;
        const stateResult = await getState(state);
        if (!stateResult.rowCount) {
            stateId = (await insertState(state)).rows[0].id;
        } else {
            stateId = stateResult.rows[0].id;
        }

        let adressId;
        const adressResult = await getAdress(
            deliveryInfo.adress,
            deliveryInfo.zipcode,
            cityId,
            stateId
        );
        if (!adressResult.rowCount) {
            adressId = (
                await insertAdress(
                    deliveryInfo.adress,
                    deliveryInfo.zipcode,
                    cityId,
                    stateId
                )
            ).rows[0].id;
        } else {
            adressId = adressResult.rows[0].id;
        }

        const userId = (await getUserIdByToken(token)).rows[0].id;
        const planId = (await getPlan(req.body.planType)).rows[0].id;
        const deliveryDateId = (await getDeliveryDate(req.body.deliveryDate))
            .rows[0].id;
        await createPlan(userId, planId, deliveryDateId, adressId);

        await Promise.all(
            req.body.products.map(async (product) => {
                const productResult = await getProduct(product);
                const productId = productResult.rows[0].id;
                await createPlanProducts(userId, productId);
            })
        );

        return res.send();
    } catch (error) {
        return databaseError(res, error);
    }
}

async function getUserPlan(req, res) {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        const userId = (await getUserIdByToken(token)).rows[0].id;

        const planResult = await getPlanInfo(userId);
        if (!planResult.rowCount) {
            return res.sendStatus(204);
        }

        const productsResult = await getUserProducts(userId);
        const nextDates = nextDeliveries(
            planResult.rows[0].delivery_date,
            planResult.rows[0].plan_type
        );

        return res.send({
            planType: planResult.rows[0].plan_type,
            subscriptionDate: planResult.rows[0].subscription_date,
            deliveryDates: nextDates,
            selectedProducts: productsResult.rows,
        });
    } catch (error) {
        return databaseError(res, error);
    }
}

export { subscribeToPlan, getUserPlan };
