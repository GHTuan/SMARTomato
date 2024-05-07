const express = require('express')
const app=express()
const mongoose =require('mongoose')
const PORT =4000
const {MONGOURI}=require("./Key")



mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo")
})
mongoose.connection.on('error',(err)=>{
    console.log("error connecting",err)
})

require('./models/User')
require('./models/Factor')
require('./models/Stat')
require('./models/ActivityLog')
require('./models/Notification')
require('./models/Device')


require('./internal/dataLoop')

app.use(express.json())
app.use(require('./routes/Auth'))
app.use(require('./routes/Device'))
app.use(require('./routes/Stat'))
app.use(require('./routes/LogAndNoti'))
app.use(require('./routes/User'))



if(process.env.Node_ENV=='production'){

    const path =require('path')

    app.get('/',(req,res)=>{

    app.use(express.static(path.resolve(__dirname,"client","build")))
     res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
}

app.listen(PORT,()=>{
    console.log("Server is running on",PORT);
})