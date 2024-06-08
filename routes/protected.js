const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).send({ message: 'No token provided' });
    }
    jwt.verify(token.split(' ')[1], config.secretKey, (err, decoded) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.json(decoded);
    });
  
});

module.exports = router;
