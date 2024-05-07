const express = require('express')
const router = express.Router()
const itemRouter = express.Router({mergeParams: true});
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const humidFactor = require('../middleware/humidFactor')
const tempFactor = require('../middleware/tempFactor')
const soilFactor = require('../middleware/soilFactor')
const lightFactor = require('../middleware/lightFactor')
const Factor = mongoose.model('Factor')
const Device = mongoose.model('Device')

const {refreshDevice,toggleDevice} = require('../internal/dataFlow')

router.get('/hello',requireLogin, (req,res) => {
    return res.json({message: "Hello"})
})
// Getting factor for each middle route
router.use('/humid',requireLogin, humidFactor, itemRouter);
router.use('/temp',requireLogin, tempFactor, itemRouter);
router.use('/soil',requireLogin, soilFactor, itemRouter);
router.use('/light',requireLogin, lightFactor, itemRouter);

itemRouter.put('/mode', async (req, res) => {
    const {reqdevice} = req.body
    if (!reqdevice){
        return res.status(404).json({error: "Device not found"})
    }
    var device = await Device.findOne({userID: req.user._id, name: reqdevice})
    if (!device){
        //Create new device
        const newDevice = await new Device({
            userID:req.user._id,
            name:reqdevice,
            state:false,
        })
        newDevice.save()
        device = newDevice
    }

    return res.json({mode: req.factor.curmode, state: device.state})
})


itemRouter.post('/mode', (req, res) => {
    const {mode, reqdevice, state} = req.body
    //
    if (mode == 'Auto') { 
        if (req.factor.curmode == 'Auto'){
            //same auto settings
            return res.status(200).json({message: "The same settings"})
        } else {
            //change from manual to auto
            Factor.findByIdAndUpdate(req.factor._id,{
                curmode: mode
            })
            .then(()=>{
                return res.status(200).json({message:"Change manual to auto"})
            })
            
        }
    }
    if (mode == "Manual"){
        var status
        if (state){
            status = 1
        } else {
            status = 0
        }
        if (req.factor.curmode == "Manual"){
            //same manual settings
                // console.log(req.factor.devicestt)
                // console.log(devicestt)
            
            if (toggleDevice(req.user._id,reqdevice, status,"User")){
                return res.status(200).json({message:"Change manual to manual with " + status})
            } else {
                return res.status(200).json({message:"The same setting"})
            }
        } else {
            //change from auto to manual with devicestt
            Factor.findByIdAndUpdate(req.factor._id,{
                curmode: mode,
            })
            .then(()=>{
                
                if (toggleDevice(req.user._id, reqdevice, status,"User")){
                    return res.status(200).json({message:"Change auto to manual with " + status})
                } else {
                    return res.status(200).json({message:"The same setting"})
                }
            })
        }
    }
    // More log needed for switching modes
    // TODO
})


itemRouter.get('/current', async (req, res) => {
    // Stat.findById(req.factor._id, {} ,{ sort: { 'created_at' : 1 } })
    // .then((stat) => {
    //     console.log(stat);
    //     return res.status(200).json({value: stat.value})
    // })
    // it right tho :))
    const data = await refreshDevice(req.factor._id)
    
    if (!data){
        return res.status(500).json({error: "Internal Server Error"})
    }

    res.status(200).json({value:data})

})

itemRouter.post('/refresh', async (req, res) => {
    const data = await refreshDevice(req.factor._id)
    
    if (!data){
        return res.status(500).json({error: "Internal Server Error"})
    }
    res.json({data:data})
})


itemRouter.get('/threshold', (req, res) => {
    return res.json({lowerbound: req.factor.lowbound, upperbound: req.factor.upbound})
})

itemRouter.post('/threshold', (req, res) => {
    const {upperbound,lowerbound} = req.body

    if (!upperbound || !lowerbound || isNaN(upperbound) || isNaN(lowerbound)){
        return res.status(400).json({error: "Invalid parameters"})
    }

    if (upperbound < lowerbound){
        return res.status(400).json({error: "Upperbound must be greater than Lowerbound"})
    }
    Factor.findByIdAndUpdate(req.factor._id,{
        lowbound: lowerbound,
        upbound: upperbound,
    })
   .then(()=>{
        return res.status(200).json({message: "Threshold updated"})
   })

})






module.exports=router