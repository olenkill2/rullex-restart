const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema(
{
	name:
	{
		type: String,
		required: true
	},
	url:
	{
		type: String,
		required: true,
		unique: true
	},
	order:
	{
		type: Number,
		default: 0,
	},
	category:
	{
		type: Schema.ObjectId,
		ref: 'Category',
		required: false
	},
	private:
	{
		type: Boolean,
		default: false
	},
	created_at:
	{
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('Menu', menuSchema);