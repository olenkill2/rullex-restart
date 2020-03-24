const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('./models/userModel.js');
const JWT_SECRET  = require('config').get('JWT_SECRET');
const request = require('request');

passport.serializeUser((user, done) => {
	console.log('a')
	done(null, user._id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
	console.log('b')
	User.findById(id)
		.then(user => {
			done(null, user);
		})
		.catch(e => {
			done(new Error("Failed to deserialize an user"));
		});
});

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
	callbackURL: 'http://localhost:3334/'
}, async (accessToken, refreshToken, profile, done) => {
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
		callbackURL: 'http://localhost:3334/',
		scope: ['email' ],
		profileFields: ['email', 'city', 'bdate']
	},
	function myVerifyCallbackFn(accessToken, refreshToken, params, profile, done) {
		done(null, { accessToken, refreshToken, profile});
	}
));

const VK_cb = (req, res, next) => {
	const params = {
		code: req.body.code,
		client_id: req.body.clientId,
		client_secret: 'jjvrUe9sPCInb7EW0Fos',
		redirect_uri: req.body.redirectUri
	}
	request.get({
		url: 'https://oauth.vk.com/access_token',
		qs: params
	}, (err, r, body) => {
		const params = {
			access_token: JSON.parse(body).access_token,
			v: '5.8'
		}
		request.get({
			url: 'https://api.vk.com/method/users.get',
			qs: params
		}, (err, r, body) => {
			req.user = { ...JSON.parse(body).response[0] }
			next()
		})
	})
}

const Google_cb = (req, res, next) => {
	request({
		method: 'post',
		url: 'https://accounts.google.com/o/oauth2/token',
		form: {
			code: req.body.code,
			client_id: req.body.clientId,
			client_secret: 'waUwQlVAdFDbqtFw--CqMPTy',
			redirect_uri: req.body.redirectUri,
			grant_type: 'authorization_code'
		},
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		}
	}, (err, r, body) => {
		request.get({
			url: 'https://www.googleapis.com/oauth2/v1/userinfo',
			qs: JSON.parse(body)
		}, (err, r, body) => {
			req.user = { ...JSON.parse(body) }
			next()
		})
	})
}

const Yandex_cb = (req, res, next) => {
	request({
		method: 'post',
		url: 'https://oauth.yandex.ru/token',
		form: {
			code: req.body.code,
			client_id: req.body.clientId,
			client_secret: '14d2c79cac7242edaa17c51febcd700d',
			redirect_uri: req.body.redirectUri,
			grant_type: 'authorization_code'
		},
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		}
	}, (err, r, body) => {
		request.get({
			url: 'https://login.yandex.ru/info?',
			qs: {
				format: 'json',
				oauth_token: JSON.parse(body).access_token
			}
		}, (err, r, body) => {
			console.log(JSON.parse(body))
			req.user = { ...JSON.parse(body) }
			next()
		})
	})
}
const Facebook_cb = (req, res, next) => {
	request({
		method: 'post',
		url: 'https://graph.facebook.com/v2.4/oauth/access_token',
		form: {
			code: req.body.code,
			client_id: req.body.clientId,
			client_secret: '3f2e2f8a3f3181768d3709b63d6e2fd7',
			redirect_uri: req.body.redirectUri,
			// grant_type: 'authorization_code'
		},
		headers: {
			'content-type': 'application/json'
		}
	}, (err, r, body) => {
		console.log(JSON.parse(body))
		request.get({
			url: 'https://graph.facebook.com/me?fields=id,name,email',
			qs: {
				access_token: JSON.parse(body).access_token
			}
		}, (err, r, body) => {
			req.user = { ...JSON.parse(body) }
			next()
		})
	})
}

module.exports = {
	JWT_auth: passport.authenticate('jwt', {session: false}),
	Local_auth: passport.authenticate('local', {session: false}),
	Google_auth: passport.authenticate('google', { scope: ['profile'], session: false}),
	Vk_auth: passport.authenticate('vkontakte', { scope: ['status', 'email', 'friends', 'notify'], profileFields: ['email', 'city', 'bdate'] }),
	VK_cb: VK_cb,
	Google_cb: Google_cb,
	Yandex_cb: Yandex_cb,
	Facebook_cb: Facebook_cb
}
