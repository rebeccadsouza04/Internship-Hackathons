const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IntSchema = new Schema({
    index: {
        type: String,
        required: true
    },
    Internhsip_Category: {
        type: String,
        required: true
    },
    Company_name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    Start_Date: {
        type: String,
        required: true
    },
    Duration: {
        type: String,
        required: true
    },
    Stipend: {
        type: String,
        required: true
    },
    Apply_By: {
        type: String,
        required: true
    },
    Keywords: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('internships', IntSchema);