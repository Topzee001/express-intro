//explore handlers
const { query } = require('express');
const Explore = require('../models/exploreModel');

exports.getAllExplores = async (req, res) => {
  try {
    console.log(req.query);
    //build the query
    // filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // console.log(req.query, queryObj);
    // console.log(req.requestTime);

    // advanced filtering

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    // { difficulty: 'easy', duration: {$gte: 5}
    // { difficulty: 'easy', duration: {gte: 5} }
    // gte, gt, lte, lt

    // const query = await Explore.find(queryObj);
    const query = await Explore.find(JSON.parse(queryStr));
    //execute query
    const explores = await query;

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
