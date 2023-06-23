const express = require('express')
const router = express.Router();
const User = require('../models/User')
const store = require("store2");
var nodemailer = require('nodemailer');
// var bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');
// const JWT_SECRET="ronakismyname";
let randomNum = Math.floor(Math.random() * 10).toString()+Math.floor(Math.random() * 10).toString()+Math.floor(Math.random() * 10).toString()+Math.floor(Math.random() * 10).toString();
router.post('/createuser', async (req, res) => {
    // console.log(req.body);
    const { email } = req.body;
    // var salt = bcrypt.genSaltSync(10);
    // const secPass=await bcrypt.hash(req.body.password,salt);
    // req.body.password=secPass;
    User.find({ email }).exec().then((users) => {
        if (users.length == 0) {
            const user = User(req.body);
            user.save();
            // const authToken=jwt.sign(user,JWT_SECRET);
            // console.log({authToken});
            // console.log(user);
            res.json(req.body);
        }
        else {
            console.log("User Already Exits");
        }
    })
        .catch((error) => {
            console.log("Some Error encountered");
        });
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.find({ email, password }).exec().then((users) => {
        res.json(users);
        store('email', email);
    })
        .catch((error) => {
            console.log("Some Error encountered");
        });
})

router.post('/resetPasswordEmail', (req, res) => {
    const { email } = req.body;
    User.find({ email }).exec().then((users) => {
        if (users.length != 0) {
            res.json("ok");
        }
        // store('email',email);
    })
        .catch((error) => {
            console.log("Some Error encountered");
        });
})

router.post('/OTPSend', (req, res) => {
    const { emailReciever } = req.body;
    const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
            user: 'ronakprivate@outlook.com',
            pass: 'ronaktest@2023'
        },
        tls:{
            rejectUnauthorized:false,
        }
    });
    const mailOptions = {
        from: 'ronakprivate@outlook.com',
        to: emailReciever,
        subject: 'Verification from Metro',
        text: 'OTP is '+randomNum
    };      
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log('Error occurred:', error.message);
        } else {
          console.log('Email sent successfully!');
          console.log('Message ID:', info.messageId);
        }
    });
})

module.exports = router;