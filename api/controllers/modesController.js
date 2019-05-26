const Mode = require('../models/modeModel.js');
const mongoose = require('mongoose');
module.exports =
{
	add: async(req, res) => {
		let modeData = req.body;
		let mode = await Mode.findOne({ 'name': modeData.name });

		if(mode) return res.status(403).json({error: 'Мод уже существует'});

		modeData.created_at = Date.now();

		const newMode = new Mode(newMode)
		await newMode.save();
		res.status(200).json({data: newMode});
	},
	getPublicMode: async(req, res) => {
		const mode = await Mode.findById(req.params.id);

		if(!mode) return res.status(404).json({error: 'Not found'});

		res.status(200).json({data: mode});
	},
	getAll: async(req, res) => {
		const modes = await Mode.find();
		res.status(200).json({data: modes});
	},
	update: async(req, res) => {
		const updatedMode = await Mode.findOneAndUpdate({'_id': req.params.id}, req.body);

		if(!updatedMode) return res.status(404).json({error: 'Not found'});

		res.status(200).json({data: updatedMode});
	},
	delete: async(req, res) => {
		const deletedMode = await Mode.deleteOne({'_id': req.params.id});

		if(!deletedMode) return res.status(404).json({error: 'Not found'});

		res.status(200).json({data: deletedMode});
	},
}