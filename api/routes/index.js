const userRoutes = require('./user');
const adminRoutes = require('./admin');
const menuRoutes = require('./menu');
const categoryRoutes = require('./category');
const postRoutes = require('./post');
const modeRoutes = require('./mode');
const rouletteRoutes = require('./roulette');

module.exports = function(app, db)
{
	adminRoutes(app);
	userRoutes(app);
	menuRoutes(app);
	categoryRoutes(app);
	postRoutes(app);
	modeRoutes(app);
	rouletteRoutes(app);
}