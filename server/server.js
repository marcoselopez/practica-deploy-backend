require('dotenv').config();
require('../database/database');
const express = require('express');
const app = express();
const credentials = require('../middleware/credentials');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { corsOptions } = require('../config/corsOptions');
const addUser = require('../router/userRoutes');
const loginUser = require('../router/authRoutes');
const refreshToken = require('../router/refreshRoute');
const getAllUsers = require('../router/userRoutes');
const handleLogout = require('../router/logoutRoute');

// MIDDLEWARE PARA PARSEAR JSONS
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())



// RUTAS
app.use('/', addUser)
app.use('/', loginUser)
app.use('/', refreshToken)
app.use('/', getAllUsers)
app.use('/', handleLogout)

// INICIALIZAMOS EL METODO LISTEN SOBRE EL PUERTO
app.listen(process.env.PORT, () => {
  console.log(`Escuchando en el puerto ${process.env.PORT}`)
})