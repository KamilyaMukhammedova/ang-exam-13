const express = require('express');
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");
const path = require("path");
const auth = require("../middleware/auth");
const Place = require("../models/Place");
const permit = require("../middleware/permit");
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

    for (let i = 0; i < places.length; i++) {
      let foodRatingSum = 0;
      let serviceRatingSum = 0;
      let interiorRatingSum = 0;
      let averageRatingSum = 0;

      for (let j = 0; j < places[i].reviews.length; j++) {
        foodRatingSum += places[i].reviews[j].foodRating;
        serviceRatingSum += places[i].reviews[j].serviceRating;
        interiorRatingSum += places[i].reviews[j].interiorRating;
      }


      places[i].averageFoodRating = Math.round((foodRatingSum / places[i].reviews.length) * 10) / 10;
      places[i].averageServiceRating = Math.round((serviceRatingSum / places[i].reviews.length) * 10) / 10;
      places[i].averageInteriorRating = Math.round((interiorRatingSum / places[i].reviews.length) * 10) / 10;

      averageRatingSum = places[i].averageFoodRating + places[i].averageServiceRating + places[i].averageInteriorRating;

      places[i].fullRating = Math.round((averageRatingSum / 3) * 10) / 10;
    }

    return res.send(places);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, upload.single('mainImage'), async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.description) {
      return res.status(400).send({message: 'Title, description  are required'});
    }

    if (!req.body.isAgree) {
      return res.status(400).send({message: 'Adding of new place should be agree by author'});
    }

    const placeData = {
      user: req.user._id,
      title: req.body.title,
      description: req.body.description,
      mainImage: null,
    };

    if (req.file) {
      placeData.mainImage = req.file.filename;
    }

    const newPlace = new Place(placeData);
    await newPlace.save();
    return res.send(newPlace);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id).populate(
      ({
        path: 'reviews',
        populate: {path: 'user', select: 'displayName'}
      })
    );

    if (!place) {
      return res.status(404).send({message: 'Place is not found'});
    }

    const reviewsNumber = place.reviews.length;

    let foodRatingSum = 0;
    let serviceRatingSum = 0;
    let interiorRatingSum = 0;
    let averageRatingSum = 0;

    for (let i = 0; i < reviewsNumber; i++) {
      foodRatingSum += place.reviews[i].foodRating;
      serviceRatingSum += place.reviews[i].serviceRating;
      interiorRatingSum += place.reviews[i].interiorRating;

      place.averageFoodRating = Math.round((foodRatingSum / reviewsNumber) * 10) / 10;
      place.averageServiceRating = Math.round((serviceRatingSum / reviewsNumber) * 10) / 10;
      place.averageInteriorRating = Math.round((interiorRatingSum / reviewsNumber) * 10) / 10;

      averageRatingSum = place.averageFoodRating + place.averageServiceRating + place.averageInteriorRating;

      place.fullRating = Math.round((averageRatingSum / 3) * 10) / 10;
    }

    return res.send(place);
  } catch (e) {
    next(e);
  }
});

router.post('/review/:id', auth, async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send({message: 'Text, date, food, service and interior rating are required'});
    }

    const data = req.body;
    const place = await Place.findById(req.params.id).updateOne({$push: {reviews: data}});

    return res.send(place);
  } catch (e) {
    next(e);
  }
});

router.post('/photo/:id', auth, upload.single('photo'), async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send({message: 'Data is required'});
    }

    const data = {
      user: req.body.user,
      photo: req.file ? req.file.filename : null,
    };
    const place = await Place.findById(req.params.id).updateOne({$push: {photoGallery: data}});

    return res.send(place);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', auth, permit('Admin'), async (req, res, next) => {
  try {
    await Place.deleteOne({_id: req.params.id});

    return res.send({message: `Place with id ${req.params.id} has been removed`});
  } catch (e) {
    next(e);
  }
});



module.exports = router;