const Joi = require('joi');

module.exports = {
	validateBody: (schema) => {
		return (req, res, next) => {
			console.log(req.body);

			const result = Joi.validate(req.body, schema);
			console.log(result.error);

			if(result.error)
				return res.status(400).json(result.error);

			next();
		}
	},

	schemas: {
		newUser: Joi.object().keys({
			email: Joi.string().email().required(),
			password: Joi.string().required().min(6).max(255),
			confirmPassword: Joi.string().required().valid(Joi.ref('password'))
		}).options({ allowUnknown: true }),
		category: Joi.object().keys({
			category: Joi.string().required().min(4).max(200),
		}).options({ allowUnknown: true }),
		post: Joi.object().keys({
			category: Joi.string().required(),
			name: Joi.string().required().min(3).max(512),
			url: Joi.string().required().min(3).max(512),
			title: Joi.string().required().min(3).max(512),
			description: Joi.string().required().min(3).max(512),
			content: Joi.string().required(),
			private: Joi.boolean().required(),
		}).options({ allowUnknown: true }),
		mode: Joi.object().keys({
			name: Joi.string().required().min(3).max(256),
			fields: Joi.array().required(),
		}).options({ allowUnknown: true }),
		roulette: Joi.object().keys({
			name: Joi.string().required().min(3).max(512),
			host: Joi.string().required().min(3).max(2024),
			private: Joi.boolean().required(),
			authValidationRuleFunction: Joi.string().required(),
			balanceParseFunction: Joi.string().required(),
			gameFunctionForMode: Joi.array().required(),
			referalChangeFunction: Joi.string().required(),
			referal: Joi.object().required(),
		}).options({ allowUnknown: true }),
		menu: Joi.object().keys({
			name: Joi.string().required().min(3).max(512),
			url: Joi.string().required().min(3).max(2024),
			order: Joi.number().required().min(0),
			category: Joi.string().required(),
			private: Joi.boolean().required(),
		}).options({ allowUnknown: true }),
	}
}