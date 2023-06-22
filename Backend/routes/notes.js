const express = require('express')
const router = express.Router();
const Note = require('../models/Notes')
const User = require('../models/User');
const Notes = require('../models/Notes');

router.post('/createleave', (req, res) => {
    // console.log(req.body);
    const { email } = req.body;
    req.body.Status = "Pending";
    Note.find({ email }).exec().then((users) => {
        if (users.length == 0) {
            const Notes = Note(req.body);
            Notes.save();
            res.json(req.body);
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
router.get('/fetchAllNotes', (req, res) => {
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

module.exports = router;