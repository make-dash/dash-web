//import express and setup router
const express = require('express');
const router = express.Router({ mergeParams: true});

//Import our students model
const Students = require('../models/Student');
const Class = require('../models/Class');
//GET all students in JSON form (For potential future use)
router.get('/', (req, res) => {
    Students.find().then(students => {
        res.status(200).json(students)
    }).catch(err => {
        console.error(err);
        res.status(500).json({err: err.message})
    })
});

router.get('/new', (req, res) => {
    res.render('create-student', {course: {_id: req.params.classId}})
})
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
    Class.findOne({_id: req.params.classId}).then((currClass) => {
        const student = new Students(req.body);
        student.save();
        currClass.students.push(student)
        return currClass.save();
    })
    .then(currClass => {
        res.redirect(`/classes/${req.params.classId}`)
    })
    .catch(err => {
        res.status(500).json({err: err.message})
    })
  
})

//DELETE an existing student from our database and then return that student in JSON format
router.delete('/:studentId', (req, res) => {
    Students.findOneAndDelete({_id: req.params.studentId}).then(student => {
        console.log(student) 
        res.status(200).redirect(`/classes/${req.params.classId}`)
    }).catch(err => {
        console.error(err);
        res.status(500).json({err: err.message});
    })
})

module.exports = router;
