//import required libraries and modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//define new schema
var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

//create new model user and export for specified database
var collectionName = 'usersDatabase';

const User = mongoose.model('userModel', userSchema, collectionName);

module.exports = User;