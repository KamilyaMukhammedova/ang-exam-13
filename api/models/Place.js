const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  foodRating: {
    type: Number,
    default: 0,
  },
  serviceRating: {
    type: Number,
    default: 0,
  },
  interiorRating: {
    type: Number,
    default: 0,
  },
});

const PhotoGallerySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  photo: String,
});

const PlaceSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mainImage: {
    type: String,
  },
  fullRating: {
    type: Number,
    default: 0,
  },
  averageFoodRating: {
    type: Number,
    default: 0,
  },
  averageServiceRating: {
    type: Number,
    default: 0,
  },
  averageInteriorRating: {
    type: Number,
    default: 0,
  },
  reviews: [ReviewSchema],
  photoGallery: [PhotoGallerySchema],
});

const Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;