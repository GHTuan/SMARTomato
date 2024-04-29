const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const deviceSchema = new mongoose.Schema({
    userID: {
        type: ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
})

mongoose.model("Device",deviceSchema)