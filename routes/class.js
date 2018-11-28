//express imports
const express = require('express');
const router = express.Router();

//db imports
const mongoose = require('mongoose');
const Class = require('../models/Class')

//Route for viewing all classes
router.get('/', (req, res) => {
    Class.find().then(classes => {
        res.render('classes', {classes: classes})
    })
})

//Route for going to a specific class
router.get('/:classId', (req, res) => {
    Class.find({_id: req.params.classId}).then(targetedClass => {
        res.render('class', {class: targetedClass});
    })
})

//Route for updating information about a class
router.put('/:classId', (req, res) => {
    Class.findOneAndUpdate({_id: req.params.classId}, req.body).then(updatedClass => {
        res.render('class', {class: updatedClass})
    })
})

//Route for creating a class
router.post('/', (req, res) => {
    Class.create(req.body).then(newClass => {
        res.redirect('/dashboard');
    })
})

//Router for deleting a class
router.delete('/:classId', (req, res) => {
    Class.deleteOne({_id: req.params.classId}).then(deletedClass => {
        res.redirect('')
    })
})

module.exports = router;
