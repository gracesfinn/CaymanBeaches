'use strict';

const Mongoose = require ('mongoose');
const Schema = Mongoose.Schema;

const checkInScehma = new Schema({
  member : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  beach: {
    type: Schema.Types.ObjectId,
    ref: 'Beach'
  },
  groupSize: Number,
  comment: String
});

module.exports = Mongoose.model('CheckIn',checkInScehma);