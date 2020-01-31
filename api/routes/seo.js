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
    .get(JWT_auth, isAdmin, seo.getAll)
    .post(JWT_auth, isAdmin, validateBody('seo'), seo.add);

router
    .route('/:id')
    .delete(JWT_auth, isAdmin, seo.delete)
    .put(JWT_auth, isAdmin, validateBody('seo'), seo.update);


module.exports = router;