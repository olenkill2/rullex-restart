const roulette = require('../controllers/rouletteController.js');
const { validateBody, schemas } = require('../helpers/validator');
const { isAdmin } = require('../helpers/isAdmin');
const passport = require('passport');
const passportConf = require('../passport');

module.exports = function(app, db)
{
	app.post('/roulette', passport.authenticate('jwt', {session: false}), isAdmin, roulette.add);
	app.get('/roulette', passport.authenticate('jwt', {session: false}), isAdmin, category.getAll);
}