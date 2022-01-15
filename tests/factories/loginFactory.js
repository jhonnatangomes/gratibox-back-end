import faker from 'faker-br';
import bcrypt from 'bcrypt';

function emailFactory() {
    return faker.internet.email();
}

function encryptPassword(password) {
    return bcrypt.hashSync(password, 10);
}

export { emailFactory, encryptPassword };
