const path = require('path');
const rootPath = __dirname;

let port = 8000;
let dbUrl = 'mongodb://localhost/places';

if (process.env.NODE_ENV === 'test') {
  dbUrl = 'mongodb://localhost/places-test';
  port = 8010;
}

module.exports = {
  port,
  corsWhiteList: [
    'http://localhost:4200',
    'https://localhost:4200',
    'http://localhost:4210',
  ],
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  mongo: {
    db: 'mongodb://localhost/places',
    options: {useNewUrlParser: true},
  },
  facebook: {
    appId: '1137941366959460',
    appSecret: 'f505c11925df23cc06eb5a3d45b544d1'
  }
};
