const Joi = require('joi');

const validateData = (data, schema) => {
	const options = { abortEarly: false };
	const errors = Joi.validate(data, schema, options);
	return errors.error ? buildUsefulErrorObject(errors.error.details) : null;
};

const buildUsefulErrorObject = (errors) => {
	const usefulErrors = {
		inValid: !!errors.length,
		errors: {}
	};
	errors.map((error) => {
		if (!usefulErrors.hasOwnProperty(error.path.join('_'))) {
			usefulErrors.errors[error.path.join('_')] = {
				msg: error.message,
			};
		}
	});
	return usefulErrors;
};

const schemas = {
	newUser: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required().min(6).max(255)
	}).options({ allowUnknown: true }),

	category: Joi.object().keys({
		category: Joi.string().required().min(4).max(200),
	}).options({ allowUnknown: true }),

	post: Joi.object().keys({
		category: Joi.required(),
		name: Joi.string().required().min(3).max(512),
		url: Joi.string().required().min(1).max(512),
		title: Joi.string().required().min(3).max(512),
		description: Joi.string().required().min(3).max(512),
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
		color: Joi.string().required(),
		functions: Joi.object().required(),
		modes: Joi.array().required(),
		referal: Joi.object().required(),
	}).options({ allowUnknown: true }),

	menu: Joi.object().keys({
		name: Joi.string().required(),
		url: Joi.string().required().min(1).max(2024),
		order: Joi.number().required().min(0),
		private: Joi.boolean().required(),
	}).options({ allowUnknown: true }),
};

module.exports = (schema) => {
	return (req, res, next) => {
		const errors = validateData(req.body, schemas[schema]);

		if(errors)
			return res.status(400).json(errors);

		next();
	}
}