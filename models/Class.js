const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Class', {
    name: String,
    instructor: String,
    assignments: [{
        type: Schema.Types.ObjectId,
        ref: 'Assignment',
        default: []
    }],
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student',
        default: []
    }]
})

