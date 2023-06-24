const express = require('express')
const router = express.Router();
const User = require('../models/User')
const store = require("store2");
var nodemailer = require('nodemailer');
const checkOTP = [];
router.post('/createuser', async (req, res) => {
    const { email } = req.body;
    User.find({ email }).exec().then((users) => {
        if (users.length == 0) {
            const user = User(req.body);
            user.save();
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
    })
        .catch((error) => {
            console.log("Some Error encountered");
        });
})

function makeOtp(mailVal) {
    checkOTP.push([mailVal, Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString()])
}

router.post('/OTPSend', (req, res) => {
    const { emailReciever } = req.body;
    makeOtp(emailReciever);
    let devOtp = 0;
    checkOTP.map((ta) => {
        if (ta[0] === emailReciever) {
            devOtp = ta[1];
        }
    })
    // console.log(checkOTP);
    const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
            user: 'xxxxx@outlook.com',
            pass: 'xxxxx'
        },
        tls: {
            rejectUnauthorized: false,
        }
    });
    const mailOptions = {
        from: 'xxxxx@outlook.com',
        to: emailReciever,
        subject: 'Verification from Metro',
        text: 'OTP is ' + devOtp
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error occurred:', error.message);
        } else {
            console.log('Email sent successfully!');
            console.log('Message ID:', info.messageId);
        }
    });
})

router.post('/verifyOTP', (req, res) => {
    const { OTP, emailReciever } = req.body;
    let flag = 0;
    checkOTP.map((ta) => {
        if (ta[0] === emailReciever && ta[1] === OTP) {
            res.json("ok")
            flag = 1;
        }
    })
    if (flag === 0) {
        res.json("Wrong");
    }
})

router.post('/updatePassword', (req, res) => {
    const { email, updatedpasswordN, OTP } = req.body;
    // console.log(checkOTP);
    let flag=0;
    checkOTP.map((ta) => {
        if (email === ta[0] && OTP === ta[1]) {
            User.findOneAndUpdate({ email },{password:updatedpasswordN}).exec().then((users) => {
                if (users.length != 0) {
                    flag=1;
                    res.json("ok");
                }
                // store('email',email);
            })
                .catch((error) => {
                    console.log("Some Error encountered");
                });
        }
    })
    if(flag===1)
    {
        res.json("nn");
    }
})

module.exports = router;