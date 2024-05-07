const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const actLogSchema = new mongoose.Schema({
    userID: {
        type: ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    dtime: {
        type: Date,
        default: Date.now
    }
})

mongoose.model("ActivityLog",actLogSchema)