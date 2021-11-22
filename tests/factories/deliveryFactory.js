import faker from 'faker';
faker.locale = 'pt_BR';

export default function deliveryFactory(userId, complaintId) {
    return {
        userId,
        date: faker.date.past(),
        review: true,
        complaintId,
        comments: faker.random.alphaNumeric(10),
    };
}
