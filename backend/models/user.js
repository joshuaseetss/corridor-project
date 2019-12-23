const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const serviceProviderSchema = mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  phone: { type: String, require: true },
  password: { type: String, require: true },
  name: { type: String, require: true },
  address: { type: String, require: true },
  postalCode: { type: String, require: true },
  serviceCategory:  { type: String },
  description:  { type: String },
  tags:  { type: String },
  portfolio: { type: Array },
  service1: { type: String },
  service2: { type: String }
}, { collection: 'serviceProviders' });

const customerSchema = mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  phone: { type: String, require: true },
  password: { type: String, require: true }
}, { collection: 'customers' });

serviceProviderSchema.plugin(uniqueValidator);
customerSchema.plugin(uniqueValidator);

const users = {
  ServiceProvider: mongoose.model('ServiceProvider', serviceProviderSchema),
  Customer: mongoose.model('Customer', customerSchema)
}

module.exports = users;