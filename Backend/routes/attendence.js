const express = require('express')
const router = express.Router();
const User = require('../models/User')
const Attendence = require("../models/Attendence")
const jwt = require('jsonwebtoken');
const {secretKey}=require('../.env')

const {validateToken}=require('../middleware/generateToken')

router.post('/markPresent',validateToken, (req, res) => {
    const validToken=jwt.verify(req.body.token,secretKey)
    const { locationN,InTime } = req.body;
    User.find({ email: validToken.email }).then((users) => {
        if (users.length !== 0) {
            Attendence.find({ email: validToken.email }).then((user) => {
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


router.post('/getAttendence',validateToken, (req, res) => {
    Attendence.find({}).then((users) => {
        // console.log(users)
        res.json(users);
    })
        .catch((error) => {
            // console.log("error");
        })
})

router.post('/clearAttendence', validateToken, (req, res) => {
    Attendence.deleteMany({}).then((users) => {
    })
        .catch((error) => {
            // console.log("error");
        })
})
module.exports = router;