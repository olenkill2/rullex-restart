const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// модель ползователя
const userSchema = new Schema(
{
	method:
	{
		type: String,
		enum: ['local', 'google', 'vk', 'yandex', 'facebook'],
		required: true
	},
	local:
	{
		email:
		{
			type: String,
			lowercase: true
		},
		password:
		{
			type: String,
		},
	},
	google:
	{
		id:
		{
			type: String
		},
		email:
		{
			type: String,
			lowercase: true
		}
	},
	vk:
	{
		id:
		{
			type: String
		},
		email:
		{
			type: String,
			lowercase: true
		}
	},
	yandex: {
		id:
		{
			type: String
		},
		email:
		{
			type: String,
			lowercase: true
		}
	},
	facebook: {
		id:
		{
			type: String
		},
		email:
		{
			type: String,
			lowercase: true
		}
	},
	created_at:
	{
		type: Date,
		required: true,
		default: Date.now
	},
	role: {
		type: String,
		enum: ['user'],
		default: 'user'
	}
});

// генерим соль
userSchema.pre('save', async function(next)
{
	try
	{
		// если авторизация по через соц сети, то переходим к следующему Midliware
		if (this.method !== 'local')
			next();

		// гереним соль и хэш пароля
		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(this.local.password, salt);
		this.local.password = passwordHash;
		next();
	}
	catch(err)
	{
		next(err);
	}
});

// проверка хэша пароля
userSchema.methods.isValidPassword = async function(newPassword)
{
	try
	{
		return await bcrypt.compare(newPassword, this.local.password);
	}
	catch(err)
	{
		throw new Error(err);
	}
}

module.exports = mongoose.model('User', userSchema);
