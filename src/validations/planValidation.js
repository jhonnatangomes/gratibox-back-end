import Joi from 'joi';

const schema = Joi.object({
    planType: Joi.string().required(),
    deliveryDate: Joi.string().required(),
    products: Joi.array().items(Joi.string()),
    deliveryInfo: {
        name: Joi.string().required(),
        adress: Joi.string().required(),
        zipcode: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
    },
});

export default function validatePlan(body) {
    return schema.validate(body);
}
