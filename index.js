const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const default_routes = require('./routes/default')
const user_routes = require('./routes/user')
const blog_Routes = require('./routes/blog')
const feed_routes = require('./routes/feed')
const mongoDB = 'mongodb://localhost:27017/blogging'
const mongoose = require('mongoose')
mongoose.connect(mongoDB , { useNewUrlParser : true, useUnifiedTopology : true})
.then(()=>{
    app.listen(3000,()=>{
      console.log('> Connected...');
      console.log('> Write Some Code Moron....');
    })
})
.catch(err=>console.log(`> Error while connecting to mongoDB : ${err}` ))


app.use('/',default_routes)
app.use('/api',user_routes)
app.use('/api',blog_Routes)
app.use('/api',feed_routes)