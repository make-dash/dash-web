const express = require('express');
const router = express.Router();
const Class = require('../models/Class')

//Main dashboard route
router.get('/', (req, res) => {
    Class.find().then(classes => {
        res.render('dashboard', {courses: classes})
    }).catch(err => {
        console.error(err)
    });
});

module.exports = router;
