const mongoose = require('mongoose');
const config = require('./config');
const {nanoid} = require('nanoid');
const User = require("./models/User");

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);
  const collections = await mongoose.connection.db.listCollections().toArray();
  for (const coll of collections) {
    await mongoose.connection.dropCollection(coll.name);
  }

  const [user, admin] = await User.create({
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
  });

  await mongoose.connection.close();
};

run().catch(e => console.error(e));