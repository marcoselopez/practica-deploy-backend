const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (request, response) => {
  try {
    const cookies = request.cookies;
    if(!cookies?.refreshToken) return response.status(401).json({ message: 'Not authorized' });

    const refreshToken = cookies.refreshToken;

    const user = await User.findOne({ refreshToken })
    if(!user) return response.status(403).json({ message: 'Forbidden' })

    // Verificamos el refresh Token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decoded) => {
        if(error || user.email !== decoded.email) return response.status(403).json({ message: 'Forbidden' })
        const accessToken = jwt.sign({
          email: decoded.email,
          firstName: decoded.firstName, 
          lastName: decoded.lastName, 
          role: decoded.role 
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
        response.json({ accessToken })
      }
    )
  } catch (error) {
    response.status(500).json(error)
  }
};

module.exports = { handleRefreshToken };