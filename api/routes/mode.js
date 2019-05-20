const mode = require('../controllers/modeController.js');
const { validateBody, schemas } = require('../middleware/validator');
const { isAdmin } = require('../middleware/isAdmin');
const passport = require('passport');
const {JWT_auth} = require('../passport');

module.exports = function(app, db)
{
	app.post('/mode', JWT_auth, isAdmin, validateBody(schemas.mode), mode.add);
	app.put('/mode/:id', JWT_auth, isAdmin, validateBody(schemas.mode), mode.update);
	app.delete('/mode/:id', JWT_auth, isAdmin, mode.delete);
	app.get('/mode', JWT_auth, isAdmin, mode.getAll);
	app.get('/mode/:name',  mode.getByName);
}