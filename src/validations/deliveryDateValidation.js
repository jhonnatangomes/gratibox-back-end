import Joi from 'joi';

const schema = Joi.object({
    planType: Joi.string().required(),
});

export default function validateDeliveryDate(planType) {
    return schema.validate({ planType });
}
