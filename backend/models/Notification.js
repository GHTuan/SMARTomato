const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const notifySchema = new mongoose.Schema({
    userID:{
        type:ObjectId,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    dtime:{
        type:Date,
        default:Date.now
    },
    new:{
        type:Boolean,
        default:true
    },
    device:{
        type:String,
        required:true
    }
})

mongoose.model("Notification",notifySchema)