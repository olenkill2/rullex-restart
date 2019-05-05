const Roulette = require('../models/rouletteModel.js');
const mongoose = require('mongoose');
module.exports =
{
	add: async(req, res) => {
		const newRoulette = req.body;
		Roulette.findOne({ 'name': newRoulette.name }).then((data) => {
			if(data)
			{
				res.status(403).json({error: 'Рулетка уже существует'});
			}
			else
			{
				newRoulette.created_at = Date.now();

				new Roulette(newRoulette).save().then((data) => {
					res.status(200).json(data);
				}).catch((err) => {
					if(err)
						res.status(400).json({error: 'чего-то не хватает'})
				});
			}
		});
	},
	getAll: async(req, res) => {
		Roulette.find().populate('category').then((data) => {
			res.status(200).json({data});
		}).catch((err) => {
			res.status(400).json('error')
		});
	},
	getOne: async(req, res) => {
	},
	update: async(req, res) => {
		Roulette.findOneAndUpdate({'_id': req.params.id}, req.body.roulette).then((data) => {
			res.status(200).json({data});
		}).catch((err) => {
			console.log(err);
			res.status(400).json('error')
		});
	},
	delete: async(req, res) => {
		Roulette.deleteOne({'_id': req.params.id}).then((data) => {
			res.status(200).json({data});
		}).catch((err) => {
			res.status(400).json('error')
		});
	},
}