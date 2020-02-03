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
	return User.create({
		method: data.method,
		created_at: Date.now(),
		vk:
		{
			email: data.email,
			id: data.id
		},
		role: 'user'
	});

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
		res.status(200).json({ token, role: req.user.role });
	},
	// авторизация через гугл
	oauthGoogle: async(req, res) =>
	{
		const user = req.user.profile;
		let foundUser = await User.findOne({ 'google.id': user.id })

		if(!foundUser)
			foundUser = await createBySocial({
				email: user.emails[0].value,
				id: user.id,
				method: 'google',
			})

		const token = signToken(foundUser);

		res.status(200).json({ token, role: foundUser.role });
	},
	// авторизация через vk
	oauthVk: async(req, res) =>
	{
		const user = req.user.profile;

		let foundUser = await User.findOne({ 'vk.id': user.id })

		if (!foundUser)
			foundUser = await createBySocial({
				email: user.email ? user.email : '',
				id: user.id,
				method: 'vk',
			})

		const token = signToken(foundUser);

		res.status(200).json({ token, role: foundUser.role });
	},
	// получение роли пользоваетля
	getUserInfo: async(req, res) =>
	{
		const token = signToken(req.user);

		res.status(200).json({ token, role: req.user.role });
		// res.status(200).json({'a':1})
	},
}