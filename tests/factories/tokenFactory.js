import faker from 'faker';
faker.locale = 'pt_BR';

export default function tokenFactory() {
    return faker.datatype.uuid();
}
