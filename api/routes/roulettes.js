const router = require('express').Router();
const roulette = require('../controllers/roulettesController.js');
const validateBody = require('../middleware/validator');
const { isAdmin } = require('../middleware/isAdmin');
const passport = require('passport');
const {JWT_auth} = require('../passport');

router
	.route('/')
	.get(JWT_auth, isAdmin, roulette.getAll)
	.post(JWT_auth, isAdmin, validateBody('roulette'), roulette.add);

router
	.route('/public/')
	.get(roulette.getAllPublicRoulettes);

router
	.route('/public/one')
	.get(roulette.getOnePublicRoulette);

router
	.route('/:id')
	.delete(JWT_auth, isAdmin, roulette.delete)
	.put(JWT_auth, isAdmin, validateBody('roulette'), roulette.update);


module.exports = router;
