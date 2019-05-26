const mode = require('../controllers/modesController.js');
const { validateBody, schemas } = require('../middleware/validator');
const { isAdmin } = require('../middleware/isAdmin');
const passport = require('passport');
const {JWT_auth} = require('../passport');

module.exports = function(app, db)
{
	app.post('/modes', JWT_auth, isAdmin, validateBody(schemas.mode), mode.add);
	app.put('/modes/:id', JWT_auth, isAdmin, validateBody(schemas.mode), mode.update);
	app.delete('/modes/:id', JWT_auth, isAdmin, mode.delete);
	app.get('/modes', JWT_auth, isAdmin, mode.getAll);
	app.get('/modes/:id',  mode.getPublicMode);
}