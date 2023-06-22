const express = require('express')
const router=express.Router();
const User=require('../models/User')
const store = require("store2");
// var bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');
// const JWT_SECRET="ronakismyname";
router.post('/createuser',async (req,res)=>{
    // console.log(req.body);
    const {email}=req.body;
    // var salt = bcrypt.genSaltSync(10);
    // const secPass=await bcrypt.hash(req.body.password,salt);
    // req.body.password=secPass;
    User.find({email}).exec().then((users)=>{
        if(users.length==0){
            const user=User(req.body);
            user.save();
            // const authToken=jwt.sign(user,JWT_SECRET);
            // console.log({authToken});
            // console.log(user);
            res.json(req.body);
        }
        else{
            console.log("User Already Exits");
        }
    })
    .catch((error) => {
        console.log("Some Error encountered");
    });   
})

router.post('/login',(req,res)=>{
    const {email,password}=req.body;
    User.find({email,password}).exec().then((users)=>{
        res.json(users);
        store('email',email);
    })
    .catch((error) => {
        console.log("Some Error encountered");
    });  
})

module.exports=router;