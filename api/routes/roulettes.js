const router = require('express').Router();
const roulette = require('../controllers/roulettesController.js');
const validateBody = require('../middleware/validator');
const { isAdmin } = require('../middleware/isAdmin');
const passport = require('passport');
const {JWT_auth} = require('../passport');

router
	.route('/')
	.get(passport.authenticate('jwt', {session: false}), isAdmin, roulette.getAll)
	.post(passport.authenticate('jwt', {session: false}), isAdmin, validateBody('roulette'), roulette.add);

router
	.route('/public/')
	.get(roulette.getAllPublicRoulettes);

router
	.route('/public/:host')
	.get(roulette.getOnePublicRoulette);

router
	.route('/:id')
	.delete(passport.authenticate('jwt', {session: false}), isAdmin, roulette.delete)
	.put(passport.authenticate('jwt', {session: false}), isAdmin, validateBody('roulette'), roulette.update);


module.exports = router;