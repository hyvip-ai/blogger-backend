const mongoose = require('mongoose')
const Schema = mongoose.Schema
const blogschema = Schema({
   innerhtml:String,
    createdat:String,
    username:String,
    creatorid:{type:mongoose.Schema.ObjectId,ref:'User'}
})

module.exports = mongoose.model('Blog',blogschema)