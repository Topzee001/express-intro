//explore handlers
const fs = require('fs');

const explores = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllExplores = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: explores.length,
    data: {
      explores,
    },
  });
};

exports.getExplore = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const explore = explores.find((el) => el.id === id);

  //   if (id > explores.length) {
  if (!explore) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    //   results: explores.length,
    data: {
      explore,
    },
  });
};

exports.createExplore = (req, res) => {
  //   console.log(req.body);
  const newId = explores[explores.length - 1].id + 1;
  const newExplore = Object.assign({ id: newId }, req.body);

  explores.push(newExplore);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(explores),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          explore: newExplore,
        },
      });
    }
  );

  //   res.send('Done');
};

exports.updateExplore = (req, res) => {
  if (req.params.id * 1 > explores.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      explore: '<Updated explore here...>',
    },
  });
};

exports.deleteExplore = (req, res) => {
  if (req.params.id * 1 > explores.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
