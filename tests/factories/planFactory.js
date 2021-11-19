import faker from 'faker';
faker.locale = 'pt_BR';

function planFactory() {
    return {
        planType: faker.random.alphaNumeric(),
        deliveryDate: faker.datatype.string(),
        products: faker.datatype.string(),
        deliveryInfo: {
            name: faker.datatype.string(),
            adress: faker.datatype.string(),
            zipcode: faker.datatype.string(),
            city: faker.datatype.string(),
            state: faker.datatype.string(),
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
