const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
	category: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	created_at:{
		type: Date,
		required: true,
		default: Date.now,
	},
});

module.exports = mongoose.model('Category', categorySchema);