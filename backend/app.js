const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const userRoutes = require('./routes/user');

//TODO Custom Error Handling
mongoose.connect('mongodb+srv://ronnie:DrbsFH31OXYWB6L8@cluster0-1fixu.mongodb.net/test', { useNewUrlParser: true })
  .then((e) => {
    console.log('DB Connected!');
  })
  .catch((e) => {
    console.log('Error in connecting DB');
  });

app.use(bodyParser.json());
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api/user', userRoutes);

module.exports = app;
