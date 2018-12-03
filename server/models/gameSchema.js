var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var reviewRatingSchema = require("../models/reviewRatingSchema");

var reviewRatingSchema = new Schema({
    reviewName: String,
    reviewComments: String,
    rating: String
});

var gameSchema = new Schema({
    title: String,
    description: String,
    reviewRating: [reviewRatingSchema],
    imgSrc: String
});

var collectionName = 'gamesDatabase';

const Game = mongoose.model('gameModel', gameSchema, collectionName);

module.exports = Game;