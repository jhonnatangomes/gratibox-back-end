import faker from 'faker';
faker.locale = 'pt_BR';

function planFactory() {
    return {
        planType: faker.random.alphaNumeric(10),
        deliveryDate: faker.random.alphaNumeric(10),
        products: [
            faker.random.alphaNumeric(10),
            faker.random.alphaNumeric(10),
            faker.random.alphaNumeric(10),
        ],
        deliveryInfo: {
            name: faker.random.alphaNumeric(10),
            adress: faker.random.alphaNumeric(10),
            zipcode: faker.random.alphaNumeric(10),
            city: faker.random.alphaNumeric(10),
            state: faker.random.alphaNumeric(10),
        },
    };
}

function incorrectPlanFactory() {
    return {
        planType: faker.datatype.number(),
        deliveryDate: faker.datatype.uuid(),
        products: faker.datatype.array(),
        deliveryInfo: {
            name: faker.datatype.boolean(),
            adress: faker.datatype.datetime(),
            zipcode: faker.datatype.float(),
            city: faker.datatype.hexaDecimal(),
            state: faker.datatype.string(),
        },
    };
}

export { planFactory, incorrectPlanFactory };
