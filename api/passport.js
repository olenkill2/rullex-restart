const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusStrategy = require('passport-google-plus-token');
const { ExtractJwt } = require('passport-jwt');
const User = require('./models/userModel.js');
const JWT_SECRET  = require('config').get('JWT_SECRET');

//JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
		jwtFromRequest: ExtractJwt.fromHeader('authorization'),
		secretOrKey: JWT_SECRET
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
}))

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

module.exports = {
	JWT_auth: passport.authenticate('jwt', {session: false}),
	Local_auth: passport.authenticate('local', {session: false}),
	Google_auth: passport.authenticate('google-plus-token', {session: false}),
}