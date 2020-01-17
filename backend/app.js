const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const userRoutes = require('./routes/user');
const serviceProviderRoutes = require('./routes/serviceProvider');
const reviewRoutes = require('./routes/review');

//TODO Custom Error Handling
mongoose.connect('mongodb+srv://corri2019:corri2019@corri-fe9in.mongodb.net/test', { useNewUrlParser: true })
  .then((e) => {
    console.log('DB Connected!');
  })
  .catch((e) => {
    console.log('Error in connecting DB');
  });

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/', express.static(path.join(__dirname, 'angular')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api/user', userRoutes);
app.use('/api/serviceProvider', serviceProviderRoutes);
app.use('/api/review', reviewRoutes);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'));
});

module.exports = app;
