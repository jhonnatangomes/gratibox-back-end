import Joi from 'joi';

const schema = Joi.object({
    planType: Joi.string().required(),
    deliveryDate: Joi.string().required(),
    products: Joi.string().required(),
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
