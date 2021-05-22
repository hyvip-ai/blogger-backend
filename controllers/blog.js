const moment = require('moment')
const Blog = require('../models/blog')
const Saveblog = require('../models/saved')
function publish(req,res){
    const params = req.body
    if(params.myhtml){
        var blog = new Blog();
       blog.innerhtml = params.myhtml
        blog.createdat = moment().utc().format('LL')
        blog.username = req.user.username;
        blog.creatorid = req.user.sub
        blog.save((err,saved)=>{
            if(err){
                return res.send({messege:'Saving Error'})
            }
            return res.send({messege:'Published Blog',
            blog:saved})
        })
    }   
    else{
        return res.send({messege:'Invalid data'})
    }
}


function deleteblog(req,res){
    var blogid = req.params.id;
    Blog.findOneAndDelete({_id:blogid},(err,done)=>{
        if(err){
            return res.send({messege:'Error While Deleting'})
        }
       if(done){
        return res.send({messege:'Blog Deleted'})
       }
    })
}

function myblogs(req,res){
    var myid = req.user.sub

    Blog.find({creatorid:myid}).exec((err,publishses)=>{
        if(err){
            return res.send({messege:'Finding Error'})
        }
        if(publishses){
            return res.send({publish:publishses})
        }
    })
}

function details(req,res){
    var id = req.params.id

    Blog.findOne({_id:id}).exec((err,blog)=>{
        if(err){
            return res.send({messege:'Finding Error'})
        }
        if(blog){
            return res.send({blog:blog})
        }
    })

}

function saved(req,res){
    var myid = req.params.id
  var saveblog = new Saveblog()
    Blog.findOne({_id:myid}).exec((err,myblog)=>{
        if(err){
            return res.send({messege:'Not Found'})
        }
        if(myblog){
            saveblog.innerhtml = myblog.innerhtml
            saveblog.createdat = myblog.createdat
            saveblog.username = myblog.username
            saveblog.creatorid = myblog.creatorid
            saveblog.blogid = myblog._id
            saveblog.save((err,saved)=>{
                if(err){
                    return res.send({messege:'saving Error'})
                }
                if(saved){
                    return res.send({messege:"Saved"})
                }
            })
        }
    })
  
}

function getsaved(req,res){
    Saveblog.find({}).exec((err,blogs)=>{
        if(err){
            return res.send({messege:'Finding Error'});
        }
        if(blogs){
            return res.send({blogs:blogs});
        }
    })
}
function deletesaved(req,res){
    var id = req.params.id;
    Saveblog.findOneAndDelete({_id:id}).exec((err,deleted)=>{
        if(err){
            res.send({messege:'Not Deleted'})
        }
        if(deleted){
            res.send({messege:"Deleted Saved Item"})
        }
    })
}

function editblog(req,res){
    var myid = req.params.id


    if(req.body.myhtml){
        Blog.findOneAndUpdate({_id:myid},{$set:{innerhtml:req.body.myhtml}}).exec((err,succ)=>{
            if(err){
                return res.send({messege:'Not Send'})
            }
            if(succ){
                return res.send({messege:'Success updated'})
            }
        })
}
}
module.exports = {
    publish,
    deleteblog,
   editblog,
    myblogs,
    details,
    saved,
    getsaved,
    deletesaved
}