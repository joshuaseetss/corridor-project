const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const serviceProviderSchema = mongoose.Schema({
  userType: { type: String, require: true },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  phone: { type: String, require: true },
  password: { type: String, require: true },
  profilePhoto: { type: String },
  name: { type: String, require: true },
  address: { type: String, require: true },
  postalCode: { type: String, require: true },
  serviceCategories:  { type: Array },
  description:  { type: String },
  tags:  { type: String },
  openingHours: { type: Array },
  portfolio: { type: Array },
  services: { type: Array },
  avgRating: { type: String },
  noOfReviews: { type: String }
}, { collection: 'serviceProviders' });

const customerSchema = mongoose.Schema({
  userType: { type: String, require: true },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  phone: { type: String, require: true },
  password: { type: String, require: true },
  profilePhoto: { type: String }
}, { collection: 'customers' });

serviceProviderSchema.plugin(uniqueValidator);
customerSchema.plugin(uniqueValidator);

const users = {
  ServiceProvider: mongoose.model('ServiceProvider', serviceProviderSchema),
  Customer: mongoose.model('Customer', customerSchema)
}

module.exports = users;