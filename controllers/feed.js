
const Blog = require('../models/blog')
function myfeed(req,res){
    var myid = req.user.sub
    Blog.find({_id:myid}).exec((err,allblogs)=>{
        if(err){
            return res.send({messege:'Finding Error'})
        }
        if(allblogs){
            return res.send({blogs:allblogs})
        }
    })
}


module.exports = {
    myfeed
}