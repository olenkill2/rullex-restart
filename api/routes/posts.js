const router = require('express').Router();
const post = require('../controllers/postsController.js');
const validateBody = require('../middleware/validator');
const { isAdmin } = require('../middleware/isAdmin');
const {JWT_auth} = require('../passport');

router
	.route('/')
	.post(JWT_auth, isAdmin, validateBody('post'), post.add)
	.get(post.getAll);

router
	.route('/:id')
	.put(JWT_auth, isAdmin, validateBody('post'), isAdmin, post.update)
	.delete(JWT_auth, isAdmin, post.delete);

router
	.route('/public/')
	.get(post.getPost);

// app.put('/posts/:id',;
// app.delete('/posts/:id', );

module.exports = router;