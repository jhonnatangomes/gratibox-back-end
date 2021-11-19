import connection from './connection.js';

function insertPlan(planType) {
    return connection.query(
        'INSERT INTO plans (type) VALUES ($1) RETURNING id',
        [planType]
    );
}

function insertDeliveryDate(planId, deliveryDate) {
    return connection.query(
        'INSERT INTO delivery_dates (plan_id, date) VALUES ($1, $2)',
        [planId, deliveryDate]
    );
}

function insertProducts(products) {
    return connection.query('INSERT INTO products (name) VALUES ($1)', [
        products,
    ]);
}

function deletePlans() {
    return connection.query('DELETE FROM plans');
}

function deleteDeliveryDates() {
    return connection.query('DELETE FROM delivery_dates');
}

function deleteProducts() {
    return connection.query('DELETE FROM products');
}

function deleteUsersPlans() {
    return connection.query('DELETE FROM users_plans');
}

function deleteUsersProducts() {
    return connection.query('DELETE FROM users_products');
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

function getPlan(planType) {
    return connection.query('SELECT * FROM plans WHERE type = $1', [planType]);
}

function getUsersProducts(productsName) {
    return connection.query(
        `
        SELECT products.*, users_products.user_id FROM
        users_products JOIN products
        ON users_products.product_id = products.id
        WHERE products.name = $1
    `,
        [productsName]
    );
}

function getDeliveryDate(deliveryDate) {
    return connection.query('SELECT * FROM delivery_dates WHERE date = $1', [
        deliveryDate,
    ]);
}

function getProducts(productsName) {
    return connection.query('SELECT * FROM products WHERE name = $1', [
        productsName,
    ]);
}

export {
    insertPlan,
    insertDeliveryDate,
    insertProducts,
    createPlan,
    createPlanProducts,
    getPlan,
    getUsersProducts,
    getDeliveryDate,
    getProducts,
    deletePlans,
    deleteDeliveryDates,
    deleteProducts,
    deleteUsersPlans,
    deleteUsersProducts,
};
