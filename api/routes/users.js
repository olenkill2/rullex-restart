const user = require('../controllers/usersController.js');
const { validateBody, schemas } = require('../middleware/validator');
const passport = require('passport');
const {JWT_auth, Local_auth, Google_auth} = require('../passport');

module.exports = function(app)
{
	app.post('/signup', validateBody(schemas.newUser), user.signUp);
	app.post('/signin', Local_auth, user.signIn);
	app.post('/oauth/google', Google_auth, user.oauthGoogle);
	app.post('/signin-token', JWT_auth, user.signIn);
}