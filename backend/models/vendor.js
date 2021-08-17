const mongoose = require('mongoose');

let Vendor = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    totalRating: {
        type: Number,
    },
    numberOfRating: {
        type: Number,
    }
});

module.exports = mongoose.model('Vendor', Vendor);