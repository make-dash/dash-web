const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Student model for keeping track of students
module.exports = mongoose.model('Student', {
    name: String,
    year: String,
    studentId: Number,
    status: Number,
    classes: [{type: Schema.Types.ObjectId, ref: 'Class'}],
    assignments: [{type: Schema.Types.ObjectId, ref: 'Assignment'}]
})
