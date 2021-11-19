import databaseError from '../helpers/databaseError.js';
import {
    getAllPlans,
    getAllProducts,
    getAllDeliveryDates,
} from '../database/plans.js';

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
    try {
        const { planType } = req.params;
        const deliveryDates = await getAllDeliveryDates(planType);
        return res.send(deliveryDates.rows);
    } catch (error) {
        return databaseError(res, error);
    }
}

export { getPlansAndProducts, getDeliveryDates };
