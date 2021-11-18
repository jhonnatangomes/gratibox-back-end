import faker from 'faker';
import bcrypt from 'bcrypt';
faker.locale = 'pt_BR';

function emailFactory() {
    return faker.internet.email();
}

function encryptPassword(password) {
    return bcrypt.hashSync(password, 10);
}

export { emailFactory, encryptPassword };
