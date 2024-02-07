const jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyToken = (request, response, next) => {
  let token = request.header('Authorization')

  if(token.startsWith('Bearer ')){
    token = token.slice(7, token.length).trimLeft();
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if(error){
      return response.status(400).json(error)
    }

    next()
  })
}

module.exports = {verifyToken}