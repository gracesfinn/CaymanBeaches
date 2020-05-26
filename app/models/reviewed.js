'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const reviewsSchema = new Schema({
    beach: String,
    reviewer: String,
    comment: String
});

module.exports = Mongoose.model('Reviews', reviewsSchema);