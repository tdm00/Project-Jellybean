// const { Given, When, Then } = require('cucumber');
const { Given, When, Then } = require('@cucumber/cucumber');
const request = require('supertest');
const app = require('../../app'); // Adjust the path to your Express app
const assert = require('assert');

let response;

Given('I am a new user', function () {
  this.user = {
    username: 'testuser',
    password: 'testpassword'
  };
});

When('I register with a username and password', async function () {
  response = await request(app)
    .post('/users/register')
    .send(this.user);
});

Then('I should see a success message', function () {
  assert.strictEqual(response.status, 201);
  assert.strictEqual(response.body.message, 'User registered successfully');
});

Given('I am a registered user', async function () {
  this.user = {
    username: 'testuser',
    password: 'testpassword'
  };
  await request(app)
    .post('/users/register')
    .send(this.user);
});

When('I log in with my username and password', async function () {
  response = await request(app)
    .post('/users/login')
    .send(this.user);
});

Then('I should receive a token', function () {
  assert.strictEqual(response.status, 200);
  assert.ok(response.body.token);
});