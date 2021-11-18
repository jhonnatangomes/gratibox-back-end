import connection from './connection.js';

function insertSession(userId, token) {
    return connection.query(
        'INSERT INTO sessions (user_id, token) VALUES ($1, $2)',
        [userId, token]
    );
}

function getSessionsByUserEmail(email) {
    return connection.query(
        'SELECT sessions.* FROM users JOIN sessions ON sessions.user_id = users.id WHERE users.email = $1',
        [email]
    );
}

function deleteSessions() {
    return connection.query('DELETE FROM sessions');
}

export { insertSession, getSessionsByUserEmail, deleteSessions };
