const mongoose = require('mongoose');
// creating data(explore) model using schema
const exploreSchema = new mongoose.Schema({
  name: {
    type: String,
    //for error when field is missing, validator
    required: [true, 'An Explore name is required'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'An explore must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'An explore must have a description'],
  },
  imageCover: {
    type: String,
    required: [true, 'An explore must have images'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

//create a model out of the schema
const Explore = mongoose.model('Explore', exploreSchema);

module.exports = Explore;
