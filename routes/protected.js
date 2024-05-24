const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

/* GET home page. */
router.get('/', function(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).send({ message: 'No token provided' });
    }
    jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
      if (err) {
        return res.status(500).send({ message: 'Failed to authenticate token' });
      }
      res.send({ message: `Hello ${decoded.username}` });
    });
  
});

module.exports = router;
