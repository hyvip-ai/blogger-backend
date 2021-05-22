'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const savedschema = Schema({
   innerhtml:String,
    createdat:String,
    username:String,
    creatorid:{type:mongoose.Schema.ObjectId,ref:'User'},
    blogid:{type:mongoose.Schema.ObjectId,ref:'User'}
})
module.exports = mongoose.model('Saveblog',savedschema)