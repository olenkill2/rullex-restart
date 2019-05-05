const Post = require('../models/postModel.js');
const mongoose = require('mongoose');
module.exports =
{
	add: async(req, res) => {
		const post = req.body;
		Post.findOne({ 'url': post.url }).then((data) => {
			if(data)
			{
				res.status(403).json({error: 'Ссылка уже существует'});
			}
			else
			{
				post.created_at = Date.now();

				if(mongoose.Types.ObjectId.isValid(post.category))
					post.category = post.category;
				else
					post.category = null;

				new Post(post).save().then((data) => {
					res.status(200).json(data);
				}).catch((err) => {
					if(err)
						res.status(400).json({error: 'чего-то не хватает'})
				});
			}
		})
	},
	getAll: async(req, res) => {
		Post.find().populate('category').then((data) => {
			res.status(200).json({data});
		}).catch((err) => {
			res.status(400).json('error')
		});
	},
	update: async(req, res) => {
		const updatedPost = req.body.post;

		if(typeof updatedPost.category == 'undefined')
			updatedPost.category = null;

		Post.findOneAndUpdate({'_id': updatedPost._id}, updatedPost).then((data) => {
			res.status(200).json({data});
		}).catch((err) => {
			res.status(400).json('error')
		});
	},
	delete: async(req, res) => {
		Post.deleteOne({'_id': req.body.post}).then((data) => {
			res.status(200).json({data});
		}).catch((err) => {
			res.status(400).json('error')
		});
	},
	getPost: async(req, res) => {
		Post.findOne({'url': '/' + req.params.id}).then((data) => {
			if(data.private)
				res.status(404).json('error')
			else
				res.status(200).json({data});
		}).catch((err) => {
			res.status(404).json('error')
		});
	},
	getSeo: async(req, res) => {
		console.log(req.query.link);
		Post.findOne({'url': req.query.link}).then((data) => {
			// if(data.private)
			// 	res.status(404).json('error')
			// else
				res.status(200).json({title: data.title, description: data.description});
		}).catch((err) => {
			res.status(404).json('error')
		});
	}
}