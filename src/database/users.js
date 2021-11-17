import connection from './connection.js';

function getUserByEmail(email) {
	return connection.query('SELECT * FROM users WHERE email = $1', [email]);
}

function insertUser(name, email, password) {
	return connection.query(
		'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
		[name, email, password],
	);
}

function deleteUsers() {
	return connection.query('DELETE FROM users;');
}

export { getUserByEmail, insertUser, deleteUsers };
