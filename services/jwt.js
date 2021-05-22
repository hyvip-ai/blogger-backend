'use strict'
const jwt = require('jwt-simple')
const secert = 'My_Secret_1-5-2-36-8'
function createtoken(user){
    var payload = {
        sub : user._id,
        name:user.name,
        username:user.username,
        email:user.email
    }
    var token = jwt.encode(payload,secert)
    return token
}

module.exports = {
    createtoken
}