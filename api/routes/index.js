const adminRoutes = require('./admin');
const usersRoutes = require('./users');
const menuRoutes = require('./menu');
const categorysRoutes = require('./categorys');
const postsRoutes = require('./posts');
const modesRoutes = require('./modes');
const roulettesRoutes = require('./roulettes');
const error = require('../middleware/error');

module.exports = function(app, db)
{
	app.use('/api/v1/admin', adminRoutes);
	app.use('/api/v1/users', usersRoutes);
	app.use('/api/v1/roulettes', roulettesRoutes);
	app.use('/api/v1/posts', postsRoutes);
	app.use('/api/v1/modes', modesRoutes);
	app.use('/api/v1/menu', menuRoutes);
	app.use(error);
}