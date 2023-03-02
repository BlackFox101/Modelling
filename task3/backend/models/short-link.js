const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShortLink = new Schema({
    link: String,
    shortLink: String,
    name: String,
    authorName: String,
    deletedAt: Date|null,
    createdAt: Date
});

module.exports = mongoose.model('ShortLink', ShortLink);