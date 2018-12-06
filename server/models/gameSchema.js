//import required libraries and modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//define new schema
var reviewRatingSchema = new Schema({
    reviewWriter: String,
    reviewName: String,
    reviewComments: String,
    rating: String
});
//define new schema
var gameSchema = new Schema({
    title: String,
    price: Number,
    stock: Number,
    description: String,
    reviewRating: [reviewRatingSchema],
    imgSrc: String
});

//create new model user and export for specified database
var collectionName = 'gamesDatabase';

const Game = mongoose.model('gameModel', gameSchema, collectionName);

module.exports = Game;