import faker from 'faker-br';

export default function tokenFactory() {
    return faker.random.uuid();
}
