const Menu = require('../models/menuModel.js');
const mongoose = require('mongoose');
module.exports =
{
	add: async(req, res) => {
		const { url, name, category, order, private } = req.body;

		Menu.findOne({ 'url': url }).then((data) => {
			if(data)
			{
				res.status(403).json({error: 'Ссылка уже существует'});
			}
			else
			{
				const menuItemData = {
					url,
					name,
					private,
					created_at: Date.now()
				}

				if(mongoose.Types.ObjectId.isValid(category))
					menuItemData.category = category;

				new Menu(menuItemData).save().then((dadta) => {
					res.status(200).json(dadta);
				}).catch((err) => {
					if(err)
						res.status(402).json({error: 'чего-то не хватает'})
				});
			}
		})
	},
	get: async(req, res) => {
		Menu.find().populate('category').then((data) => {
			res.status(200).json({data});
		}).catch((err) => {
			console.log(err);
			res.status(400).json('error')
		});
	},
	update: async(req, res) => {
		console.log('update');
	},
	delete: async(req, res) => {
		console.log('delete');
	},
}