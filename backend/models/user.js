const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const serviceProviderSchema = mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  phone: { type: Number, require: true },
  password: { type: String, require: true },
  name: { type: String, require: true },
  address: { type: String, require: true },
  postalCode: { type: Number, require: true },
  serviceCategory:  { type: String },
  description:  { type: String },
  tags:  { type: String },
  portfolio: { type: Image },
  service1: { type: String },
  service2: { type: String }
});

const customerSchema = mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  phone: { type: Number, require: true },
  password: { type: String, require: true }
});

serviceProviderSchema.plugin(uniqueValidator);
customerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
module.exports = mongoose.model('Customer', customerSchema);