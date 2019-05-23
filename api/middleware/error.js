const logger = require('../startup/logger');

module.exports = (err, req, res, next) => {
	logger.log({
		level: 'error',
		url: req.originalUrl,
		message: err.message,
		stack: err,
	});

	res.status(500).send('Что-то сломалось... Наверное');
}