const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const app = express();
const users = require('./app/users');
const places = require('./app/places');

const corsOptions = {
  origin: (origin, callback) => {
    if (origin === undefined || config.corsWhiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/users', users);
app.use('/places', places);


const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);
  app.listen(config.port, () => {
    console.log(`Server started on ${config.port} port!`);
  });
  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(e => console.error(e));