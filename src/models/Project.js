const mongoose = require('mongoose')

const projectModel = new mongoose.Schema({
    pjid: String,
    name: String,
    about: String,
    next: String,
    created: {
        type: Date,
        default: Date.now
    },
    finished: Boolean,
    supervisor: {
        type: Array,
        default: []
    },
    members: {
        type: Array,
        default: []
    }
}) 

module.exports = mongoose.model('Project', projectModel)