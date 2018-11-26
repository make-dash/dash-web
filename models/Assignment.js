const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Assignment', {
    name: String,
    description: String, 
    dueDate: Date,
    status: String
})
