const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const ActivityLog = mongoose.model('ActivityLog');
const Notification=mongoose.model("Notification")


router.get('/log', requireLogin, async (req, res) => {
    try {
        const logs = await ActivityLog.find().sort({ dtime: -1 });
        res.json(logs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get('/notification',requireLogin, async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ dtime: -1 }).exec();
        res.json(notifications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
router.post('/notification', requireLogin, async(req, res) => {
    // set all new in noti to false 
    try {
        const notifications = await Notification.updateMany({}, { $set: { new: false } });
        res.status(200).json({ message: "All notifications marked as read." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports=router