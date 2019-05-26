const roulette = require('../controllers/roulettesController.js');
const { validateBody, schemas } = require('../middleware/validator');
const { isAdmin } = require('../middleware/isAdmin');
const passport = require('passport');
const {JWT_auth} = require('../passport');

module.exports = function(app, db)
{
	app.get('/public/roulettes', roulette.getAllPublicRoulettes);
	app.get('/public/roulette/:host', roulette.getOnePublicRoulette);
	app.post('/roulettes', JWT_auth, isAdmin, validateBody(schemas.roulette), roulette.add);
	app.put('/roulettes/:id', JWT_auth, isAdmin, validateBody(schemas.roulette), roulette.update);
	app.delete('/roulettes/:id', JWT_auth, isAdmin, roulette.delete);
	app.get('/roulettes', JWT_auth, isAdmin, roulette.getAll);
}