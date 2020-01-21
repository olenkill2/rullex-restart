const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const freebieSchema = new Schema(
{
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	profit: {
		type: String,
		required: true,
	},
	roulette: {
		type: Schema.Types.ObjectId,
		ref: 'Roulette'
	},
	timeToEnd: {
		type: String,
		default: '',
	},
	status: {
		type: String,
		enum: ['private', 'end', 'work'],
		default: 'private'
	},
	created_at: {
		type: Date,
		default: Date.now()
	},
});

module.exports = mongoose.model('Freebie', freebieSchema);