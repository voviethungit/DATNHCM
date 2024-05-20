const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  position: {
    type: String,
    enum: ['header', 'sidebar', 'footer', 'body'],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Ads", AdsSchema);
