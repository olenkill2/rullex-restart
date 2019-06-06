const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modeSchema = new Schema(
{
	name:
	{
		type: String,
		required: true
	},
	fields:
	[
		{
			label: String,
			name: String,
			placeholder: String,
			model: String,
			component: String,
			dropDownList:[],
		}
	],
	created_at:
	{
		type: Date,
		default: Date.now()
	},
});

module.exports = mongoose.model('Mode', modeSchema);