const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UUID = '940926a6-fb69-47aa-ba84-92292e96885c';

const User = require('../models/user');
const ServiceProvider = User.ServiceProvider;

router.post('/serviceProviderSignup', (req, res, next) => {
  bcrypt.hash(userData.password, 10).then((hash) => {
    req.body.userData.password = hash;
    const user = new ServiceProvider(req.body.userData);

    user.save()
      .then(result => {
        res.status(201).json({
          message: 'user creation successful',
          result: result
        });
      })
      .catch(error => {
        res.status(500).json({
          error: error
        });
      });
  });
});

router.post('/serviceProviderLogin', (req, res, next) => {
  ServiceProvider.findOne({ email: req.body.userData.email })
    .then(user => {
      if(!user) {
        return res.status(401).json({
          isUserValid: false,
          message: 'User does not exist'
        });
      }
      return bcrypt.compare(req.body.userData.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          isUserValid: false,
          message: 'User does not exist'
        })
      }

      const token = jwt.sign({
        email: user.email,
        userId: user._id
      }, UUID, { expiresIn: '1h' });

      res.status(200).json({
        authToken: token
      })
    })
    .catch(error => {
      return res.status(401).json({
        isUserValid: false,
        message: 'User does not exist'
      });
    });
});

module.exports = router;