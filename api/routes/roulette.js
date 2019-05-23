const roulette = require('../controllers/rouletteController.js');
const { validateBody, schemas } = require('../middleware/validator');
const { isAdmin } = require('../middleware/isAdmin');
const passport = require('passport');
const {JWT_auth} = require('../passport');

module.exports = function(app, db)
{
	app.post('/roulette', JWT_auth, isAdmin, validateBody(schemas.roulette), roulette.add);
	app.get('/roulette/:id', JWT_auth, isAdmin, roulette.getOne);
	app.put('/roulette/:id', JWT_auth, isAdmin, validateBody(schemas.roulette), roulette.update);
	app.delete('/roulette/:id', JWT_auth, isAdmin, roulette.delete);
	app.get('/roulette', JWT_auth, isAdmin, roulette.getAll);
}