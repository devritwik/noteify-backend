const express = require('express');
const router = express.Router();
const noteHandler = require('../db/crud.js');


router.post('/insert', (req, res)=>{
    noteHandler.insertNote(req,res);
    //res.json(req.body);
})

router.get('/getNotes/:userID', (req, res)=>{
    noteHandler.getNotes(req, res);
});

router.delete('/delete/:noteID', (req, res)=>{
    noteHandler.deleteNote(req, res);
})

router.put('/updateNote/:noteID', (req, res)=>{
    noteHandler.updateNote(req, res);
})

module.exports = router;




