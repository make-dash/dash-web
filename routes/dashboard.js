const express = require('express');
const router = express.Router();
const Class = require('../models/Class')

//Main dashboard route
router.get('/', (req, res) => {
    Class.find().then(classes => {
        res.render('dashboard', {classes: classes})
    }).catch(err => {
        console.error(err)
    });
});

//Get a specific class and then display it
router.get('/:classId', (req, res) => {
    Class.findById(req.params.classId).populate('assignments').then(selectedClass => {
        res.render('class-view', selectedClass)
    }).catch(err => {
        console.error(err);
    });
});

module.exports = router;
