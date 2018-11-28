const express = require('express');
const router = express.Router();

const Students = require('../models/Student');

//Route for getting all students registered in the progress tracker
router.get('/', (req, res) => {
    Students.find().then(students => {
        res.json(students)
    })
});

router.get('/:studentId', (req, res) => {
    Students.findOne({_id: req.params.studentId}).then(student => {
        res.json(student);
    })
});

router.put('/:studentId', (req, res) => {
    Students.findOneAndUpdate({_id: req.params.studentId}, req.body).then(student => {
        res.json(student)
    })
})

router.post('/', (req, res) => {
    Students.create(req.body).then(student => {
        res.json(student);
    })
})

router.delete('/:studentId', (req, res) => {
    Students.findOneAndDelete({_id: req.params.studentId}).then(student => {
        res.json(student)
    })
})
