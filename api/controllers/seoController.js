const Seo = require('../models/seoModel.js');
const mongoose = require('mongoose');

module.exports = {
    add: async(req, res) => {
        const newSeo = req.body;
        const result = await Seo.findOne({ 'slug': newSeo.slug });

        if (result)
            return res.status(403).json({ error: 'Сео для этой страницы уже задано' });

        const seoData = await Seo.create(newSeo);

        res.status(200).json({ data: seoData });
    },

    getAll: async(req, res) => {
        const seoData = await Seo.find();

        res.status(200).json({ data: seoData });
    },

    getBySlug: async(req, res) => {
        const seoData = await Seo.findOne({ slug: req.query.url, private: false }).select('-private -__v -created_at');

        if (!seoData) return res.status(404).json({ error: 'no roullets' });

        res.status(200).json({ data: seoData });
    },

    update: async(req, res) => {
        let seoData = await Seo.findById(req.params.id);

        if (!seoData) return res.status(404).json({ error: 'Not found' });

        seoData = await Seo.findOneAndUpdate(req.params.id, req.body);

        res.status(200).json({ data: seoData });
    },

    delete: async(req, res) => {
        const seoData = await Seo.findById(req.params.id);

        if (!seoData) return res.status(404).json({ error: 'Not found' });

        seoData.remove();

        res.status(200).json({ data: seoData });
    },
}