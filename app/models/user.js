'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});
userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email : email});
};

userSchema.methods.comparePassword = function(candidatePassword) {
    const isMatch = this.password === candidatePassword;
    if (!isMatch) {
        throw Boom.unauthorized('Password mismatch');
    }
    return this;
};

userSchema.statics.removeUser = function(id){
    return this.findOneAndRemove({
        "_id":id
    });
};

module.exports = Mongoose.model('User', userSchema);