const mongoose = require('mongoose');
const config = require('config');
const logger = require('./logger');

module.exports = function () {
	mongoose.set('useNewUrlParser', true);
	mongoose.set('useFindAndModify', false);
	mongoose.set('useCreateIndex', true);
	// console.log(config.get('dbUrl'));

	mongoose.connect(config.get('dbUrl')).then(() => {
		logger.info('DB connected');
	});
}