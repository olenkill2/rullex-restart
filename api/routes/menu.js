const menu = require('../controllers/menuController.js');
// const { validateBody, schemas } = require('../helpers/validator');
const passport = require('passport');
const { isAdmin } = require('../helpers/isAdmin');
const passportConf = require('../passport');

module.exports = function(app, db)
{
	// app.post('/menu/', passport.authenticate('local', {session: false}), menu.add);
	app.post('/menu', passport.authenticate('jwt', {session: false}), isAdmin, menu.add);
	app.get('/menu', passport.authenticate('jwt', {session: false}), isAdmin, menu.get);
	app.put('/menu', passport.authenticate('jwt', {session: false}), isAdmin, menu.update);
	app.delete('/menu', passport.authenticate('jwt', {session: false}), isAdmin, menu.delete);
}