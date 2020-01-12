const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rouletteSchema = new Schema(
{
	name:
	{
		type: String,
		required: true
	},
	description: {
		type: String,
		default: ''
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
	color:
	{
		type: String,
		required: true,
		default: '#0492F2'
	},
	modes: [{type: Schema.Types.ObjectId, ref: 'Mode'}],
	supportedModes: [{type: Schema.Types.ObjectId, ref: 'Mode'}],
	functions:
	{
		type: Object,
		default: {
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
			referalChangeFunction:
			{
				type: String,
				default: '',
			},
			gameFunctionForMode:
			[
				{
					default: {
						modeName: '',
						function: '',
						mode_id: ''
					}
				}
			],
		}
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