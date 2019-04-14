const user = require('../controllers/userController.js');
const { validateBody, schemas } = require('../helpers/validator');
const passport = require('passport');
const passportConf = require('../passport');

module.exports = function(app)
{
	app.post('/signup', validateBody(schemas.signUpShema), user.signUp);
	app.post('/signin', passport.authenticate('local', {session: false}), user.signIn);
	app.post('/signin-token', passport.authenticate('jwt', {session: false}), user.signIn);
}