'use strict'

const express = require('express')
const default_controller = require('../controllers/default')
const api = express.Router()

api.get('/status',default_controller.status)

module.exports = api

