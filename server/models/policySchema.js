//import required libraries and modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//define new schema
var policySchema = new Schema({
    security: String,
    privacy: String,
    dmca: String
});

//create new model user and export for specified database
var collectionName = 'policyDatabase';

const Policy = mongoose.model('policyModel', policySchema, collectionName);

module.exports = Policy;