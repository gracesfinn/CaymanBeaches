'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const beachSchema = new Schema({
  name: String,
  location: String,
  description: String,
  categories: [String],
  creator: String,
  imageMain: String,
});



beachSchema.statics.removeBeach = function(id){
  return this.findOneAndRemove({
    "_id":id
  });
};

module.exports = Mongoose.model('Beach', beachSchema);