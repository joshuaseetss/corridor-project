const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const userRoutes = require('./routes/user');

//TODO Custom Error Handling
mongoose.connect('mongodb+srv://ronnie:rOCEysdfCFfi1sDm@cluster0-1fixu.mongodb.net/test')
  .then(() => {
    console.log('DB connected');
  })
  .catch(() => {
    console.log('Error connecting db');
  });

app.use(bodyParser.json());
app.use(helmet);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/user', userRoutes);
module.exports = app;
