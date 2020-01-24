const express = require('express');
const router  = express.Router();
const validateAuth = require('../middleware/validate-auth');
const User = require('../models/user');
const ServiceProvider = User.ServiceProvider;

router.post('/getServiceProviders', (req, res, next) => {
  const category = req.body.category;
  ServiceProvider.find({ serviceCategories: category })
  .then((docs) => {
    docs.forEach(doc => {
      doc.openingHours.forEach((oh, index) => {
        doc.openingHours[index] = JSON.parse(oh);
      });

      doc.services.forEach((service, index) => {
        doc.services[index] = JSON.parse(service);
      });
    });

    return res.status(200).json({
      data: docs
    });
  })
  .catch(error => {
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  });
});

router.post('/getServiceProviderById', (req, res, next) => {
  ServiceProvider.find({ _id: req.body.id })
  .then((doc) => {
    doc = doc[0];
    doc.openingHours.forEach((oh, index) => {
      doc.openingHours[index] = JSON.parse(oh);
    });

    doc.services.forEach((service, index) => {
      doc.services[index] = JSON.parse(service);
    });

    return res.status(200).json({
      data: doc
    });
  })
  .catch(error => {
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  });
});

module.exports = router;