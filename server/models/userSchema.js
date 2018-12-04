var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

var collectionName = 'usersDatabase';

const User = mongoose.model('userModel', userSchema, collectionName);

module.exports = User;