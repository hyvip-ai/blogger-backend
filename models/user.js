
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userschema  = Schema({
    name:String,
    username:String,
    email:String,
    password:String
})

module.exports = mongoose.model('User',userschema)