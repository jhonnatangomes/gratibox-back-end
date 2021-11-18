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

export { getCity, getState, getAdress };
