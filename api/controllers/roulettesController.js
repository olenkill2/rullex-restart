const Roulette = require('../models/rouletteModel.js');
const mongoose = require('mongoose');

module.exports =
{
	add: async(req, res) => {
		const newRoulette = req.body;
		const result = await Roulette.findOne({ 'name': newRoulette.name });
		if(result)
			return res.status(403).json({error: 'Рулетка уже существует'});

		const roulette = await Roulette.create(newRoulette);

		res.status(200).json({data: roulette});
	},

	getAll: async(req, res) => {
		const roulette = await Roulette.find().populate('modes gameFunctionForMode.mode');
		res.status(200).json({data: roulette});
	},

	getAllPublicRoulettes: async(req, res) => {
		const roulettes = await Roulette.find({private: false})
      .populate('modes')
      .select('-private -__v -created_at')

		if(!roulettes || !roulettes.length) return res.status(404).json({error: 'Not found'})

		res.status(200).json({data: roulettes})
	},

	getOnePublicRoulette: async(req, res) => {
		const roulette = await Roulette.findOne({ host: req.query.host })
      .populate('modes gameFunctionForMode.mode')
      .select('-private -__v -created_at')

		if(!roulette) return res.status(404).json({error: 'Not found'});

		res.status(200).json(roulette);
	},

	update: async(req, res) => {
		let roulette = await Roulette.findById(req.params.id);

		if(!roulette) return res.status(404).json({error: 'Not found'});

		delete req.body._id

		roulette = await Roulette.findOneAndUpdate(req.params.id, req.body, { upsert: true });

		res.status(200).json({data: roulette});
	},

	delete: async(req, res) => {
		const roulette = await Roulette.findById(req.params.id);

		if(!roulette) return res.status(404).json({error: 'Not found'});

		roulette.remove();

		res.status(200).json({data: roulette});
	},
}
