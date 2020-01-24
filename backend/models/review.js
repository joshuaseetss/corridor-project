const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  starValue: { type: String, require: true },
  photo: { type: String },
  desc: { type: String },
  serviceProvider: { type: String, require: true },
  customer: { type: String, require: true },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true }
}, { collection: 'reviews' });

module.exports = mongoose.model('Review', reviewSchema);