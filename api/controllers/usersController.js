const JWT = require('jsonwebtoken');
const tokensConfig = require('config').get('tokens');
const User = require('../models/userModel.js');
const RefreshToken = require('../models/refresh.js');

const getTokens = async (data) => {
	const tokens = {
	  access_token: JWT.sign({
      sub: data.id,
    }, tokensConfig.ACCESS_SECRET, {
	    expiresIn: tokensConfig.ACCESS_EXP
    }),

    refresh_token: JWT.sign({
      sub: data.id
    }, tokensConfig.REFRESH_SECRET, {
      expiresIn: tokensConfig.REFRESH_EXP
    }),
  }

  await RefreshToken.findOneAndUpdate({
    userId: data.id,
    token: data.refresh_token
  }, {
    userId: data.id,
    token: tokens.refresh_token
  }, { upsert: true, new: true, setDefaultsOnInsert: true })

  return tokens
}

createBySocial = data => {
	const newUser = {
		method: data.method,
		created_at: Date.now(),
		role: 'user'
	}

	newUser[data.method] = {
		id: data.id,
		email: data.email
	}

	return User.create(newUser);
}

module.exports =
{
	// регистрация по мылу и паролю
	async signUp(req, res) {
		const data = req.body;

		const foundUser = await User.findOne({ 'local.email': data.email })

		if(foundUser)
			return res.status(400).json({error: 'Логин уже используется'});

		const newUser = await User.create({
			method: 'local',
			created_at: Date.now(),
			local: {
				email: data.email,
				password: data.password
			},
			role: 'user'
		});

		const tokens = await getTokens(newUser)
		res.status(200).json({ ...tokens, role: newUser.role });
	},
  async refreshTokens(req, res) {
    const refresh_token = req.body.refresh_token

    if(!refresh_token) return res.status(403).json({message: 'need auth'})

    try {
      const user = JWT.verify(refresh_token, tokensConfig.REFRESH_SECRET)
      const finedToken = await RefreshToken.findOne({ userId: user.sub, token: refresh_token })

      if(finedToken) {
        const tokens = await getTokens({
          id: user.sub,
          refresh_token
        })

        RefreshToken.deleteOne({ token: refresh_token })

        res.status(200).json({...tokens})
      } else {
        res.status(403).json({message: 'need auth'})
      }
    } catch(e) {
      RefreshToken.deleteOne({ token: refresh_token })
      res.status(403).json({message: 'need auth'})
    }
  },
	// авторизация по мылу и паролю
	async signIn(req, res) {
    const tokens = await getTokens(req.user)
		res.status(200).json({ ...tokens, role: req.user.role });
	},
	// авторизация через гугл
	async oauthGoogle(req, res) {
		const user = req.user.profile;
		let foundUser = await User.findOne({ 'google.id': user.id })

		if(!foundUser) {
			foundUser = await createBySocial({
				email: user.emails[0].value,
				id: user.id,
				method: 'google',
			})
    }

    const tokens = await getTokens(foundUser)
		res.status(200).json({ ...tokens, role: foundUser.role });
	},
	// авторизация через vk
	async oauthVk(req, res) {
		const user = req.user.profile;
		let foundUser = await User.findOne({ 'vk.id': user.id })

		if (!foundUser)
			foundUser = await createBySocial({
				email: user.email ? user.email : '',
				id: user.id,
				method: 'vk',
			})

		const tokens = await getTokens(foundUser)
		res.status(200).json({ ...tokens, role: foundUser.role });
	},
	// получение роли пользоваетля
	async getUserInfo(req, res) {
		res.status(200).json({ role: req.user.role })
	},
}
