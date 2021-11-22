import connection from './connection.js';

function getDeliveries(userId) {
    return connection.query(
        `
        SELECT deliveries.* FROM deliveries JOIN users
        ON deliveries.user_id = users.id
        WHERE user_id = $1
        ORDER BY date DESC
        LIMIT 3
    `,
        [userId]
    );
}

function insertDelivery(userId, date, review, complaintId, comments) {
    return connection.query(
        `
        INSERT INTO deliveries (user_id, date, review, complaint_id, comments)
        VALUES ($1, $2, $3, $4, $5)
    `,
        [userId, date, review, complaintId, comments]
    );
}

function insertComplaint(complaintName) {
    return connection.query(
        'INSERT INTO complaints (name) VALUES ($1) RETURNING id',
        [complaintName]
    );
}

function deleteDeliveries() {
    return connection.query('DELETE FROM deliveries');
}

function deleteComplaints() {
    return connection.query('DELETE FROM complaints');
}

export {
    getDeliveries,
    insertDelivery,
    insertComplaint,
    deleteComplaints,
    deleteDeliveries,
};
