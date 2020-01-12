const router = require('express').Router();
const mode = require('../controllers/modesController.js');
const validateBody = require('../middleware/validator');
const { isAdmin } = require('../middleware/isAdmin');
const {JWT_auth} = require('../passport');

router
	.route('/')
	.get(JWT_auth, isAdmin, mode.getAll)
	.post(JWT_auth, isAdmin, validateBody('mode'), mode.add);

router
	.route('/:id')
	.get(mode.getPublicMode)
	.put(JWT_auth, isAdmin, validateBody('mode'), mode.update)
	.delete(JWT_auth, isAdmin, mode.delete);

module.exports = router;