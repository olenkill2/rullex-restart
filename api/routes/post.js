const post = require('../controllers/postController.js');
const { validateBody, schemas } = require('../helpers/validator');
const { isAdmin } = require('../helpers/isAdmin');
const passport = require('passport');
const passportConf = require('../passport');

module.exports = function(app, db)
{
	app.post('/post', passport.authenticate('jwt', {session: false}), isAdmin, post.add);
	app.put('/post/:id', passport.authenticate('jwt', {session: false}), isAdmin, post.update);
	app.delete('/post/:id', passport.authenticate('jwt', {session: false}), isAdmin, post.delete);
	app.get('/post/:id', post.getPost);
	app.get('/post', post.getAll);
	app.get('/page-seo', post.getSeo);
}