const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const statSchema = new mongoose.Schema({
    dtime: {
        type: Date,
        required: true
    },

    factorID: {
        type: ObjectId,
        required: true
    },

    value: {
        type: Number,
        required: true
    },
    
    unit: {
        type: String,
        required: true
    },    
})

mongoose.model("Stat",statSchema)