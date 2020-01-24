const express = require('express');
const router  = express.Router();
const multer = require('multer');
const validateAuth = require('../middleware/validate-auth');
const Review = require('../models/review');
const User = require('../models/user');
const ServiceProvider = User.ServiceProvider;

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
    cb(null, Date.now() + '-' + fileName + ext);
  }
});

router.post('/save',  multer({ storage: storage }).single('photo'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const reviewData = req.body;

  if(req.file) {
    reviewData.photo = url + '/images/' + req.file.filename;
  }
  
  const review = new Review(reviewData);

  review.save()
  .then(result => {
    ServiceProvider.findOne({ email: review.serviceProvider })
    .then(user => {
      if(!user) {
        return res.status(200).json({
          message: 'Internal Error'
        });
      }

      let rating = 0;
      
      Review.find({ serviceProvider: review.serviceProvider })
      .then((docs) => {
        docs.forEach(doc => {
          rating += parseInt(doc.starValue);
        });

        user.noOfReviews = (parseInt(user.noOfReviews) + 1).toString();
        user.avgRating = ((parseInt(review.starValue) + rating)/(parseInt(user.noOfReviews))).toString();
        user.save().then(result => {
          res.status(201).json({
            success: true,
            message: 'review creation successful'
          });
        });
      })
      .catch(error => {
        return res.status(500).json({
          message: 'Internal Server Error'
        });
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Internal Server Error'
      })
    });
  })
  .catch(error => {
    res.status(500).json({
      error: error
    });
  });
});

router.post('/getReviews', (req, res, next) => {
  const email = req.body.email;
  Review.find({ serviceProvider: email })
  .then((docs) => {
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

module.exports = router;