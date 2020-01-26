const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// модель страниц
const seoSchema = new Schema({
    slug: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pageType: {
        type: String,
        default: 'article'
    },
    keywords: {
        type: String,
        default: ''
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
    ogTitle: {
        type: String,
        required: true,
    },
    ogDescription: {
        type: String,
    },
    ogImg: {
        type: String,
        default: ''
    },
    private: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model('SEO', seoSchema);