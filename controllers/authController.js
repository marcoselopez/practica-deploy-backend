const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;
    
    const user = await User.findOne({ email })
    if(!user) return response.status(400).json({ message: 'Usuario no existente' })  

    const isMatch = bcrypt.compareSync(password, user.password);
    if(!isMatch) return response.status(400).json({ message: 'Password inválido' });

    const accessToken = jwt.sign({
      email: user.email,
      firstName: user.firstName, 
      lastName: user.lastName, 
      role: user.role 
    }, 
    process.env.ACCESS_TOKEN_SECRET, 
    {
      expiresIn: '30s'
    })

    const refreshToken = jwt.sign(
      {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '1d'
      }
    )

    // Guardado del refreshToken en el usuario
    user.refreshToken = refreshToken;
    await user.save()

    response.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 }) 
    response.status(200).json({ accessToken })
  } catch (error) {
    response.status(500).json({ message: error })
  }
}

module.exports = { loginUser };
