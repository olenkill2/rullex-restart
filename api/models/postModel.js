const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// модель страниц
const postSchema = new Schema(
{
	category:
	{
		type: Schema.ObjectId,
		ref: 'category',
	},
	name:
	{
		type: String,
		default: 'Название',
	},
	url:
	{
		type: String,
		required: true,
	},
	title:
	{
		type: String,
		required: true,
	},
	desctiption:
	{
		type: String,
		required: true,
	},
	content:
	{
		type: String,
		required: true,
	},
	created_at:
	{
		type: Date,
		required: true,
		default: Date.now,
	},
	private:
	{
		type: Boolean,
		default: false,
	}
});

module.exports = mongoose.model('Post', postSchema);