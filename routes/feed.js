'Use strict'

const express = require('express')
const api = express.Router();

const md_auth = require('../middlewares/authenticate')
const feed_controller = require('../controllers/feed')

api.get('/myfeed',md_auth.authenticate,feed_controller.myfeed)

// api.get('/others',md_auth.authenticate,feed_controller.all)


module.exports = api