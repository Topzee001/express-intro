//explore handlers
const { query } = require('express');
const Explore = require('../models/exploreModel');
const { listenerCount } = require('../app');

exports.getAllExplores = async (req, res) => {
  try {
    console.log(req.query);
    //build the query
    // 1a) filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // console.log(req.query, queryObj);
    // console.log(req.requestTime);

    // 1b) advanced filtering

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));

    // { difficulty: 'easy', duration: {$gte: 5}
    // { difficulty: 'easy', duration: {gte: 5} }
    // gte, gt, lte, lt

    // const query = await Explore.find(queryObj);
    let query = Explore.find(JSON.parse(queryStr));

    //  2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      // console.log(sortBy);
      query = query.sort(sortBy);
      // sort('price ratingsAverage')
    } else {
      query = query.sort('-createdAt');
    }

    // 3) Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      // to exclude the -__v from the response
      query = query.select('-__v');
    }

    // 4) pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    // page=3&limit=10, 1-10, page 1, 11-20, page 2, 21-30 page 3
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numExplores = await Explore.countDocuments();
      if (skip >= numExplores) throw new Error('This page does not exist');
    }

    //execute query
    const explores = await query;
    // query.sort().select().skip().limit()

    // const query = await Explore.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    //send response
    res.status(200).json({
      status: 'success',
      // requestedAt: req.requestTime,
      results: explores.length,
      data: {
        explores,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getExplore = async (req, res) => {
  // console.log(req.params);
  // const id = req.params.id * 1;
  // const explore = explores.find((el) => el.id === id);

  try {
    const explore = await Explore.findById(req.params.id);
    // Explore.findOne({ _id: req.params.id });

    res.status(200).json({
      status: 'success',
      //   results: explores.length,
      data: {
        explore,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createExplore = async (req, res) => {
  //   console.log(req.body);
  try {
    // const newExplore = new Explore({});
    // newExplore.save();

    const newExplore = await Explore.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        explore: newExplore,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
      // message: 'Invalid data sent!',
    });
  }
};

exports.updateExplore = async (req, res) => {
  try {
    const explore = await Explore.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        explore,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      // message: err,
      message: 'Invalid data sent!',
    });
  }
};

exports.deleteExplore = async (req, res) => {
  try {
    await Explore.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      // message: err,
      message: 'Invalid data sent!',
    });
  }
};
