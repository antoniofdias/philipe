const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['STUDENT', 'MONITOR', 'PROFESSOR', 'ADMIN'],
        default: 'STUDENT'
    }
})

module.exports = mongoose.model('User', userSchema, 'users');