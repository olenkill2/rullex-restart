const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.js');
const User = require('../models/userModel.js');

signToken = user =>
{
	return JWT.sign(
	{
		iss: 'Leshiy',
		sub: user.id,
		iat: new Date().getTime(),
		exp: new Date().setDate(new Date().getDate() + 1)
	}, JWT_SECRET);
}

module.exports =
{
	// регистрация по мылу и паролю
	signUp: async(req, res) =>
	{
		const { email, password } = req.body;

		const foundUser = await User.findOne({ 'local.email': email })
		if(foundUser)
			return res.status(400).json({error: 'Логин уже используется'});

		const newUser = new User(
		{
			method: 'local',
			created_at: Date.now(),
			local:
			{
				email: email,
				password: password
			},
			role: 'user'
		});

		await newUser.save();
		const token = signToken(newUser);
		res.status(200).json({token});
	},
	// авторизация по мылу и паролю
	signIn: async(req, res) =>
	{
		const token = signToken(req.user);
		res.status(200).json({ token, role: req.user.role });
	},
	// авторизация по мылу и паролю
	getUserInfo: async(req, res) =>
	{
		const token = signToken(req.user);
		res.status(200).json({ token, role: req.user.role });
	},
}