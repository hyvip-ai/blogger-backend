'use strict'

const jwt = require('jwt-simple')

const secert = 'My_Secret_1-5-2-36-8'

function authenticate(req,res,next){
    var token = req.headers.auth
    // console.log(token)
    var payload = jwt.decode(token,secert)
    req.user = payload
    // console.log(req.user)

    next();
}

module.exports = {
    authenticate
}