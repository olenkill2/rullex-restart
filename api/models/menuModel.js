const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
	label: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true,
	},
	order: {
		type: Number,
		default: 0,
	},
	category: {
		type: String,
		default: 'none',
	},
	private: {
		type: Boolean,
		default: false
	},
	created_at: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('Menu', menuSchema);