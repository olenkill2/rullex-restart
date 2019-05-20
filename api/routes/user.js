const user = require('../controllers/userController.js');
const { validateBody, schemas } = require('../middleware/validator');
const passport = require('passport');
const {JWT_auth} = require('../passport');

module.exports = function(app)
{
	app.post('/signup', validateBody(schemas.newUser), user.signUp);
	app.post('/signin', passport.authenticate('local', {session: false}), user.signIn);
	app.post('/signin-token', JWT_auth, user.signIn);
}