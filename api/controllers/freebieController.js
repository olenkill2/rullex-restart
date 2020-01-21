const Freebie = require('../models/freebieModel.js');
const mongoose = require('mongoose');

module.exports =
{
	add: async(req, res) => {
		const newfreebie = req.body;
		const freebie = await Freebie.create(newfreebie);
		res.status(200).json({data: freebie});
	},

	getAll: async(req, res) => {
		const result = await Freebie.find({}).populate('roulette');

		res.status(200).json({data: result});
	},

	getPublicFreebies: async(req, res) => {
		const result = await Freebie.find({private: false}).select('-private -__v -created_at');;

		if(!result || !result.length) return res.status(404).json({error: 'no roullets'});

		res.status(200).json({data: result});
	},

	getOnePublicFreebie: async(req, res) => {
		const result = await Freebie.findOne({_id: req.params.id}).select('-private -__v -created_at');

		if(!result) return res.status(404).json({error: 'not found'});

		res.status(200).json({data: result});
	},

	update: async(req, res) => {
		let freebie = await Freebie.findById(req.params.id);

		if(!freebie) return res.status(404).json({error: 'Not found'});
		console.log(req.body);

		freebie = await Freebie.findOneAndUpdate(req.params.id, req.body);

		res.status(200).json({data: freebie});
	},

	delete: async(req, res) => {
		const freebie = await Freebie.findById(req.params.id);

		if(!freebie) return res.status(404).json({error: 'Not found'});

		freebie.remove();

		res.status(200).json({data: freebie});
	},
}