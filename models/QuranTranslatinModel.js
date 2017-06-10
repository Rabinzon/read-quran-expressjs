const mongoose = require('mongoose');
const surah = require('./surahSchema');

module.exports = (collection) =>
    mongoose.model(collection, surah);
