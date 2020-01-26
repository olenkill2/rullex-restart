const router = require('express').Router();
const seo = require('../controllers/seoController.js');
const validateBody = require('../middleware/validator');
const { isAdmin } = require('../middleware/isAdmin');
const passport = require('passport');
const { JWT_auth } = require('../passport');

router
    .route('/public/')
    .get(seo.getBySlug);

router
    .route('/')
    .get(passport.authenticate('jwt', { session: false }), isAdmin, seo.getAll)
    .post(passport.authenticate('jwt', { session: false }), isAdmin, validateBody('seo'), seo.add);

router
    .route('/:id')
    .delete(passport.authenticate('jwt', { session: false }), isAdmin, seo.delete)
    .put(passport.authenticate('jwt', { session: false }), isAdmin, validateBody('seo'), seo.update);


module.exports = router;