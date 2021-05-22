'use strict'

const express = require('express')

const api = express.Router()
const blog_controller = require('../controllers/blog')
const md_auth = require('../middlewares/authenticate')

api.post('/publish',md_auth.authenticate,blog_controller.publish);
api.get('/myblogs',md_auth.authenticate,blog_controller.myblogs)

api.get('/delete/:id',md_auth.authenticate,blog_controller.deleteblog)
api.get('/detail/:id',md_auth.authenticate,blog_controller.details)
api.get('/save/:id',md_auth.authenticate,blog_controller.saved)
api.get('/getsaved',md_auth.authenticate,blog_controller.getsaved)

api.get('/deletesaved/:id',md_auth.authenticate,blog_controller.deletesaved)


api.post('/edit/:id',md_auth.authenticate,blog_controller.editblog)

module.exports = api