const userRoutes = require('./user');
const adminRoutes = require('./admin');
const menuRoutes = require('./menu');
const category = require('./category');

module.exports = function(app, db)
{
	adminRoutes(app);
	userRoutes(app);
	menuRoutes(app);
	category(app);
}