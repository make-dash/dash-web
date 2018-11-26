const express = require('express');
const router = express.Router();
const Class = require('../models/Class')

//Main dashboard route
router.get('/', (req, res) => {
    Class.find().then(classes => {
        res.render('dashboard', {classes: classes})
    }) 
})

//Class view
router.get('/:classId', (req, res) => {
    Class.findById(req.params.classId).populate('assignments').then(selectedClass => {
        res.render('class-view', selectedClass)
    })
})

module.exports = router;
