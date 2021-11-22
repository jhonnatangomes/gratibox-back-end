import Joi from 'joi';

const schema = Joi.object({
    date: Joi.date().required(),
    review: Joi.boolean().required(),
    complaint: Joi.string().required(),
    comments: Joi.string().required(),
});

export default function validateReview(body) {
    return schema.validate(body);
}
