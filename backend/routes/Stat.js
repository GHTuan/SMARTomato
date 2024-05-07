const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const Factor = mongoose.model('Factor')
const User = mongoose.model('User')
const Notification = mongoose.model("Notification")
const Stat = mongoose.model("Stat")



router.get('/stat',requireLogin,(req, res) => {
    //TODO
    // Get all the stat, by there factor return them
    // factor by Userid 
    // for each factor get there stat by Factorid
    // save the stat in a array (there will be 4 array)
    // return all the array of stat  res.json({soil:array,  }) 
    
})


router.get('/systemmode',requireLogin,(req, res) => {
    //TODO
    
    

})

router.post('/systemmode',requireLogin,(req, res) => {
    //TODO
    //Auto => all factor => auto
    
})


module.exports=router