const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const ActivityLog = mongoose.model('ActivityLog')
const Notification = mongoose.model('Notification')

router.get('/log', requireLogin, async (req, res) => {
    try {
        const logs = await ActivityLog.find({ userID: req.user._id });
        const extractedLogs = logs.map(log => ({
            content: log.content,
            dtime: log.dtime.toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })
        }));
        res.status(200).json(extractedLogs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});



router.get('/notification',requireLogin, async(req, res) => {
    try {
        const notifications = await Notification.find({ userID: req.user._id });
        const extractedNotifications = notifications.map(noti => ({
            title: noti.title,
            content: noti.content,
            dtime: noti.dtime.toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }),
            new: noti.new,
            device: noti.device
        }));
        res.status(200).json(extractedNotifications); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.post('/notification', requireLogin, (req, res) => {
    Notification.updateMany({userID: req.user._id}, { $set: { new: false } })
        .then(() => {
            res.status(200).json({ message: "Notifications updated successfully" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        });
});


module.exports=router