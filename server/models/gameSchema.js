var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewRatingSchema = new Schema({
    reviewWriter: String,
    reviewName: String,
    reviewComments: String,
    rating: String
});

var gameSchema = new Schema({
    title: String,
    price: Number,
    stock: Number,
    description: String,
    reviewRating: [reviewRatingSchema],
    imgSrc: String
});

var collectionName = 'gamesDatabase';

const Game = mongoose.model('gameModel', gameSchema, collectionName);

module.exports = Game;