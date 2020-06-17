const router = require('express').Router();
const post = require('../controllers/postsController.js');
const validateBody = require('../middleware/validator');
const { isAdmin } = require('../middleware/isAdmin');
const {JWT_auth} = require('../passport');

router
	.route('/')
	.post(JWT_auth, isAdmin, validateBody('post'), post.add)
	.get(JWT_auth, isAdmin, post.getAll);

router
	.route('/:id')
	.put(JWT_auth, isAdmin, validateBody('post'), isAdmin, post.update)
	.delete(JWT_auth, isAdmin, post.delete);

router
	.route('/public/:slug')
	.get(post.getPost);

module.exports = router;
