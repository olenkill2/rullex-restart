const winston = require('winston');
const config = require('config');
require('express-async-errors');
require('winston-mongodb');

process.on('uncaughtException', (err) => {
	logger.error(err.message, err);
	process.exit(1);
});
process.on('unhandledRejection', (err) => {
	throw err;
});

const logger = winston.createLogger({
	// format: winston.format.json(),
	defaultMeta: { time: Date() },
	transports: [
		new winston.transports.File({ filename: 'info.log', level: 'info' }),
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
		new winston.transports.Console({ colorize: true, prettyPrint: true,  }),
		new winston.transports.MongoDB({ db: config.get('dbUrl') })
	]
});

module.exports = logger;