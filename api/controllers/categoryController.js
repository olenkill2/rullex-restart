const mongoose = require('mongoose');
const Category = require('../models/categoryModel.js');

module.exports =
{
	add: async(req, res) => {
		const { category } = req.body;

		Category.findOne({ category }).then((data) => {
			if(data)
			{
				res.status(403).json({error: 'Категория уже существует'});
			}
			else
			{
				const newCategory = new Category(
				{
					category,
					_id: new mongoose.Types.ObjectId()
				});

				new Category(newCategory).save().then((data) => {
					res.status(200).json(data);
				}).catch((err) => {
					if(err)
						res.status(400).json({error: 'чего-то не хватает'})
				});
			}
		});
	},
	get: async(req, res) => {
		Category.find({}).then((data) => {
			res.status(200).json({data});
		}).catch((err) => {
			res.status(400).json('error')
		})
	},
	update: async(req, res) => {
		console.log('update');
	},
	delete: async(req, res) => {
		console.log('delete');
	},
}