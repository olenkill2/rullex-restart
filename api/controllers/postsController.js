const Post = require('../models/postModel.js');
const mongoose = require('mongoose');
module.exports =
{
	add: async(req, res) => {
		const post = req.body;
		const result = await Post.findOne({ 'url': post.url })

		if(result)
			return res.status(403).json({error: 'Ссылка уже существует'});

		post.created_at = Date.now();

		if(mongoose.Types.ObjectId.isValid(post.category))
			post.category = post.category;
		else
			post.category = null;

		const newPost = new Post(post);
		await newPost.save();

		res.status(200).json({data: newPost});
	},

	getAll: async(req, res, next) => {
		const result = await Post.find().populate('category', '-created_at').select('-__v');
		res.status(200).json({ data: result });
	},

	update: async(req, res) => {
		const updatedPost = req.body;

		if(typeof updatedPost.category == 'undefined')
			updatedPost.category = null;

		const updatedPostData = await Post.findOneAndUpdate({'_id': updatedPost._id}, updatedPost);

		if(!updatedPostData) return res.status(404).json({error: 'Not found'});

		res.status(200).json(updatedPostData);
	},

	delete: async(req, res) => {
		const deletedPost = await Post.findByIdAndRemove({'_id': req.params.id});

		if(!deletedPost) return res.status(404).json({error: 'Not found'});

		res.status(200).json(deletedPost);
	},

	getPost: async(req, res, next) => {
		if (!req.params.slug) return res.status(400).json({error: 'чего-то не хватает'});

		const result = await Post.findOne({'slug': req.params.slug, private: false});

		if(!result) return res.status(404).json('error');

		res.status(200).json({ data: result});
	}
}
