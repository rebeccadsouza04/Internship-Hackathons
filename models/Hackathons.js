const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HackSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true
    },
    Start_Date: {
        type: String,
        required: true
    },
    End_Date: {
        type: String,
        required: true
    },
    Participants_No: {
        type: String,
        required: true
    },
    Mode: {
        type: String,
        required: true
    },
    Hrefs: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('hackathons', HackSchema);