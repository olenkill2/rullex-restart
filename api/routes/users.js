const router = require('express').Router();
const user = require('../controllers/usersController.js');
const validateBody = require('../middleware/validator');
const passport = require('passport');
const { JWT_auth, Local_auth, Google_auth, Vk_auth} = require('../passport');

router.route('/signup').post(validateBody('newUser'), user.signUp);
router.route('/signin').post(Local_auth, user.signIn);
router.route('/signin-token').post(JWT_auth, user.signIn);
router.route('/oauth/google').get(Google_auth, user.oauthGoogle);
router.route('/oauth/vk').get(Vk_auth, user.oauthVk);

module.exports = router;