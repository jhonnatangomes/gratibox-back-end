import databaseError from '../helpers/databaseError.js';
import {
    getAllPlans,
    getAllProducts,
    getAllDeliveryDates,
} from '../database/plans.js';
import deliveryDateValidation from '../validations/deliveryDateValidation.js';

async function getPlansAndProducts(req, res) {
    try {
        const plans = await getAllPlans();
        const products = await getAllProducts();

        return res.send({ plans: plans.rows, products: products.rows });
    } catch (error) {
        return databaseError(res, error);
    }
}

async function getDeliveryDates(req, res) {
    const { planType } = req.headers;
    const validation = deliveryDateValidation(planType);
    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }
    try {
        const deliveryDates = await getAllDeliveryDates(planType);
        return res.send(deliveryDates.rows);
    } catch (error) {
        return databaseError(res, error);
    }
}

export { getPlansAndProducts, getDeliveryDates };
