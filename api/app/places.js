const express = require('express');
const mongoose = require("mongoose");
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");
const path = require("path");
const auth = require("../middleware/auth");
const Place = require("../models/Place");
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

router.get('/', async (req, res, next) => {
  try {
    const places = await Place.find();
    return res.send(places);
  } catch (e) {
    next(e);
  }
});

module.exports = router;