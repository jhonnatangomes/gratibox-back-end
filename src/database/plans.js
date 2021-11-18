import connection from './connection.js';

function getCity(cityName) {
    return connection.query('SELECT * FROM cities WHERE name = $1', [cityName]);
}

function getState(stateName) {
    return connection.query('SELECT * FROM states WHERE name = $1', [
        stateName,
    ]);
}

function getAdress(adress, zipcode, cityId, stateId) {
    return connection.query(
        'SELECT * FROM adresses WHERE adress = $1 AND zipcode = $2 AND city_id = $3 AND state_id = $4',
        [adress, zipcode, cityId, stateId]
    );
}

function insertCity(cityName) {
    return connection.query('INSERT INTO cities (name) VALUES ($1)', [
        cityName,
    ]);
}

function insertState(stateName) {
    return connection.query('INSERT INTO states (name) VALUES ($1)', [
        stateName,
    ]);
}

function insertAdress({ adress, zipcode, cityId, stateId }) {
    return connection.query(
        'INSERT INTO adresses (name, zipcode, city_id, state_id) VALUES ($1, $2, $3, $4) RETURNING id',
        [adress, zipcode, cityId, stateId]
    );
}

function createPlan(userId, planId, deliveryDateId, adressId) {
    return connection.query(
        'INSERT INTO users_plans (user_id, plan_id, delivery_date_id, adress_id) VALUES ($1, $2, $3, $4)',
        [userId, planId, deliveryDateId, adressId]
    );
}

function createPlanProducts(userId, productId) {
    return connection.query(
        'INSERT INTO users_products (user_id, product_id) VALUES ($1, $2)',
        [userId, productId]
    );
}

function getPlanId(planType) {
    return connection.query('SELECT id FROM plans WHERE type = $1', [planType]);
}

function getDeliveryDateId(deliveryDate) {
    return connection.query('SELECT id FROM delivery_dates WHERE date = $1', [
        deliveryDate,
    ]);
}

function getProductsId(productsName) {
    return connection.query('SELECT id FROM products WHERE name = $1', [
        productsName,
    ]);
}

export {
    getCity,
    getState,
    getAdress,
    insertCity,
    insertState,
    insertAdress,
    createPlan,
    createPlanProducts,
    getPlanId,
    getDeliveryDateId,
    getProductsId,
};
