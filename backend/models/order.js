const mongoose = require('mongoose');

let Order = new mongoose.Schema({
    orderCustomer:{
        type: String,
        required: true
    },
    orderProduct:{
        type: String,
        required: true
    },
    orderQuantity:{
        type: Number,
        required: true
    },
    orderReview:{
        type: String,
    },
    orderRating:{
        type:Number,
    }
});

module.exports = mongoose.model('Order', Order);