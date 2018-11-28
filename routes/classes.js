//express imports
const express = require('express');
const router = express.Router();

//db imports
const mongoose = require('mongoose');
const Class = require('../models/Class')

//GET all available classes
router.get('/', (req, res) => {
    Class.find().then(classes => {
        res.status(200).render('classes', {classes: classes})
    }).catch(err => {
        console.error(err)
        res.status(500).send('Internal server error occurred trying to get all available classes')
    })
})

//GET a specific class and all of the information from other models contained within
router.get('/:classId', (req, res) => {
    Class.find({_id: req.params.classId}).populate('assignments').populate('students').then(targetedClass => {
        res.status(200).render('class', {course: targetedClass});
    }).catch(err => {
        console.error(err)
        res.status(500).send('Internal server error occurred trying to get a specific class');
    })
})

//GET a form to create a new class
router.get('/new', (req, res) => {
   res.status(200).render('new-class');
});

//PUT a prexisting class and then redirect the user to that class
router.put('/:classId', (req, res) => {
    Class.findOneAndUpdate({_id: req.params.classId}, req.body).populate('assignments').populate('students').then(updatedClass => {
        res.status(200).redirect(`/${updatedClass._id}`);
    }).catch(err => {
        console.error(err);
        res.status(500).send('Internal server error occurred trying to update a class')
    })
})

//POST a new class to our db and then redirect the user to that class
router.post('/', (req, res) => {
    Class.create(req.body).then(newClass => {
        res.status(200).redirect(`/${newClass._id}`);
    }).catch(err => {
        console.error(err);
        res.status(500).send('Internal server error trying to create a new class')
    })
})

//DELETE a prexisting class within our db and then return the user back to all classes
router.delete('/:classId', (req, res) => {
    Class.deleteOne({_id: req.params.classId}).then(deletedClass => {
        res.status(200).redirect('/')
    }).catch(err => {
        console.error(err)
        res.status(500).send('Internal server error occurred trying to delete a class')
    })
})

//GET all students from a specific class in JSON format (for potential future use)
router.get('/:classId/students', (req, res) => {
    Class.findOne({_id: req.params.studentId}).populate('students').then(currentClass => {
        res.status(200).json(currentClass);
    }).catch(err => {
        console.error(err);
        res.status(500).send('Internal server error occurred trying to update a class');
    })
})

module.exports = router;
