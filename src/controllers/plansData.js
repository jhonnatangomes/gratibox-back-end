import databaseError from '../helpers/databaseError.js';
import {
    getAllPlans,
    getAllProducts,
    getAllDeliveryDates,
} from '../database/plans.js';

async function getPlans(req, res) {
    try {
        const plans = await getAllPlans();

        return res.send(plans.rows);
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

async function getProducts(req, res) {
    try {
        const products = await getAllProducts();
        return res.send(products.rows);
    } catch (error) {
        return databaseError(res, error);
    }
}

export { getPlans, getDeliveryDates, getProducts };
