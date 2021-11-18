import Joi from 'joi';

const schema = Joi.object({
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'br'] },
        })
        .required(),
    password: Joi.string().min(3).required(),
});

export default function validateLogin(body) {
    return schema.validate(body);
}
