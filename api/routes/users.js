const router = require('express').Router();
const user = require('../controllers/usersController.js');
const validateBody = require('../middleware/validator');
const passport = require('passport');
const {
    JWT_auth,
    Local_auth,
    Vk_auth,
    Google_auth
} = require('../passport');

router.route('/signup').post(validateBody('newUser'), user.signUp);
router.route('/signin').post(Local_auth, user.signIn);
router.route('/refresh').get(user.refreshTokens);
router.route('/user').post(JWT_auth, user.getUserInfo);
router.route('/update-token').post(user.signIn);
router.route('/oauth/google/cb').get(Google_auth, user.oauthGoogle);
router.route('/oauth/vk/cb').get(Vk_auth, user.oauthVk);
module.exports = router;
