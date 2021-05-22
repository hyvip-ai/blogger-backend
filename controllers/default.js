'use strict'

function status(req,res){
    res.send({name:'My Blogging',
                status:'Running',
                version:'1.0.0',
                unique:'kichu unique nei bhai'})
}

module.exports={
    status
}