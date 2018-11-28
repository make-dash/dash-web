//express imports
const express = require('express');
const router = express.Router();

//db imports
const mongoose = require('mongoose');
const Class = require('../models/Class')

const studentsRouter = require('./students');

//Route for viewing all classes
router.get('/', (req, res) => {
    Class.find().then(classes => {
        res.render('classes', {classes: classes})
    }).catch(err => {
        console.error(err) 
    })
})

//Route for going to a specific class
router.get('/:classId', (req, res) => {
    Class.find({_id: req.params.classId}).populate('assignments').populate('students').then(targetedClass => {
        res.render('class', {class: targetedClass});
    }).catch(err => {
        console.error(err)
    })
})

//Route for updating information about a class
router.put('/:classId', (req, res) => {
    Class.findOneAndUpdate({_id: req.params.classId}, req.body).populate('assignments').populate('students').then(updatedClass => {
        res.render('class', {class: updatedClass})
    }).catch(err => {
        console.error(err)
    })
})

//Route for creating a class
router.post('/', (req, res) => {
    Class.create(req.body).then(newClass => {
<<<<<<< Updated upstream
        res.status(200).redirect('/');
    }).catch(err => {
        console.error(err);
        res.status(500).send('Internal server error trying to create a new class')
=======
      console.log("Req.body:", req.body);
      console.log("Created class:", newClass);
        res.redirect('/');
>>>>>>> Stashed changes
    })
})

//Router for deleting a class
router.delete('/:classId', (req, res) => {
    Class.deleteOne({_id: req.params.classId}).then(deletedClass => {
        res.redirect('')
    }).catch(err => {
        console.error(err)
    })
})

//Route for getting students that belong to a specific class
router.get('/:classId/students', (req, res) => {
    Class.findOne({_id: req.params.studentId}).populate('students').then(currentClass => {
        res.json(currentClass);
    }).catch(err => {
        console.error(err)
    })
})

module.exports = router;
