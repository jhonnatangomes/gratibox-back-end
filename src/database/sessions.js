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

function getSessionsByToken(token) {
    return connection.query('SELECT * FROM sessions WHERE token = $1', [token]);
}

function getUserIdByToken(token) {
    return connection.query(
        `
        SELECT users.id FROM users JOIN sessions
        ON sessions.user_id = users.id
        WHERE sessions.token = $1
    `,
        [token]
    );
}

function deleteSessions() {
    return connection.query('DELETE FROM sessions');
}

export {
    insertSession,
    getSessionsByUserEmail,
    getSessionsByToken,
    getUserIdByToken,
    deleteSessions,
};
