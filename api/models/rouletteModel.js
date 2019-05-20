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
			type: Object,
			default: {
				modeName: '',
				function: ''
			}
		}
	],
	referalChangeFunction:
	{
		type: String,
		default: '',
	},
	referal:
	{
		type: Object,
		url: '',
		refType: '',
		code: '',
	},
	created_at:
	{
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('Roulette', rouletteSchema);