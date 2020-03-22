const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('./models/userModel.js');
const JWT_SECRET  = require('config').get('JWT_SECRET');

// passport.serializeUser(function(user, done) {
// 	done(null, user);
// });
// passport.deserializeUser(function(obj, done) {
// 	done(null, obj);
// });

//JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: JWT_SECRET,
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

// console.log(passport);

// GOOGLE TOKEN STRATEGY
passport.use(new GoogleStrategy({
	clientID: '48660716713-fo9d7bgkr98800vjicot1r5uofkb3qke.apps.googleusercontent.com',
	clientSecret: 'waUwQlVAdFDbqtFw--CqMPTy',
	callbackURL: 'http://localhost:3334/oauth/?from=google'
}, async (accessToken, refreshToken, profile, done) => {
	console.log('a');

		done(null, { accessToken, refreshToken, profile });
}));

//LOCAL STRATEGY
passport.use(new LocalStrategy({
		usernameField: 'email'
	},
	async (email, password, done) => {
		try {
			const user = await User.findOne({ 'local.email': email });
			if(!user)
				return done(null, false);

			const isMatch = await user.isValidPassword(password);
			if(!isMatch)
				return done(null, false);

			done(null, user);
		} catch(err) {
			done(err, false);
		}
	})
)

passport.use(new VKontakteStrategy({
		clientID: '7101695', // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
		clientSecret: 'jjvrUe9sPCInb7EW0Fos',
		callbackURL: 'https://rullex.ru/',
		scope: ['email' ],
		profileFields: ['email', 'city', 'bdate']
	},
	function myVerifyCallbackFn(accessToken, refreshToken, params, profile, done) {
		console.log(accessToken, refreshToken, params, profile, done)
		done(null, { accessToken, refreshToken, profile});
	}
));

module.exports = {
	JWT_auth: passport.authenticate('jwt', {session: false}),
	Local_auth: passport.authenticate('local', {session: false}),
	Google_auth: passport.authenticate('google', { scope: ['profile'], session: false}),
	VK_cb: passport.authenticate('vkontakte', { failureRedirect: '/', scope: ['status', 'email', 'friends', 'notify'], profileFields: ['email', 'city', 'bdate'], session: false}),
	Vk_auth: function (req, res, next) {
		// console.log(req)
		// next()
		passport.authenticate('vkontakte', { scope: ['status', 'email', 'friends', 'notify'], profileFields: ['email', 'city', 'bdate'], session: false})(req, res, next)
	},
}
