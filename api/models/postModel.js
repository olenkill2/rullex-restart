const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// модель страниц
const postSchema = new Schema({
	url: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true
	},
	content: {
		type: Object,
		required: true,
	},
	created_at: {
		type: Date,
		required: true,
		default: Date.now,
	},
	private: {
		type: Boolean,
		default: true,
	}
});

module.exports = mongoose.model('Post', postSchema);