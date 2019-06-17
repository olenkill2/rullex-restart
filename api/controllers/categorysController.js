const mongoose = require('mongoose');
const Category = require('../models/categoryModel.js');

module.exports =
{
	add: async(req, res) => {
		const { category } = req.body;
		const result = await Category.findOne({ category });

		if(result) return res.status(403).json({error: 'Категория уже существует'});

		const newCategory = new Category({
			category,
			created_at: Date.now()
		});

		await newCategory.save();
		res.status(200).json({data: newCategory});
	},
	get: async(req, res) => {
		const result = await Category.find({});

		if(!result) return res.status(404).json({error: 'Not found'})

		res.status(200).json({data});
	},
	update: async(req, res) => {
		console.log('update');
	},
	delete: async(req, res) => {
		console.log('delete');
	},
}