const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = Schema({
    word: {
        type: String,
        required: true,
    },
    wordData: []
});

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;