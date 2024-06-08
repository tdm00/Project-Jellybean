const { Given, When, Then } = require('@cucumber/cucumber');
const request = require('supertest');
const app = require('../../app'); // Adjust the path to your Express app
const jwt = require('jsonwebtoken');
const assert = require('assert');

let response;

Given('I have a valid token', function () {
  this.token = jwt.sign({ id: 'testuser' }, 'your_secret_key', { expiresIn: '1h' });
});

Given('I do not have a token', function () {
  this.token = null;
});

Given('I have an invalid token', function () {
  this.token = 'invalid_token';
});

When('I access the protected route', async function () {
  response = await request(app)
    .get('/protected')
    .set('Authorization', this.token ? `Bearer ${this.token}` : '');
});

Then('I should see the decoded token', function () {
  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.body.id, 'testuser');
});

Then('I should see an error message', function () {
  assert.strictEqual(response.status, this.token ? 500 : 403);
  assert.ok(response.body.message);
});
