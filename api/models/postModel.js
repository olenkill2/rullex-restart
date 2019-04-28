const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// модель страниц
const postSchema = new Schema(
{
	category:
	{
		type: Schema.ObjectId,
		ref: 'Category',
		required: false,
		default: null,
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
	description:
	{
		type: String,
		required: true,
	},
	content:
	{
		type: String,
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
		default: true,
	}
});

module.exports = mongoose.model('Post', postSchema);