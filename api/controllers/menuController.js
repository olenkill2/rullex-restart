const Menu = require('../models/menuModel.js');
const mongoose = require('mongoose');
module.exports =
{
	add: async(req, res) => {
		const newMenuItem = req.body;
		const result = await Menu.findOne({ 'url': newMenuItem.url, 'label': newMenuItem.label});

		if(result) return res.status(403).json({error: 'Ссылка уже существует'});

		const newMenuItemData = await Menu.create(newMenuItem);

		res.status(200).json({ data: newMenuItemData});
	},
	get: async(req, res) => {
		const result = await Menu.find()

		if(!result) return res.status(404).json({error: 'Not found'});

		res.status(200).json({data: result});
	},
	getPublic: async(req, res) => {
		const aggregate = await Menu.aggregate([
			{ $match: { private: false } },
			{ $sort: {'order':1, 'category': 1} },
			{
				$group: {
					'_id': "$category",
					items: { $push: "$$ROOT" },
				}
			},
			{ $sort: { '_id': 1 } },
		])

		if (!aggregate.length) return res.status(404).json({error: 'Not found'});

		res.status(200).json({ data: aggregate});
	},
	update: async(req, res) => {
		const updatedItem = req.body;

		if(typeof updatedItem.category == 'undefined')
			updatedItem.category = null;

		const result = await Menu.findOneAndUpdate({'_id': updatedItem._id}, updatedItem);

		if(!result) return res.status(404).json({error: 'Not found'});

		res.status(200).json({data: result});
	},
	delete: async(req, res) => {
		const deletedMenuItem = await Menu.deleteOne({'_id': req.params.id});

		if(!deletedMenuItem) return res.status(404).json({error: 'Not found'});

		res.status(200).json({data: deletedMenuItem});
	},
}
