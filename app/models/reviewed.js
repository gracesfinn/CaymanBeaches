'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const reviewsSchema = new Schema({
    amount: Number,
    method: String,
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Mongoose.model('Reviews', reviewsSchema);