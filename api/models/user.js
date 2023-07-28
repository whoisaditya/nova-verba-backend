const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
    },
    userProfileUrl: {
        type: String,
    },
    book: {
        type: Array,
        default: []
    },
    counter: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;