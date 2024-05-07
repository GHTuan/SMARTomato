const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const User = mongoose.model("User")



router.get('/user/:id',requireLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
    .then(user=>{
        res.json({user})
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})

router.post('/user/:id',requireLogin,(req,res)=>{
    const {username,pass} = req.body
    //TODO
    // Update User 
    // Return the new userdata


})

module.exports=router