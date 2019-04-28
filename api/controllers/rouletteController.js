const Roulette = require('../models/rouletteModel.js');
const mongoose = require('mongoose');
module.exports =
{
	add: async(req, res) => {
		console.log(req.body);
		res.status(200).json({success: true})
		// const { url, name, category, order, private } = req.body;
		// console.log(req.body);
		// Menu.findOne({ 'url': url }).then((data) => {
		// 	if(data)
		// 	{
		// 		res.status(403).json({error: 'Ссылка уже существует'});
		// 	}
		// 	else
		// 	{
		// 		const menuItemData = {
		// 			url,
		// 			name,
		// 			private,
		// 			order,
		// 			created_at: Date.now()
		// 		}

		// 		if(mongoose.Types.ObjectId.isValid(category))
		// 			menuItemData.category = category;

		// 		new Menu(menuItemData).save().then((dadta) => {
		// 			res.status(200).json(dadta);
		// 		}).catch((err) => {
		// 			console.log(err);
		// 			if(err)
		// 				res.status(402).json({error: 'чего-то не хватает'})
		// 		});
		// 	}
		// })
	},
	get: async(req, res) => {
		// Menu.find().populate('category').then((data) => {
		// 	res.status(200).json({data});
		// }).catch((err) => {
		// 	console.log(err);
		// 	res.status(400).json('error')
		// });
	},
	update: async(req, res) => {
		// const updatedLink = req.body.link;
		// console.log(updatedLink.category);
		// if(typeof updatedLink.category == 'undefined')
		// 	updatedLink.category = null;

		// Menu.findOneAndUpdate({'_id': updatedLink._id}, updatedLink).then((data) => {
		// 	console.log(data);
		// 	res.status(200).json({data});
		// }).catch((err) => {
		// 	console.log(err);
		// 	res.status(400).json('error')
		// });
	},
	delete: async(req, res) => {
		// Menu.deleteOne({'_id': req.body.link._id}).then((data) => {
		// 	res.status(200).json({data});
		// }).catch((err) => {
		// 	res.status(400).json('error')
		// });
	},
}