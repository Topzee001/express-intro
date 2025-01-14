const fs = require('fs');

const express = require('express');

const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello from topzee', app: 'first app' });
// });

// app.post('/', (req, res) => {
//   res.send('post request test baby');
// });

const explores = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllExplores = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: explores.length,
    data: {
      explores,
    },
  });
};

const getExplore = (req, res) => {
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

const createExplore = (req, res) => {
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

const updateExplore = (req, res) => {
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

const deleteExplore = (req, res) => {
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

// app.get('/api/v1/explores', getAllExplores);
// app.get('/api/v1/explores/:id', getExplore);
// app.post('/api/v1/explores', createExplore);
// app.patch('/api/v1/explores/:id', updateExplore);
// app.delete('/api/v1/explores/:id', deleteExplore);

app.route('/api/v1/explores').get(getAllExplores).post(createExplore);
app
  .route('/api/v1/explores/:id')
  .get(getExplore)
  .patch(updateExplore)
  .delete(deleteExplore);

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
