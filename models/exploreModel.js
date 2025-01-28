const mongoose = require('mongoose');
// creating data(explore) model using schema
const exploreSchema = new mongoose.Schema({
  name: {
    type: String,
    //for error when field is missing, validator
    required: [true, 'An Explore name is required'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: 'An explore must have a price',
  },
});

//create a model out of the schema
const Explore = mongoose.model('Explore', exploreSchema);

module.exports = Explore;
