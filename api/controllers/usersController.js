const JWT = require('jsonwebtoken');
const JWT_SECRET = require('config').get('JWT_SECRET');
const User = require('../models/userModel.js');

signToken = user => {
	return JWT.sign(
	{
		iss: 'Leshiy',
		sub: user.id,
		iat: new Date().getTime(),
		exp: new Date().setDate(new Date().getDate() + 1)
	}, JWT_SECRET);
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
	signUp: async(req, res) =>
	{
		const data = req.body;

		const foundUser = await User.findOne({ 'local.email': data.email })

		if(foundUser)
			return res.status(400).json({error: 'Логин уже используется'});

		const newUser = await User.create(
		{
			method: 'local',
			created_at: Date.now(),
			local:
			{
				email: data.email,
				password: data.password
			},
			role: 'user'
		});

		const token = signToken(newUser);
		res.status(200).json({token});
	},
	// авторизация по мылу и паролю
	signIn: async(req, res) =>
	{
		const token = signToken(req.user);
		res.status(200).json({ access_token: token, role: req.user.role });
	},
	// авторизация через гугл
	oauthGoogle: async(req, res) =>
	{
		const user = req.user;
		let foundUser = await User.findOne({ 'google.id': user.id })

		if(!foundUser)
			foundUser = await createBySocial({
				email: user.email,
				id: user.id,
				method: 'google',
			})

		const token = signToken(foundUser);

		res.status(200).json({ access_token: token, role: foundUser.role });
	},
	// авторизация через vk
	oauthVk: async(req, res) =>
	{
		const user = req.user;

		let foundUser = await User.findOne({ 'vk.id': user.id })

		if (!foundUser)
			foundUser = await createBySocial({
				email: user.email ? user.email : '',
				id: user.id,
				method: 'vk',
			})

		console.log(user)
		const token = signToken(foundUser);

		res.status(200).json({ access_token: token, role: foundUser.role });
	},

	oauthYandex: async (req, res) => {
		const user = req.user;

		let foundUser = await User.findOne({ 'yandex.id': user.id })

		if (!foundUser)
			foundUser = await createBySocial({
				email: user.default_email,
				id: user.id,
				method: 'yandex',
			})

		const token = signToken(foundUser);

		res.status(200).json({ access_token: token, role: foundUser.role });
	},

	oauthFacebook: async (req, res) => {
		const user = req.user;

		let foundUser = await User.findOne({ 'facebook.id': user.id })

		if (!foundUser)
			foundUser = await createBySocial({
				email: user.email ? user.email : '',
				id: user.id,
				method: 'facebook',
			})

		const token = signToken(foundUser);

		res.status(200).json({ access_token: token, role: foundUser.role });
	},
	// получение роли пользоваетля
	getUserInfo: async(req, res) =>
	{
		const token = signToken(req.user);

		res.status(200).json({ token, role: req.user.role });
		// res.status(200).json({'a':1})
	},
}
