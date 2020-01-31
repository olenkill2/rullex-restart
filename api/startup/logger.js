const winston  = require('winston');
const config = require('config');
require('express-async-errors');
require('winston-mongodb');


const logger = winston.createLogger({
	defaultMeta: { time: Date() },
	transports: [
		new winston.transports.File({ filename: 'info.log', level: 'info' }),
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
		new winston.transports.Console({ colorize: true, prettyPrint: true }),
		new winston.transports.MongoDB({ level: 'error', db: config.get('dbUrl'), options: {useNewUrlParser: true, useUnifiedTopology:true} })
	]
});

module.exports = logger;