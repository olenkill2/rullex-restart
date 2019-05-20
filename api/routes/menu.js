const menu = require('../controllers/menuController.js');
const passport = require('passport');
const { isAdmin } = require('../middleware/isAdmin');
const {JWT_auth} = require('../passport');
const { validateBody, schemas } = require('../middleware/validator');

module.exports = function(app, db)
{
	app.post('/menu', JWT_auth, isAdmin, validateBody(schemas.menu), menu.add);
	app.put('/menu', JWT_auth, isAdmin, validateBody(schemas.menu), menu.update);
	app.get('/menu', JWT_auth, isAdmin, menu.get);
	app.delete('/menu', JWT_auth, isAdmin, menu.delete);
}