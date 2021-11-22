import Joi from 'joi';

const schema = Joi.object({
    date: Joi.date().required(),
    review: Joi.boolean().required(),
    complaint: Joi.string().allow(null).required(),
    comments: Joi.string().allow(null).required(),
});

export default function validateReview(body) {
    return schema.validate(body);
}
