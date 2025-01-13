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

app.get('/api/v1/explores', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: explores.length,
    data: {
      explores,
    },
  });
});

app.post('/api/v1/explores', (req, res) => {
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
});

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
