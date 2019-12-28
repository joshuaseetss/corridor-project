const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UUID = '940926a6-fb69-47aa-ba84-92292e96885c';
const multer = require('multer');
const User = require('../models/user');
const ServiceProvider = User.ServiceProvider;
const Customer = User.Customer;

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    
    if(isValid) {
      error = null;
    }

    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, fileName + '-' + Date.now() + '.' + ext);
  }
});

router.post('/serviceProviderSignup', multer({ storage: storage }).array('portfolio', 4), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const userData = req.body;
  const imagePathArray = [];

  req.files.forEach(file => {
    imagePathArray.push(url + '/images/' + file.filename);
  });

  userData.portfolio = imagePathArray;
  bcrypt.hash(userData.password, 10).then((hash) => {
    userData.password = hash;
    const user = new ServiceProvider(userData);

    user.save()
      .then(result => {
        res.status(201).json({
          success: true,
          message: 'user creation successful'
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
  let fetchedUser;
  ServiceProvider.findOne({ email: req.body.email })
    .then(user => {
      if(!user) {
        return res.status(401).json({
          isUserValid: false,
          message: 'User does not exist'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          isUserValid: false,
          message: 'User does not exist'
        })
      }

      const token = jwt.sign({
        email: fetchedUser.email,
        userId: fetchedUser._id
      }, UUID, { expiresIn: '15m' });

      res.status(200).json({
        authToken: token,
        userData: fetchedUser,
        expiresIn: 900
      })
    })
    .catch(error => {
      return res.status(401).json({
        isUserValid: false,
        message: 'User does not exist'
      });
    });
});

router.post('/customerSignup', (req, res, next) => {
  const userData = req.body;
  bcrypt.hash(userData.password, 10).then((hash) => {
    userData.password = hash;
    const user = new Customer(userData);

    user.save()
      .then(result => {
        res.status(201).json({
          message: 'Your account has been created successfully!',
          hasUserCreated: true
        });
      })
      .catch(error => {
        const errorObj = error.errors;
        let errorMessage = '';
        if(errorObj.email && errorObj.email.properties.type === 'unique') {
          errorMessage = 'This email id is already registered.';
        } else {
          errorMessage = 'Internal server error. Please try after sometime';
        }
        res.status(500).json({
          errorType: error.errors,
          message: errorMessage
        });
      });
  });
});

router.post('/customerLogin', (req, res, next) => {
  let fetchedUser;
  Customer.findOne({ email: req.body.email })
    .then(user => {
      if(!user) {
        return res.status(401).json({
          isUserValid: false,
          message: 'User does not exist'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          isUserValid: false,
          message: 'User does not exist'
        })
      }

      const token = jwt.sign({
        email: fetchedUser.email,
        userId: fetchedUser._id
      }, UUID, { expiresIn: '15m' });

      res.status(200).json({
        authToken: token,
        expiresIn: 900
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