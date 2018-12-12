const express = require('express');
const router = express.Router();
const Class = require('../models/Class')

//Main dashboard route
router.get('/', (req, res) => {
    Class.find().then(classes => {
        res.render('dashboard', {courses: classes, dash: {active: 'active', black: 'black'}})
    }).catch(err => {
        console.error(err);
        res.status(500).send('Internal error occurred tyring to render the dashboard')
    });
});

module.exports = router;
