import faker from 'faker-br';

export default function signUpFactory() {
    const password = faker.random.word();
    return {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password,
        repeatPassword: password,
    };
}
