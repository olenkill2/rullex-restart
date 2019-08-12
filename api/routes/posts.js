const post = require('../controllers/postsController.js');
const { validateBody, schemas } = require('../middleware/validator');
const { isAdmin } = require('../middleware/isAdmin');
const {JWT_auth} = require('../passport');

module.exports = function(app, db)
{
	app.post('/testing', (req, res) => {
		console.log(req.body);
		res.status(200).json({success: true})
	});
	app.post('/posts', JWT_auth, isAdmin, validateBody(schemas.post), post.add);
	app.put('/posts/:id', JWT_auth, isAdmin, validateBody(schemas.post), isAdmin, post.update);
	app.delete('/posts/:id', JWT_auth, isAdmin, post.delete);
	app.get('/posts/:id', post.getPost);
	app.get('/posts', post.getAll);
	app.get('/page-seo', post.getSeo);
}