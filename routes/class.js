const express = require('express');
const router = express.Router();

//
const mongoose = require('mongoose');
const Class = require('../models/Class')

router.post('/', (req, res) => {
    Class.create(req.body).then(newClass => {
        res.redirect('/dashboard');
    })
})

router.delete('/:classId', (req, res) => {
    Class.deleteOne({_id: req.params.classId}).then(deletedClass => {
        res.redirect('')
    })
})
