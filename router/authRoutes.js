const { Router } = require('express');
const route = Router();
const { loginUser } = require('../controllers/authController');

route.post('/login', loginUser)

module.exports = route;