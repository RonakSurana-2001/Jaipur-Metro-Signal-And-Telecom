const express = require('express')
const router = express.Router();
const Note = require('../models/Notes')
const User = require('../models/User');
const Notes = require('../models/Notes');


const jwt = require('jsonwebtoken');
const {secretKey}=require('../.env')

var { genToken, validateToken } = require('../middleware/generateToken')


router.post('/createleave',validateToken, (req, res) => {
    // console.log(req.body);
    const validToken=jwt.verify(req.body.token,secretKey)
    const { email } = validToken.email;

    const data={
        email:validToken.email,
        name:req.body.name,
        Reason:req.body.Reason,
        Status:"Pending"
    }

    Note.find({ email }).exec().then((users) => {
        if (users.length == 0) {
            const Notes = Note(data);
            Notes.save();
            res.json(data);
        }
        else {
            console.log("Request Already Exits");
        }
    })
        .catch((error) => {
            console.log("Some Error encountered");
        });
})

router.post('/approveLeave', (req, res) => {
    if (req.body.Status !== "") {
        Note.findOneAndUpdate({ email: req.body.email }, { Status: req.body.Status }, { new: true })
            .then((updatedDocument) => {
                if (updatedDocument) {
                }
                else {
                    console.log('No document found matching the query');
                }
            })
    }
})

//Fetch All Notes
router.post('/fetchAllNotes',validateToken, (req, res) => {
    Note.find({}).exec().then((users) => {
        res.json(users);
    })
        .catch((error) => {
            console.log("Some Error encountered");
        })
})


router.post('/rejectRequest', (req, res) => {
    const { email } = req.body;
    Note.findOneAndDelete({ email: email }).then((deletedDocument)=>{
        // console.log(deletedDocument);
    })
    .catch((error)=>{
        console.log(error);
    })
})

router.post('/getEmail', (req, res) => {
    const validToken=jwt.verify(req.body.token,secretKey)
    res.json({"email":validToken.email})
})

module.exports = router;