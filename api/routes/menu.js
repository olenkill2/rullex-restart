const router = require('express').Router();
const menu = require('../controllers/menuController.js');
const { isAdmin } = require('../middleware/isAdmin');
const {JWT_auth} = require('../passport');
const validateBody = require('../middleware/validator');

router
	.route('/')
	.post(JWT_auth, isAdmin, validateBody('menu'), menu.add)
	.put(JWT_auth, isAdmin, validateBody('menu'), menu.update)
	.get(JWT_auth, isAdmin, menu.get)
	.delete(JWT_auth, isAdmin, menu.delete);

router
	.route('/public')
	.get(menu.getPublic);

module.exports = router;