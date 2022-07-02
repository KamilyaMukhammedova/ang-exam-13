const express = require('express');
const mongoose = require("mongoose");
const User = require("../models/User");
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");
const path = require("path");
const axios = require('axios');
const fs = require("fs");
const fetch = require('node-fetch');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});

function getAvatar(url, path) {
  return fetch(url).then(res => {
    res.body.pipe(fs.createWriteStream(path));
  });
}

router.post('/', upload.single('avatar'),async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.displayName) {
      return res.status(400).send({message: 'Email, password and display name are required!'});
    }
    const userData = {
      email: req.body.email,
      password: req.body.password,
      avatar: null,
      displayName: req.body.displayName,
      token: req.body.token,
      role: req.body.role
    };
    if (req.file) {
      userData.avatar = req.file.filename;
    }
    const newUser = new User(userData);
    newUser.generateToken();
    await newUser.save();
    return res.send(newUser);
  } catch (e) {
    if(e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

router.post('/sessions', async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({message: 'Email and password are required!'});
    }
    const user = await User.findOne({email: req.body.email});
    if(!user) {
      return res.status(400).send({error: 'Email is not found'});
    }
    const isMatch = await user.checkPassword(req.body.password);
    if(!isMatch){
      return res.status(400).send({error: 'Password is wrong'});
    }
    user.generateToken();
    await user.save();
    return res.send(user);
  } catch (e) {
    if(e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

router.delete('/sessions', async(req, res, next) => {
  try {
    const token = req.get('Authorization');
    const message = {message: 'Ok'};

    if(!token) {
      return res.send(message);
    }

    const user = await User.findOne({token});

    if(!user) {
      return res.send(message);
    }

    user.generateToken();
    await user.save();
    return res.send(message);
  } catch (e) {
    next(e)
  }
});

router.post('/facebookLogin', async (req, res, next) => {
  try {
    const inputToken = req.body.authToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;
    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    const response = await axios.get(debugTokenUrl);

    if(response.data.data.error) {
      return res.status(401).send({message: 'Facebook token incorrect'});
    }

    if(req.body.id  !== response.data.data.user_id) {
      return res.status(401).send({message: 'Wrong user id'});
    }

    let user = await User.findOne({facebookId: req.body.id});

    if(!user) {
      const avatar = `${nanoid()}.jpeg`;
      await getAvatar(req.body.avatar, `./public/uploads/${avatar}`);
      user = new User({
        email: req.body.email,
        password: nanoid(),
        facebookId: req.body.id,
        displayName: req.body.name,
        avatar: avatar
      });
    }

    user.generateToken();
    await user.save();
    return res.send(user);
  } catch (e) {
    next(e);
  }
});

module.exports = router;