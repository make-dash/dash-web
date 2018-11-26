//express imports
const express = require('express');
const router = express.Router();

//db imports
const mongoose = require('mongoose');
const Class = require('../models/Class')

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
