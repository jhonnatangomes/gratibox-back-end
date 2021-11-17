import faker from 'faker';
faker.locale = 'pt_BR';

export default function signUpFactory() {
	const password = faker.datatype.string();
	return {
		name: faker.name.findName(),
		email: faker.internet.email(),
		password,
		repeatPassword: password,
	};
}
