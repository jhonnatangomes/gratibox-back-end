import faker from 'faker-br';

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
        planType: faker.random.number(),
        deliveryDate: faker.random.uuid(),
        products: faker.random.arrayElement(),
        deliveryInfo: {
            name: faker.random.boolean(),
            adress: faker.random.word(),
            zipcode: faker.random.float(),
            city: faker.random.hexaDecimal(),
            state: faker.random.word(),
        },
    };
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function realisticPlanFactory() {
    const plans = {
        Semanal: ['Segunda', 'Quarta', 'Sexta'],
        Mensal: ['Dia 01', 'Dia 10', 'Dia 20'],
    };
    const planType = Object.keys(plans)[getRandomInt(0, 1)];
    const deliveryDate = plans[planType][getRandomInt(0, 2)];
    return {
        planType,
        deliveryDate,
        products: [
            faker.random.alphaNumeric(10),
            faker.random.alphaNumeric(10),
            faker.random.alphaNumeric(10),
        ],
        deliveryInfo: {
            name: faker.random.boolean(),
            adress: faker.random.word(),
            zipcode: faker.random.float(),
            city: faker.random.hexaDecimal(),
            state: faker.random.word(),
        },
    };
}

export { planFactory, incorrectPlanFactory, realisticPlanFactory };
