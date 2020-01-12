const JWT = require('jsonwebtoken');
const JWT_SECRET = require('config').get('JWT_SECRET');
const User = require('../models/userModel.js');
// const Category = require('../models/categoryModel.js');
// const Post = require('../models/postModel.js');

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
	signin: async(req, res) => {
		if(req.user.role == 'admin')
			return res.status(200).json({token: signToken(req.user), role: req.user.role});
		else
			return res.status(401).json({error: 'notauthorized'});
	},
}