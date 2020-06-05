'use strict';

const Mongoose = require ('mongoose');
const Schema = Mongoose.Schema;

const checkInSchema = new Schema({
  memberId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  memberName:{
    type: String,
    ref: 'User'
  },
  beachId:  {
    type: Schema.Types.ObjectId,
    ref: 'Beach',
  },
  beachName: {
    type: ,
    ref:'Beach'
  },
  groupSize: Number,
  comment: String,
  date: { type: Date, default: Date.now }
});

module.exports = Mongoose.model('CheckIn', checkInSchema);