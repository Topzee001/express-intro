const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
// creating data(explore) model using schema
const exploreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //for error when field is missing, validator
      required: [true, 'An Explore name is required'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'An Explore name must have less or equal than 40 characters',
      ],
      minlength: [
        10,
        'An Explore name must have more or equal than 10 characters',
      ],
      validate: [
        validator.isAlpha,
        'Explore name must only contain characters',
      ],
    },

    slug: String,
    duration: {
      type: Number,
      required: [true, 'A explore must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A explore must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A explore must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'An explore must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price; // 100 <200
        },
        message: 'Discount price ({VALUE}) should be below the regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      // required: [true, 'An explore must have a description'],
    },
    imageCover: {
      type: String,
      required: [true, 'An explore must have images'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretExplore: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

exploreSchema.virtual('durationweeks').get(function () {
  return this.duration / 7;
});
// DOCUMENT MIDDLEWARE runs b4 the .save() and .create() command
exploreSchema.pre('save', function (next) {
  console.log(this);
  this.slug = slugify(this.name, { lower: true });
  next();
});

// exploreSchema.pre('save', function (next) {
//   console.log('Will save document...');
//   next();
// });

// exploreSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE

// exploreSchema.pre('find', function (next) {
//to find all explores that starts with find, including the findOne and find hook
exploreSchema.pre(/^find/, function (next) {
  this.find({ secretExplore: { $ne: true } });

  this.start = Date.now();
  next();
});

exploreSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  // console.log(docs);
  next();
});

// AGGREGATION MIDDLEWARE
exploreSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretExplore: { $ne: true } } });
  console.log(this.pipeline());
  next();
});
//create a model out of the schema
const Explore = mongoose.model('Explore', exploreSchema);

module.exports = Explore;
