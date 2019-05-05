const mode = require('../controllers/modeController.js');
const { validateBody, schemas } = require('../helpers/validator');
const { isAdmin } = require('../helpers/isAdmin');
const passport = require('passport');
const passportConf = require('../passport');

module.exports = function(app, db)
{
	app.post('/mode', passport.authenticate('jwt', {session: false}), isAdmin, mode.add);
	app.get('/mode/:name',  mode.getByName);
	app.get('/mode', passport.authenticate('jwt', {session: false}), isAdmin, mode.getAll);
	app.delete('/mode/:id', passport.authenticate('jwt', {session: false}), isAdmin, mode.delete);
	app.put('/mode/:id', passport.authenticate('jwt', {session: false}), isAdmin, mode.update);
}