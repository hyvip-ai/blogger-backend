const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user')
const jwt = require('../services/jwt')
function register(req,res){
    const params = req.body;
    var user = new User();
    // console.log('asche')
    if(params.name && params.username && params.email && params.password){
            
            user.name = params.name;
            user.username  = params.username
            User.find({email:params.email}).exec((err,users)=>{
                    if(err){
                        return res.send({messege:'Finding Error'})
                    }
                    if(users && users.length>=1){
                        return res.send({messege:'Same Credentials found try with different'})
                    }
                    else{
                        bcrypt.hash(params.password,null,null,(err,hash)=>{
                            if(err){
                                console.log({messege:'Error While Hash Making'})
                            }
                            user.password = hash
                            user.email  = params.email
                        })
                        user.save((err,saveduser)=>{
                            if(err){
                                return res.send({messege:'Error While Saving'})
                            }
                            return res.send({saved:saveduser,messege:"Register Success Redirecting to Login page"})
                        })

                    }
            })
    }
    else{
        return res.send({messege:'Invalid Data'})
    }
}

function login(req,res){
    const params = req.body

    if(params.password && params.email){
        var password = params.password;
        var email = params.email
        User.findOne({email:email}).exec((err,user)=>{
            if(err){
                return  res.send({messege:'finding error'})
            }
            if(user){
                bcrypt.compare(password,user.password,(err,result)=>{
                    if(err){
                        return  res.send({messege:"Password Comparining Error"})
                    }
                    if(result){
                        return  res.send({messege:'Login Success',
                                          token:jwt.createtoken(user),
                                            user:user})
                    }
                    else{
                        return  res.send({messege:'Password Incorrect'})
                    }
                })
            }
            else{
                return  res.send({messege:'Email not found'})
            }
        })
    }
    else{
        return  res.send({messege:'Invalid Data'})
    }
}

function getuser(req,res){
    var id = req.user.sub;
    User.findOne({_id:id}).exec((err,user)=>{
        if(err){
            return res.send({messege:"Finding Error"})
        }
        if(user){
            return res.send({user:user})
        }
    })
}

module.exports = {
    register,
    login,
    getuser
}