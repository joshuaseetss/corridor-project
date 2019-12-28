const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const userRoutes = require('./routes/user');
const serviceProviderRoutes = require('./routes/serviceProvider');

//TODO Custom Error Handling
<<<<<<< HEAD
mongoose.connect('mongodb+srv://ronnie:OiAPk1RRefE8UmjT@cluster0-1fixu.mongodb.net/test')
  .then(() => {
    console.log('DB connected');
=======
mongoose.connect('mongodb+srv://ronnie:DrbsFH31OXYWB6L8@cluster0-1fixu.mongodb.net/test', { useNewUrlParser: true })
  .then((e) => {
    console.log('DB Connected!');
>>>>>>> a0e2ac526386edcc609d0499203a0c8891edc6f9
  })
  .catch((e) => {
    console.log('Error in connecting DB');
  });

app.use(bodyParser.json());
<<<<<<< HEAD
app.use(helmet());

=======
>>>>>>> a0e2ac526386edcc609d0499203a0c8891edc6f9
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api/user', userRoutes);
app.use('/api/serviceProvider', serviceProviderRoutes);

module.exports = app;
