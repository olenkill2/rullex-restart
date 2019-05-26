const usersRoutes = require('./users');
const adminRoutes = require('./admin');
const menuRoutes = require('./menu');
const categorysRoutes = require('./categorys');
const postsRoutes = require('./posts');
const modesRoutes = require('./modes');
const roulettesRoutes = require('./roulettes');
const error = require('../middleware/error');

module.exports = function(app, db)
{
	adminRoutes(app);
	usersRoutes(app);
	menuRoutes(app);
	categorysRoutes(app);
	postsRoutes(app);
	modesRoutes(app);
	roulettesRoutes(app);
	app.use(error);
}