'use strict'

const express = require('express')
const api = express.Router()
const user_controller = require('../controllers/user')

const md_auth = require('../middlewares/authenticate')

api.post('/register',user_controller.register);

api.post('/login',user_controller.login);

api.get('/getuser',md_auth.authenticate,user_controller.getuser)

module.exports = api