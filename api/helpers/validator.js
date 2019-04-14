const Joi = require('joi');

module.exports = {
	validateBody: (schema) => {
		return (req, res, next) => {
			console.log(req.body);
			const result = Joi.validate(req.body, schema);
			if(result.error)
				return res.status(400).json(result.error);

			next();
		}
	},

	schemas: {
		signUpShema: Joi.object().keys({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			confirmPassword: Joi.string().required().valid(Joi.ref('password'))
		}),
		categoryShema: Joi.object().keys({
			category: Joi.string().required(),
		}),
	}
}