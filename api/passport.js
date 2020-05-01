const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('./models/userModel.js');
const ACCESS_SECRET  = require('config').get('tokens.ACCESS_SECRET');

//JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: ACCESS_SECRET,
	},
	async (payload, done) => {
    console.log(payload)
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
		clientID: '7101695', // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
		clientSecret: 'jjvrUe9sPCInb7EW0Fos',
		callbackURL: 'http://localhost:8000',
		scope: ['email' ],
		profileFields: ['email', 'city', 'bdate']
	},
	function myVerifyCallbackFn(accessToken, refreshToken, params, profile, done) {
		done(null, { accessToken, refreshToken, profile});
	}
))

// GOOGLE TOKEN STRATEGY
passport.use(new GoogleStrategy({
	clientID: '48660716713-fo9d7bgkr98800vjicot1r5uofkb3qke.apps.googleusercontent.com',
	clientSecret: 'waUwQlVAdFDbqtFw--CqMPTy',
	callbackURL: 'http://localhost:3334'
}, async (accessToken, refreshToken, profile, done) => {
	done(null, { accessToken, refreshToken, profile });
}));

module.exports = {
	JWT_auth: passport.authenticate('jwt', {session: false}),
	Local_auth: passport.authenticate('local', {session: false}),
	Google_auth: passport.authenticate('google', { scope: ['profile'], session: false}),
	Vk_auth: passport.authenticate('vkontakte', { session: false, scope: ['email'], profileFields: ['email', 'bdate'] })
}
