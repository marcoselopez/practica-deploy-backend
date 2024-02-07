const { Router } = require('express');
const route = Router();
const { handleRefreshToken } = require('../controllers/refreshTokenController');


route.get('/refresh', handleRefreshToken)

module.exports = route;