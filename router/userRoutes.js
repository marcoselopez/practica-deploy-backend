const { Router } = require('express');
const route = Router();
const { addUser, getAllUsers } = require('../controllers/userController');
const { verifyToken } = require('../middleware/tokenValidation')

route.post('/users', addUser)
route.get('/users', verifyToken, getAllUsers)

module.exports = route;