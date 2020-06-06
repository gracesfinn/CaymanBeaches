'use strict';

const Mongoose = require ('mongoose');
const Schema = Mongoose.Schema;

const checkInSchema = new Schema({
  member: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  memberName: String,
  beach:{
    type: Schema.Types.ObjectId,
    ref: 'Beach'
  },
  beachImage: String,
  beachName: String,
  groupSize: Number,
  comment: String,
  date: String,
});

module.exports = Mongoose.model('CheckIn', checkInSchema);