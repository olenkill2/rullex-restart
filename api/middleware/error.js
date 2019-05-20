const winston = require('winston');

const logger = winston.createLogger({
	// level: 'info',
	format: winston.format.json(),
	defaultMeta: { time: Date() },
	transports: [
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
		new winston.transports.File({ filename: 'combined.log' })
	]
});
process.on('uncaughtException', (err) => {
	logger.log({
		level: 'error',
		message: err.message,
		info: err,
	});
	process.exit(1);
});
process.on('unhandledRejection', (err) => {
	logger.log({
		level: 'error',
		message: err.message,
		info: err,
	});
	process.exit(1);
});
module.exports = (err, req, res, next) => {
	console.log(req);

	logger.log({
		level: 'error',
		url: req.originalUrl,
		message: err.message,
		info: err,
	});
	// (err.message, err);
	res.status(500).send('Что-то сломалось... Наверное');
}