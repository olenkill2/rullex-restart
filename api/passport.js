const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('./config/config.js');
const User = require('./models/userModel.js');

//JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy(
	{
		jwtFromRequest: ExtractJwt.fromHeader('authorization'),
		secretOrKey: JWT_SECRET
	},
	async (payload, done) =>
	{
		try
		{
			const user = await User.findById(payload.sub);
			if(!user)
				return done(null, false);

			done(null, user);
		}
		catch(err)
		{
			done(err, false)
		}
	})
)

//LOCAL STRATEGY
passport.use(new LocalStrategy({
		usernameField: 'email'
	},
	async (email, password, done) =>
	{
		try
		{
			const user = await User.findOne({ 'local.email': email });
			if(!user)
				return done(null, false);

			const isMatch = await user.isValidPassword(password);
			if(!isMatch)
				return done(null, false);

			done(null, user);
		}
		catch(err)
		{
			done(err, false);
		}
	})
)