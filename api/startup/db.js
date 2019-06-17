const mongoose = require('mongoose');
const config = require('config');
const logger = require('./logger');

module.exports = function () {
	mongoose.set('useNewUrlParser', true);
	mongoose.set('useFindAndModify', false);
	mongoose.set('useCreateIndex', true);

	mongoose.connect(config.get('dbUrl')).then(() => {
		logger.info('DB connected');
	});
}