import faker from 'faker';
faker.locale = 'pt_BR';

export default function numberFactory() {
	return faker.datatype.number();
}
