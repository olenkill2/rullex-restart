const router = require('express').Router();
const freebie = require('../controllers/freebieController.js');
const validateBody = require('../middleware/validator');
const { isAdmin } = require('../middleware/isAdmin');
const passport = require('passport');
const {JWT_auth} = require('../passport');

router
	.route('/')
	.get(passport.authenticate('jwt', {session: false}), isAdmin, freebie.getAll)
	.post(passport.authenticate('jwt', {session: false}), isAdmin, validateBody('freebie'), freebie.add);

router
	.route('/public/')
	.get(freebie.getPublicFreebies);

router
	.route('/public/:host')
	.get(freebie.getOnePublicFreebie);

router
	.route('/:id')
	.delete(passport.authenticate('jwt', {session: false}), isAdmin, freebie.delete)
	.put(passport.authenticate('jwt', {session: false}), isAdmin, validateBody('freebie'), freebie.update);


module.exports = router;