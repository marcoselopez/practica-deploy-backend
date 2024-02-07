const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const addUser = async (request, response) => {  
  try {
    const { firstName, lastName, email, password, role, refreshToken } = request.body;
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      role,
      refreshToken
    })
  
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
  
    newUser.password = hash;
  
    await newUser.save()
    response.status(200).json({ message: 'Usuario creado correctamente' })
  } catch (error) {
    response.status(400).json(error)
  }
};

const getAllUsers = async (request, response) => {
  try {
    const users = await User.find({})
    response.status(200).json(users)
  } catch (error) {
    response.status(400).json({ message: 'No se pudieron encontrar usuarios' })
  }
}

module.exports = { addUser, getAllUsers };