//explore handlers
const Explore = require('../models/exploreModel');

exports.getAllExplores = async (req, res) => {
  try {
    // console.log(req.requestTime);
    const explores = await Explore.find();

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
      // message: err,
      message: 'Invalid data sent!',
    });
  }
};

exports.updateExplore = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      explore: '<Updated explore here...>',
    },
  });
};

exports.deleteExplore = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
