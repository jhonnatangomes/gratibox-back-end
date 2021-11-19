import Joi from 'joi';

const schema = Joi.object({
    token: Joi.string().uuid({ version: 'uuidv4' }),
});

export default function validateToken(token) {
    return schema.validate({ token });
}
