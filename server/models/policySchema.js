var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var policySchema = new Schema({
    security: String,
    privacy: String,
    dmca: String
});

var collectionName = 'policyDatabase';

const Policy = mongoose.model('policyModel', policySchema, collectionName);

module.exports = Policy;