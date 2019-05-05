const Mode = require('../models/modeModel.js');
const mongoose = require('mongoose');
module.exports =
{
	add: async(req, res) => {
		const newMode = req.body;
		Mode.findOne({ 'name': newMode.name }).then((data) => {
			if(data)
			{
				res.status(403).json({error: 'Мод уже существует'});
			}
			else
			{
				newMode.created_at = Date.now();

				new Mode(newMode).save().then((data) => {
					res.status(200).json(data);
				}).catch((err) => {
					if(err)
						res.status(400).json({error: 'чего-то не хватает'})
				});
			}
		});
	},
	getByName: async(req, res) => {
		Mode.find({name: req.params.name}).then((data) => {
			res.status(200).json({data});
		}).catch((err) => {
			console.log(err);
			res.status(400).json('error')
		});
	},
	getAll: async(req, res) => {
		Mode.find().then((data) => {
			res.status(200).json({data});
		}).catch((err) => {
			console.log(err);
			res.status(400).json('error')
		});
	},
	update: async(req, res) => {
		Mode.findOneAndUpdate({'_id': req.params.id}, req.body.mode).then((data) => {
			res.status(200).json({data});
		}).catch((err) => {
			console.log(err);
			res.status(400).json('error')
		});
	},
	delete: async(req, res) => {
		Mode.deleteOne({'_id': req.params.id}).then((data) => {
			res.status(200).json({data});
		}).catch((err) => {
			res.status(400).json('error')
		});
	},
}