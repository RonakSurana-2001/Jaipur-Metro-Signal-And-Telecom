const express = require('express')
const router = express.Router();
const User = require('../models/User')
const Attendence = require("../models/Attendence")
router.post('/markPresent', (req, res) => {
    const { email,locationN,InTime } = req.body;
    User.find({ email: email }).then((users) => {
        if (users.length !== 0) {
            Attendence.find({ email: email }).then((user) => {
                if (user.length == 0) {
                    const s1 = {
                        "name": users[0].name,
                        "email": users[0].email,
                        "locationN":locationN,
                        "InTime":InTime
                    };
                    const attendence = Attendence(s1);
                    attendence.save();
                    res.json(attendence);
                }
                else {
                    // console.log("Exits");
                }
            })
                .catch((error) => {
                    // console.log("error");
                })
        }
        else {
            // console.log("Invalid Login");
        }
    })
        .catch((error) => {
            // console.log("error 1");
        })
})
router.post('/getAttendence', (req, res) => {
    Attendence.find({}).then((users) => {
        res.json(users);
    })
        .catch((error) => {
            // console.log("error");
        })
})

router.get('/clearAttendence', (req, res) => {
    Attendence.deleteMany({}).then((users) => {
    })
        .catch((error) => {
            // console.log("error");
        })
})
module.exports = router;