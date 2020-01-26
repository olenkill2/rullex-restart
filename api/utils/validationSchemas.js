const Joi = require('joi');
module.exports = {
    newUser: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6).max(255)
    }).options({ allowUnknown: true }),

    category: Joi.object().keys({
        category: Joi.string().required().min(4).max(200),
    }).options({ allowUnknown: true }),

    post: Joi.object().keys({
        url: Joi.string().required().min(1).max(512),
        title: Joi.string().required().min(3).max(512),
        content: Joi.object().required(),
        private: Joi.boolean().required(),
    }).options({ allowUnknown: true }),

    mode: Joi.object().keys({
        name: Joi.string().required().min(3).max(256),
        fields: Joi.array().required(),
    }).options({ allowUnknown: true }),

    roulette: Joi.object().keys({
        name: Joi.string().required().min(3).max(512),
        host: Joi.string().required().min(3).max(2024),
        private: Joi.boolean().required(),
        color: Joi.string().required(),
        functions: Joi.object().required(),
        modes: Joi.array().required(),
        referal: Joi.object().required(),
        currency: Joi.object().required(),
    }).options({ allowUnknown: true }),

    freebie: Joi.object().keys({
        title: Joi.string().required().min(3).max(512),
        description: Joi.string().required().min(3).max(2024),
        type: Joi.string().required(),
        profit: Joi.string().required(),
        roulette: Joi.required(),
        status: Joi.required()
    }).options({ allowUnknown: true }),

    menu: Joi.object().keys({
        label: Joi.string().required(),
        url: Joi.string().required().min(1).max(2024),
        order: Joi.number().required().min(0),
        private: Joi.boolean().required(),
    }).options({ allowUnknown: true }),

    seo: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required().min(1).max(2024),
        slug: Joi.string().required(),
        private: Joi.boolean().required(),
        ogTitle: Joi.string().required()
    }).options({ allowUnknown: true }),
};