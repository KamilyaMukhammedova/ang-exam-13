const path = require('path');
const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  mongo: {
    db: 'mongodb://localhost/cocktails',
    options: {useNewUrlParser: true},
  },
  facebook: {
    appId: '1137941366959460',
    appSecret: 'f505c11925df23cc06eb5a3d45b544d1'
  }
};
