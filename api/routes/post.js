const post = require('../controllers/postController.js');
const { validateBody, schemas } = require('../middleware/validator');
const { isAdmin } = require('../middleware/isAdmin');
const passport = require('passport');
const {JWT_auth} = require('../passport');

module.exports = function(app, db)
{
	app.post('/post', JWT_auth, isAdmin, validateBody(schemas.post), post.add);
	app.put('/post/:id', JWT_auth, isAdmin, validateBody(schemas.post), isAdmin, post.update);
	app.delete('/post/:id', JWT_auth, isAdmin, post.delete);
	app.get('/post/:id', post.getPost);
	app.get('/post', post.getAll);
	app.get('/page-seo', post.getSeo);
}