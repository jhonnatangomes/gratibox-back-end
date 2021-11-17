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

export { getUserByEmail, insertUser };
