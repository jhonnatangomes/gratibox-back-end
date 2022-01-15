import faker from 'faker-br';

export default function stringFactory() {
    return faker.random.word();
}
