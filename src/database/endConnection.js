import connection from './connection.js';

export default function endConnection() {
	connection.end();
}
