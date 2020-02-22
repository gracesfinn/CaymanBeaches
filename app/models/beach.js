'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const beachSchema = new Schema({
  name: String,
  description: String,
  categories: [String],
  creator: String
});

module.exports = Mongoose.model('Beach', beachSchema);