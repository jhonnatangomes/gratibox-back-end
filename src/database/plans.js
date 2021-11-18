import connection from './connection.js';

function checkPlan(planName) {
    return connection.query('SELECT * FROM plans WHERE type = $1', [planName]);
}

function checkDeliveryDate(deliveryDate) {
    return connection.query('SELECT * FROM delivery_dates WHERE date = $1', [
        deliveryDate,
    ]);
}

function checkProducts(productsName) {
    return connection.query('SELECT * FROM products WHERE name = $1', [
        productsName,
    ]);
}

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

export {
    checkPlan,
    checkDeliveryDate,
    checkProducts,
    getCity,
    getState,
    getAdress,
};
