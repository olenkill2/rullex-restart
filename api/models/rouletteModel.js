const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rouletteSchema = new Schema(
{
	name:
	{
		type: String,
		required: true
	},
	host:
	{
		type: String,
		required: true,
		unique: true
	},
	private:
	{
		type: Boolean,
		default: true
	},
	// modes:
	// [{
	// 	type: Schema.ObjectId,
	// 	ref : 'modes'
	// 	default: null
	// }],
	authValidationRuleFunction:
	{
		type: String,
		default: '',
	},
	balanceParseFunction:
	{
		type: String,
		default: '',
	},
	gameFunctionForMode:
	[
		{
			type: Array,
			default: {
				modeName: '',
				function: ''
			}
		}
	],
	created_at:
	{
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('Roulette', rouletteSchema);