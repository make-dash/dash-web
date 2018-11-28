//Import express and setup router
const express = require('express');
const router = express.Router();

//Import assignment model
const Assignment = require('../models/Assignment');

//GET all assignments
router.get('/', (req, res) => {
    Assignment.find().then(assignments => {
        res.status(200).render('assignments', {assignments: assignments})
    }).catch(err => {
        console.error(err);
        res.status(500).send('Internal server error occurred trying to retrieve all assignments')
    })
})

//GET the form for creating a new assignment
router.get('/new', (req, res) => {
    res.status(200).render('new-assignment')
});

//GET a specific assignment
router.get('/:assignmentId', (req, res) => {
    Assignment.findOne({_id: req.params.assignmentId}).then(assignment => {
        res.status(200).render('assignment', {assignment: assignment})
    }).catch(err => {
        console.error(err);
        res.status(500).send('Internal server error occurred trying to retrieve a single assignment');
    })
})

//POST a new assignment to the database and then render it
router.post('/', (req, res) => {
    Assignment.create(req.body).then(assignment => {
        res.status(200).render('assignment', {assignment: assignment})
    }).catch(err => {
        console.error(err);
        res.status(500).send('Internal server error occurred trying to create an assignment');
    })
})

//GET the form to update a specific form
router.get('/:assignmentId/update', (req, res) => {
    Assignment.findOne({_id: req.params.assignmentId}).then(assignment => {
        res.status(200).render('update-assignment', {assignment: assignment});
    }).catch(err => {
        console.error(err);
        res.status(500).send('Internal server error occurred trying to retrieve the form to update the assignment');
    })
})

//PUT an already existing assignment and then display it
router.put('/:assignmentId', (req, res) => {
    Assignment.findOneAndUpdate({_id: req.params.assignmentId}, req.body).then(assignment => {
        res.status(200).render('assignment', {assignment: assignment})
    }).catch(err => {
        console.error(err);
        res.status(500).send('Internal server error occurred trying to update a assignment');
    })
})

//DELETE an already existing assignment from the database and return to all the assignments
router.delete('/:assignmentId', (req, res) => {
    Assignment.findOneAndDelete({_id: req.params.assignmentId}, req.body).then(assignment => {
        res.status(200).render('assignments');
    }).catch(err => {
        console.error(err);
        res.status(500).send('Internal server error occurred trying to delete a assignment');
    })
})

module.exports = router;
