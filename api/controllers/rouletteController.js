const Roulette = require('../models/rouletteModel.js');
const mongoose = require('mongoose');
module.exports =
{
	add: async(req, res) => {
		const newRoulette = req.body;
		const result = await Roulette.findOne({ 'name': newRoulette.name });

		if(result)
			return res.status(403).json({error: 'Рулетка уже существует'});

		newRoulette.created_at = Date.now();

		const roulette = new Roulette(newRoulette);
		await roulette.save();

		res.status(200).json({data: roulette});
	},
	getAll: async(req, res) => {
		const roulette = await Roulette.find().populate('category');
		res.status(200).json({data: roulette});
	},
	getOne: async(req, res) => {
		// получить инфу для одной рулетки
	},
	update: async(req, res) => {
		// валидация
		// if(!req.body.roulette)
		// 	return res.status(400).json({error: 'чего-то не хватает'});

		const roulette = await Roulette.findOneAndUpdate({'_id': req.params.id}, req.body.roulette)
		if(!roulette) return res.status(404).json({error: 'Not found'});

		res.status(200).json({data: roulette});
	},
	delete: async(req, res) => {
		const roulette = await Roulette.deleteOne({'_id': req.params.id});

		if(!roulette) return res.status(404).json({error: 'Not found'});

		res.status(200).json({data: roulette});
	},
}