const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from topzee', app: 'first app' });
});

app.post('/', (req, res) => {
  res.send('post request test baby');
});

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
