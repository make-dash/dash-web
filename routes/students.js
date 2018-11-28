//import express and setup router
const express = require('express');
const router = express.Router();

//Import our students model
const Students = require('../models/Student');

//GET all students in JSON form (For potential future use)
router.get('/', (req, res) => {
    Students.find().then(students => {
        res.status(200).json(students)
    }).catch(err => {
        console.error(err);
        res.status(500).json({err: err.message})
    })
});

//GET a specific student in JSON format (For potential future use)
router.get('/:studentId', (req, res) => {
    Students.findOne({_id: req.params.studentId}).then(student => {
        res.status(200).json(student);
    }).catch(err => {
        console.error(err);
        res.status(500).json({err: err.message})
    })
});

//PUT an already existing student in our database and then return that student in JSON format
router.put('/:studentId', (req, res) => {
    Students.findOneAndUpdate({_id: req.params.studentId}, req.body).then(student => {
        res.status(200).json(student)
    }).catch(err => {
        console.error(err);
        res.status(500).json({err: err.message});
    })
})

//POST a new student to our database and then return that student in JSON format 
router.post('/', (req, res) => {
    Students.create(req.body).then(student => {
        res.status(200).json(student);
    })
})

router.delete('/:studentId', (req, res) => {
    Students.findOneAndDelete({_id: req.params.studentId}).then(student => {
        res.json(student)
    })
})

module.exports = router;
