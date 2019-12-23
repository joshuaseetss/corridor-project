const jwt = require('jsonwebtoken');
const UUID = '940926a6-fb69-47aa-ba84-92292e96885c';

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, UUID);
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Authorization failed.'
    })
  }
  
};