const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')


router.get('/log',requireLogin,(req, res) => {
    //TODO
    // get all the log, return them 
})


router.get('/notification',requireLogin,(req, res) => {
    //TODO
    // get all the noti, return them
})

router.post('/notification', requireLogin,(req, res) => {
    // TODO 
    // set all new in noti to false 

    
})

module.exports=router