const path = require('path');
const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');
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

    cb(error, 'images');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, Date.now() + '-' + fileName);
  }
});

router.post('/serviceProviderSignup', multer({ storage: storage })
  .fields([{ name: 'portfolio', maxCount: 4 }, { name: 'profilePhoto', maxCount: 1 }]), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const userData = req.body;
  const imagePathArray = [];
  
  bcrypt.hash(userData.password, 10).then((hash) => {
    userData.password = hash;

    req.files['portfolio'].forEach(file => {
      imagePathArray.push(url + '/images/' + file.filename);
    });
  
    userData.portfolio = imagePathArray;

    if(req.files['profilePhoto'].length === 1) {
      userData.profilePhoto = url + '/images/' + req.files['profilePhoto'][0].filename;
    }

    userData.userType = 'serviceProvider';

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
        return res.status(200).json({
          isUserValid: false,
          message: 'Service Provider with given email id does not exist'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(200).json({
          isUserValid: false,
          message: 'Username or Password is incorrect'
        });
      }

      const token = jwt.sign({
        email: fetchedUser.email,
        userId: fetchedUser._id
      }, UUID, { expiresIn: '15m' });

      fetchedUser.openingHours.forEach((oh, index) => {
        fetchedUser.openingHours[index] = JSON.parse(oh);
      });

      fetchedUser.services.forEach((service, index) => {
        fetchedUser.services[index] = JSON.parse(service);
      });

      res.status(200).json({
        authToken: token,
        userData: fetchedUser,
        expiresIn: 900
      });
    })
    .catch(error => {
      return res.status(401).json({
        isUserValid: false,
        message: 'User does not exist'
      });
    });
});

router.post('/autoAuth', (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const authorization = req.headers.authorization.split(' ')[1];
    let decoded;

    try {
      decoded = jwt.verify(authorization, UUID);
    } catch (e) {
      return res.status(401).json({
        message: 'User is not authorized'
      });
    }

    const userEmail = decoded.email;
    ServiceProvider.findOne({ email: userEmail })
    .then((serviceProvider) => {
      if(!serviceProvider) {
        Customer.findOne({ email: userEmail })
        .then((customer) => {
          return res.status(200).json({
            userData: customer,
            expiresIn: 900
          });
        })
      } else {
        serviceProvider.openingHours.forEach((oh, index) => {
          serviceProvider.openingHours[index] = JSON.parse(oh);
        });
  
        serviceProvider.services.forEach((service, index) => {
          serviceProvider.services[index] = JSON.parse(service);
        });
  
        return res.status(200).json({
          userData: serviceProvider,
          expiresIn: 900
        });
      }
      
    })
    .catch(error => {
      console.log(error);
      return res.status(401).json({
        isUserValid: false,
        message: 'User does not exist'
      });
    });
  }
});

router.post('/customerTokenAuth', (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const authorization = req.headers.authorization.split(' ')[1];
    let decoded;

    try {
      decoded = jwt.verify(authorization, UUID);
    } catch (e) {
      console.log(e);
      return res.status(401).json({
        message: 'User is not authorized'
      });
    }

    const userEmail = decoded.email;
    Customer.findOne({ email: userEmail }).then(function(user){
      return res.status(200).json({
        authToken: authorization,
        userData: user,
        expiresIn: 900
      })
    });
  }

  return res.status(401).json({
    message: 'User is not authorized'
  });
});

router.post('/customerSignup', multer({ storage: storage }).single('profilePhoto'), (req, res, next) => {
  const userData = req.body;
  bcrypt.hash(userData.password, 10).then((hash) => {
    userData.password = hash;

    const url = req.protocol + '://' + req.get('host');
    
    if(req.file) {
      userData.profilePhoto = url + '/images/' + req.file.filename;
    }

    userData.userType = 'customer';

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
        return res.status(200).json({
          isUserValid: false,
          message: 'User does not exist'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(200).json({
          isUserValid: false,
          message: 'Username or Password is incorrect'
        });
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

router.post('/updateProfile', multer({ storage: storage })
.fields([{ name: 'portfolio', maxCount: 4 }, { name: 'profilePhoto', maxCount: 1 }]), (req, res, next) => {
  const userData = req.body;
  let uType;

  if(req.body.userType === 'customer') {
    uType = Customer;
  } else {
    uType = ServiceProvider;
  }

  uType.findOne({ email: userData.email })
    .then(user => {
      if(!user) {
        return res.status(200).json({
          isUserValid: false,
          message: 'User does not exist'
        });
      }

      const url = req.protocol + '://' + req.get('host');
      
      user.firstName = userData.firstName;
      user.lastName = userData.lastName;
      user.email = userData.email;
      user.phone = userData.phone;

      if(req.files['profilePhoto'].length === 1) {
        userData.profilePhoto = url + '/images/' + req.files['profilePhoto'][0].filename;
      }

      const imagePathArray = [];

      if(userData.userType === 'serviceProvider') {
        req.files['portfolio'].forEach(file => {
          imagePathArray.push(url + '/images/' + file.filename);
        });
      
        userData.portfolio = imagePathArray;
    
        user.name = userData.name;
        user.address = userData.address;
        user.postalCode = userData.postalCode;
        user.serviceCategories = userData.serviceCategories;
        user.description = userData.description;
        user.tags = userData.tags;
        user.openingHours = userData.openingHours;
        user.portfolio = userData.portfolio;
        user.services = userData.services;
      } else {
        if(req.file) {
          user.profilePhoto = url + '/images/' + req.file.filename;
        }
      }
      
      if(userData.password !== '') {
        bcrypt.hash(userData.password, 10).then((hash) => {
          user.password = hash;
        });
      }

      user.save()
        .then(result => {
          res.status(201).json({
            message: 'Your account has been updated successfully!',
            isProfileUpdated: true
          });
        })
        .catch(error => {
          const errorObj = error.errors;
          let errorMessage = '';
          errorMessage = 'Internal server error. Please try after sometime';
          
          res.status(500).json({
            errorType: error.errors,
            message: errorMessage
          });
        });
    })
    .catch(error => {
      console.log(error);
      return res.status(401).json({
        isUserValid: false,
        message: 'User does not exist'
      });
    });
});

module.exports = router;