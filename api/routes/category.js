const category = require('../controllers/categoryController.js');
const { validateBody, schemas } = require('../middleware/validator');
const { isAdmin } = require('../middleware/isAdmin');
const passport = require('passport');
const {JWT_auth} = require('../passport');

module.exports = function(app, db)
{
	app.post('/category', JWT_auth, isAdmin, validateBody(schemas.category), category.add);
	app.get('/category', JWT_auth, isAdmin, validateBody(schemas.category), category.get);
}