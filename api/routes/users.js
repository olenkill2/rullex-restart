const router = require('express').Router();
const user = require('../controllers/usersController.js');
const validateBody = require('../middleware/validator');
const passport = require('passport');
const {
    JWT_auth,
    Local_auth,
    VK_cb,
    Google_cb,
    Yandex_cb,
    Facebook_cb
} = require('../passport');

router.route('/signup').post(validateBody('newUser'), user.signUp);
router.route('/signin').post(Local_auth, user.signIn);
router.route('/signin-token').post(JWT_auth, user.signIn);
// router.route('/oauth/google').get(Google_auth, user.oauthGoogle);
router.route('/oauth/google/cb').post(Google_cb, user.oauthGoogle);
router.route('/oauth/vk/cb').post(VK_cb, user.oauthVk);
router.route('/oauth/yandex/cb').post(Yandex_cb, user.oauthYandex);
router.route('/oauth/facebook/cb').post(Facebook_cb, user.oauthFacebook);
module.exports = router;
