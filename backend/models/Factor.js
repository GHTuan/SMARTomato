const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const factorSchema = new mongoose.Schema({
    userID: {
        type: ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    curmode: {
        type: String,
        required: true,
        default: "off"
    },
    lowbound: {
        type: Number,
        required: true
    },
    upbound: {
        type: Number,
        required: true
    },
})

mongoose.model("Factor",factorSchema)