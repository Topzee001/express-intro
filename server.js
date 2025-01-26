const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

// console.log(app.get('env'));
// console.log(process.env);
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose

  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() =>
    // console.log(con.connections);
    console.log('DB connection successful'),
  );
// creating data(explore) model using schema
const exploreSchema = new mongoose.Schema({
  name: {
    type: String,
    //for error when field is missing
    required: [true, 'An Explore name is required'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: { type: Number, required: 'An explore must have a price' },
});

//create a model out of the schema
const Explore = mongoose.model('Explore', exploreSchema);
// Start Server

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//to connect to local database
//   // .connect(process.env.DATABASE_LOCAL, {
