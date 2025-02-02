const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Explore = require('../../models/exploreModel');

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

//READ JSON FILE
const explores = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);
//improt data into data base
const importData = async () => {
  try {
    await Explore.create(explores);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//Delete all data from db collection
const deleteData = async () => {
  try {
    await Explore.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
