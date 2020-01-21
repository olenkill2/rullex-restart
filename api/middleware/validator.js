const Joi = require('joi');
const schemas = require('../utils/validationSchemas');

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


module.exports = (schema) => {
	return (req, res, next) => {
		const errors = validateData(req.body, schemas[schema]);

		if(errors)
			return res.status(400).json(errors);

		next();
	}
}