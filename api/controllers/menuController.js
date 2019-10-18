const Menu = require('../models/menuModel.js');
const mongoose = require('mongoose');
module.exports =
{
	add: async(req, res) => {
		const { url, name, category, order, private } = req.body;
		const result = await Menu.findOne({ 'url': url });

		if(result) return res.status(403).json({error: 'Ссылка уже существует'});

		const menuItemData = {
			url,
			name,
			private,
			order,
			created_at: Date.now()
		}

		if(mongoose.Types.ObjectId.isValid(category))
			menuItemData.category = category;

		const newMenuItem = new Menu(menuItemData)
		await newMenuItem.save();

		res.status(200).json({data: newMenuItem});
	},
	get: async(req, res) => {
		const result = await Menu.find().populate('category');

		if(!result) return res.status(404).json({error: 'Not found'});

		res.status(200).json({data: result});
	},
	getPublic: async(req, res) => {
		const result = await Menu.find({private: false}).populate('category');

		if(!result) return res.status(404).json({error: 'Not found'});

		res.status(200).json({data: result});
	},
	update: async(req, res) => {
		const updatedLink = req.body;

		if(typeof updatedLink.category == 'undefined')
			updatedLink.category = null;

		const result = await Menu.findOneAndUpdate({'_id': updatedLink._id}, updatedLink);

		if(!result) return res.status(404).json({error: 'Not found'});

		res.status(200).json({data: result});
	},
	delete: async(req, res) => {
		const deletedMenuItem = await Menu.deleteOne({'_id': req.body.link._id});

		if(!deletedMenuItem) return res.status(404).json({error: 'Not found'});

		res.status(200).json({data: deletedMenuItem});
	},
}