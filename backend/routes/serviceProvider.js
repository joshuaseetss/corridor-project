const express = require('express');
const router  = express.Router();
const validateAuth = require('../middleware/validate-auth');
const User = require('../models/user');
const ServiceProvider = User.ServiceProvider;

router.post('/getServiceProviders', (req, res, next) => {
  const category = req.body.category;
  console.log(category);
  ServiceProvider.find({ serviceCategories: category }).then((docs) => {
    console.log(docs);
  })
});

module.exports = router;