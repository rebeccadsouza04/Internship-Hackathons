const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrefSchema = new Schema({
    preference1: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('preference', PrefSchema);
