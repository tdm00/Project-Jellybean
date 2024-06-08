var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const users = []; // This is a mock database for simplicity

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// User registration endpoint
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  users.push({ username, password: hashedPassword });
  res.status(201).send({ message: 'User registered successfully' });
});

// User login endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).send({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ username: user.username, access: "lobby pool room_123" }, config.secretKey, { expiresIn: '1h' });
  res.send({ token });
});

module.exports = router;
