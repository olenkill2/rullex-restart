const router = require('express').Router();
const freebie = require('../controllers/freebieController.js');
const validateBody = require('../middleware/validator');
const { isAdmin } = require('../middleware/isAdmin');
const passport = require('passport');
const {JWT_auth} = require('../passport');

router
	.route('/')
	.get(JWT_auth, isAdmin, freebie.getAll)
	.post(JWT_auth, isAdmin, validateBody('freebie'), freebie.add);

router
	.route('/public/')
	.get(freebie.getPublicFreebies);

router
	.route('/public/:host')
	.get(freebie.getOnePublicFreebie);

router
	.route('/:id')
	.delete(JWT_auth, isAdmin, freebie.delete)
	.put(JWT_auth, isAdmin, validateBody('freebie'), freebie.update);


module.exports = router;