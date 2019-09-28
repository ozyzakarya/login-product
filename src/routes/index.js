const express = require('express');
const register = require('./register');
const login = require('./login');
const product = require('./product');


const v1 = express.Router();

v1.use('/v1', register);
v1.use('/v1', login);
v1.use('/v1', product);

module.exports = v1;