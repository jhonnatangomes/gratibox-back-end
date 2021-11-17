import faker from 'faker';
faker.locale = 'pt_BR';

export default function stringFactory() {
	return faker.datatype.string();
}
