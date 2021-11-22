import faker from 'faker';
faker.locale = 'pt_BR';

function deliveryFactory(userId, complaintId) {
    return {
        userId,
        date: faker.date.past(),
        review: true,
        complaintId,
        comments: faker.random.alphaNumeric(10),
    };
}

function reviewFactory() {
    return {
        date: faker.date.past(),
        review: true,
        complaint: faker.random.alphaNumeric(10),
        comments: faker.random.alphaNumeric(10),
    };
}

function incorrectReviewFactory() {
    return {
        date: faker.datatype.string(),
        review: faker.random.alphaNumeric(10),
        complaint: faker.datatype.number(),
        comments: null,
    };
}

export { deliveryFactory, reviewFactory, incorrectReviewFactory };
