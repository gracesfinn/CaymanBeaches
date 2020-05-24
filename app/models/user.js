'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const bcrypt = require('bcrypt');          // ADDED


const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});
userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email : email});
};

userSchema.methods.comparePassword = async function(candidatePassword) {        // EDITED
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};


userSchema.statics.removeUser = function(id){
    return this.findOneAndRemove({
        "_id":id
    });
};

module.exports = Mongoose.model('User', userSchema);