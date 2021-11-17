import Joi from 'joi';

const schema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net'] },
		})
		.required(),
	password: Joi.string().min(3).required(),
	repeatPassword: Joi.ref('password'),
});

export default function validateSignUp(body) {
	return schema.validate(body);
}
