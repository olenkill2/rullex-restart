const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('./models/userModel.js');
const config = require('config')
const ACCESS_SECRET = config.get('tokens.ACCESS_SECRET');
const socialData = config.get('auth')

//JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: ACCESS_SECRET,
	},
	async (payload, done) => {
		try {
			const user = await User.findById(payload.sub);
			if(!user)
				return done(null, false);

			done(null, user);
		} catch(err) {
			done(err, false)
		}
	})
)

//LOCAL STRATEGY
passport.use(new LocalStrategy({
		usernameField: 'email'
	},
	async (email, password, done) => {
		try {
			const user = await User.findOne({ 'local.email': email });

			if(!user)
				return done(null, false)

			const isMatch = await user.isValidPassword(password);

			if(!isMatch)
				return done(null, false)

			done(null, user);
		} catch(err) {
			done(err, false)
		}
	})
)

// VK TOKEN STRATEGY
passport.use(new VKontakteStrategy({
		clientID: socialData.vk.clientId,
		clientSecret: socialData.vk.clientSecret,
		callbackURL: socialData.vk.callbackURL,
		scope: ['email' ],
		apiVersion: '5.21',
		profileFields: ['email', 'city', 'bdate']
	},
	function myVerifyCallbackFn(accessToken, refreshToken, params, profile, done) {
		done(null, { accessToken, refreshToken, profile});
	}
))

// GOOGLE TOKEN STRATEGY
passport.use(new GoogleStrategy({
	clientID: socialData.google.clientId,
	clientSecret: socialData.google.clientSecret,
	callbackURL: socialData.google.callbackURL,
}, async (accessToken, refreshToken, profile, done) => {
	done(null, { accessToken, refreshToken, profile });
}));

module.exports = {
	JWT_auth: passport.authenticate('jwt', {session: false}),
	Local_auth: passport.authenticate('local', {session: false}),
	Google_auth: passport.authenticate('google', { scope: ['profile'], session: false}),
	Vk_auth: passport.authenticate('vkontakte', { session: false, scope: ['email'], profileFields: ['email', 'bdate'] })
}
