const category = require('../controllers/categoryController.js');
const { validateBody, schemas } = require('../helpers/validator');
const { isAdmin } = require('../helpers/isAdmin');
const passport = require('passport');
const passportConf = require('../passport');

module.exports = function(app, db)
{
	app.post('/category', passport.authenticate('jwt', {session: false}), isAdmin, category.add);
	app.get('/category', passport.authenticate('jwt', {session: false}), isAdmin, category.get);
}