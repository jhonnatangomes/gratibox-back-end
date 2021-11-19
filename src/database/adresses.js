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
    return connection.query(
        'INSERT INTO cities (name) VALUES ($1) RETURNING id',
        [cityName]
    );
}

function insertState(stateName) {
    return connection.query(
        'INSERT INTO states (name) VALUES ($1) RETURNING id',
        [stateName]
    );
}

function insertAdress(adress, zipcode, cityId, stateId) {
    return connection.query(
        'INSERT INTO adresses (adress, zipcode, city_id, state_id) VALUES ($1, $2, $3, $4) RETURNING id',
        [adress, zipcode, cityId, stateId]
    );
}

function deleteCities() {
    return connection.query('DELETE FROM cities');
}

function deleteStates() {
    return connection.query('DELETE FROM states');
}

function deleteAdresses() {
    return connection.query('DELETE FROM adresses');
}

export {
    getCity,
    getState,
    getAdress,
    insertCity,
    insertState,
    insertAdress,
    deleteCities,
    deleteStates,
    deleteAdresses,
};
