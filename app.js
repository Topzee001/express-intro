const express = require('express');
const morgan = require('morgan');

const exploreRouter = require('./routes/exploreRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//1. middlewares
// console.log(process.env.NODE_ENV);
//run code for either dev or prod
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Routes
app.use('/api/v1/explores', exploreRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
