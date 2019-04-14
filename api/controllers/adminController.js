const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.js');
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
		if(req.user.isAdmin)
			return res.status(200).json({token: signToken(req.user), status: req.user.isAdmin});
		else
			return res.status(401).json({error: 'notauthorized'});
	},
	// isAdmin: async(req, res) => {
	// 	console.log(req);

	// 	if(req.user.isAdmin)
	// 		return res.status(200).json({status: true});
	// 	else
	// 		return res.status(200).json({status: false});
	// },
	// getUsers: async(req, res) => {
	// 	const foundUsers = await User.find({});
	// 	if(foundUsers == 'null')
	// 		return res.status(403).json({error: 'Ничего не найдено'});

	// 	res.status(200).json(foundUsers);
	// },

	// addCategory: async(req, res) => {
	// 	console.log('new');
	// },

	// getCategory: async(req, res) => {
	// 	const foundCategorys = await Category.find({});
	// 	if(foundCategorys == 'null')
	// 		return res.status(403).json({error: 'Ничего не найдено'});

	// 	res.status(200).json(foundCategorys);
	// },

	// removeCategory: async(req, res) => {
	// 	console.log('remove');
	// },

	// addPost: async(req, res) => {
	// 	console.log(req.body);

	// 	res.status(200).json({success: 'true'});
	// },

	// uploadImage: async(req, res) => {
	// 	res.status(200).json({url: '/uploads/' + req.file.filename});
	// },

	// getAllPost: async(req, res) => {
	// 	const query = req.query.type != undefined ? req.query.type : '';
	// 	const foundPosts = await Post.find({type: query});
	// 	if(foundPosts.length == 0)
	// 		return res.status(403).json({error: 'Новостей пока нет'});

	// 	res.status(200).json(foundPosts);
	// },
	// getPost: async(req, res) => {

	// },
	// updatePost: async(req, res) => {

	// },
	// removePost: async(req, res) => {

	// },
}