const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const GooglePlusStrategy = require('passport-google-plus-token');
const { ExtractJwt } = require('passport-jwt');
const User = require('./models/userModel.js');
const JWT_SECRET  = require('config').get('JWT_SECRET');

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
passport.use(new GooglePlusStrategy({
	clientID: '48660716713-fo9d7bgkr98800vjicot1r5uofkb3qke.apps.googleusercontent.com',
	clientSecret: 'waUwQlVAdFDbqtFw--CqMPTy',
	passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, next) => {
	try {
		const existingUser = await User.findOne({ 'google.id': profile.id });
		if(existingUser) {
			return next(null, existingUser);
		}

		const newUser = new User({
			method: 'google',
			google: {
				id: profile.id,
				email: profile.emails[0].value
			}
		});

		await newUser.save();
		next(null, newUser);
	} catch (error) {
		next(error, false, error.message);
	}
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

passport.use(new VKontakteStrategy(
	{
		clientID: '7101695', // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
		clientSecret: 'jjvrUe9sPCInb7EW0Fos',
		callbackURL: "http://localhost:3334/vk/"
	},
	function myVerifyCallbackFn(accessToken, refreshToken, params, profile, done) {
		console.log(accessToken, refreshToken, profile);
		done(null, { accessToken, refreshToken, profile});
		// User.findOrCreate({ vkontakteId: profile.id })
		// 	.then(function (user) { done(null, user); })
		// 	.catch(done);
	}
));

module.exports = {
	JWT_auth: passport.authenticate('jwt', {session: false}),
	Local_auth: passport.authenticate('local', {session: false}),
	Google_auth: passport.authenticate('google-plus-token', {session: false}),
	Vk_auth: passport.authenticate('vkontakte', { scope: ['status', 'email', 'friends', 'notify'], profileFields: ['email', 'city', 'bdate'], session: false}),
}