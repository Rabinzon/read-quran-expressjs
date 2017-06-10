const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const oneSchema = mongoose.Schema({
    text: String
});

const surahSchema = mongoose.Schema({
    title: String,
    ayats: [{
        text: String,
        title: String,
        order: Number,
        surah: Number,
        chron: Number
    }],
    surah: Number,
    chron: Number
});

module.exports = surahSchema;
