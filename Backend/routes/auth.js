const express = require('express')
const router = express.Router();
const User = require('../models/User')
const store = require("store2");
var bcrypt = require('bcryptjs');
const {secretKey}=require('../.env')

const jwt = require('jsonwebtoken');

var { genToken, validateToken } = require('../middleware/generateToken')


var nodemailer = require('nodemailer');
const checkOTP = [];
router.post('/createuser', async (req, res) => {
    const { email } = req.body;
    User.find({ email }).exec().then((users) => {
        if (users.length == 0) {
            const genPassword = async () => {
                const passwordGen = req.body.password
                const hashedPassword = await bcrypt.hash(passwordGen, 8)
                const value = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword
                }
                const user = User(value);
                user.save();
                res.json(user);
            }
            genPassword()
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
    User.find({ email }).exec().then((users) => {
        const verifyPassword = async () => {
            const isMatch = await bcrypt.compare(password, users[0].password);
            if (isMatch == true) {
                const getToken = genToken(users)
                res.json({ "data": getToken });
                store('email', email);
            }
            else {
                res.json({ "data": "username or password incorrect" })
            }
        }
        verifyPassword()
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

    const genPassword = async () => {
        const passwordGen = updatedpasswordN
        const hashedPassword = await bcrypt.hash(passwordGen, 8)
        updatedpasswordN = hashedPassword
        let flag = 0;
        checkOTP.map((ta) => {
            if (email === ta[0] && OTP === ta[1]) {
                User.findOneAndUpdate({ email }, { password: updatedpasswordN }).exec().then((users) => {
                    if (users.length != 0) {
                        flag = 1;
                        res.json("ok");
                    }
                    // store('email',email);
                })
                    .catch((error) => {
                        console.log("Some Error encountered");
                    });
            }
        })
        if (flag === 1) {
            res.json("nn");
        }
    }
    
    genPassword();
})

module.exports = router;