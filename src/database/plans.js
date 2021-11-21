import connection from './connection.js';

function insertPlan(planType) {
    return connection.query(
        'INSERT INTO plans (type) VALUES ($1) RETURNING id',
        [planType]
    );
}

function insertDeliveryDate(planId, deliveryDate) {
    return connection.query(
        'INSERT INTO delivery_dates (plan_id, date) VALUES ($1, $2) RETURNING id',
        [planId, deliveryDate]
    );
}

function insertProducts(products) {
    return connection.query(
        'INSERT INTO products (name) VALUES ($1) returning ID',
        [products]
    );
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
        'INSERT INTO users_plans (user_id, plan_id, delivery_date_id, adress_id, subscription_date) VALUES ($1, $2, $3, $4, now())',
        [userId, planId, deliveryDateId, adressId]
    );
}

function createPlanProducts(userId, productId) {
    return connection.query(
        'INSERT INTO users_products (user_id, product_id) VALUES ($1, $2) RETURNING id',
        [userId, productId]
    );
}

function getPlan(planType) {
    return connection.query('SELECT * FROM plans WHERE type = $1', [planType]);
}

function getUserProducts(userId) {
    return connection.query(
        `
        SELECT products.*, users_products.user_id FROM
        products JOIN users_products 
        ON users_products.product_id = products.id
        WHERE users_products.user_id = $1
    `,
        [userId]
    );
}

function getDeliveryDate(deliveryDate) {
    return connection.query('SELECT * FROM delivery_dates WHERE date = $1', [
        deliveryDate,
    ]);
}

function getProduct(productName) {
    return connection.query('SELECT * FROM products WHERE name = $1', [
        productName,
    ]);
}

function getPlanInfo(userId) {
    return connection.query(
        `
        SELECT plans.type AS plan_type, users_plans.subscription_date,
        delivery_dates.date AS delivery_date
        FROM plans JOIN users_plans
        ON users_plans.plan_id = plans.id
        JOIN delivery_dates
        ON users_plans.delivery_date_id = delivery_dates.id
        WHERE users_plans.user_id = $1
    `,
        [userId]
    );
}

export {
    insertPlan,
    insertDeliveryDate,
    insertProducts,
    createPlan,
    createPlanProducts,
    getPlan,
    getUserProducts,
    getDeliveryDate,
    getProduct,
    deletePlans,
    deleteDeliveryDates,
    deleteProducts,
    deleteUsersPlans,
    deleteUsersProducts,
    getPlanInfo,
};
