const mongoose = require('mongoose');
const config = require('./config');
const {nanoid} = require('nanoid');
const User = require("./models/User");
const Place = require("./models/Place");

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);
  const collections = await mongoose.connection.db.listCollections().toArray();
  for (const coll of collections) {
    await mongoose.connection.dropCollection(coll.name);
  }

  const [user, admin, jhonDoe] = await User.create({
    email: 'user@mail.ru',
    password: '123',
    avatar: 'user.jpg',
    displayName: 'Jack Doe',
    token: nanoid(),
    role: 'User'
  }, {
    email: 'admin@mail.ru',
    password: '456',
    avatar: 'admin.jpg',
    displayName: 'Admin',
    token: nanoid(),
    role: 'Admin'
  }, {
    email: 'doe@mail.ru',
    password: '123',
    avatar: 'JhonDoe.jpg',
    displayName: 'Jhon Doe',
    token: nanoid(),
    role: 'User'
  });

  const [sunkenFlagon, brokenSword, bannedMare] = await Place.create({
    user: user,
    title: 'Sunken Flagon',
    description: 'The ambiance of the cafe, its homey aroma, draws my soul into its cocoon for a few blessed moments.',
    mainImage: 'sunkenFlagon.jpg',
    fullRating: 0,
    averageFoodRating: 0,
    averageServiceRating: 0,
    averageInteriorRating: 0,
    reviews: [
      {
        user: jhonDoe,
        text: 'Good place!',
        foodRating: 5,
        serviceRating: 4,
        interiorRating: 5,
      },
      {
        user: user,
        text: 'Love it!',
        foodRating: 4,
        serviceRating: 5,
        interiorRating: 5,
      }
    ],
    photoGallery: [
      {user: jhonDoe, photo: 'cafe1.jpg'},
      {user: user, photo: 'cafe2.jpg'},
    ],
  }, {
    user: jhonDoe,
    title: 'The broken sword',
    description: 'The cafe in such honeyed hues brings a sweetness to the day, coaxing an inner smile that warms from within.',
    mainImage: 'brokenSword.jpg',
    fullRating: 0,
    averageFoodRating: 0,
    averageServiceRating: 0,
    averageInteriorRating: 0,
    reviews: [
      {
        user: admin,
        text: 'Nice place!',
        foodRating: 5,
        serviceRating: 5,
        interiorRating: 5,
      },
      {
        user: user,
        text: 'No comments!',
        foodRating: 2,
        serviceRating: 3,
        interiorRating: 4,
      }
    ],
    photoGallery: [
      {user: admin, photo: 'cafe1.jpg'},
      {user: user, photo: 'cafe2.jpg'},
    ],
  }, {
    user: user,
    title: 'The Banned Mare',
    description: 'The cafe tables in their rich deep browns, the aroma with its dark aromatic perfume, call me in from the wintry day.',
    mainImage: 'bannedMare.jpg',
    fullRating: 0,
    averageFoodRating: 0,
    averageServiceRating: 0,
    averageInteriorRating: 0,
    reviews: [
      {
        user: admin,
        text: 'Adore it!',
        foodRating: 5,
        serviceRating: 5,
        interiorRating: 5,
      },
      {
        user: jhonDoe,
        text: 'No so good!',
        foodRating: 3,
        serviceRating: 4,
        interiorRating: 5,
      }
    ],
    photoGallery: [
      {user: admin, photo: 'cafe1.jpg'},
      {user: jhonDoe, photo: 'cafe2.jpg'},
    ],
  });

  await mongoose.connection.close();
};

run().catch(e => console.error(e));