const mongoose = require('mongoose');;



const urlSchema = new mongoose.Schema({
    fullLink: {
        type: String,
        required: true
    },
    shortLink: {
        type: String,
        required: true
    },
    shortcode: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('shortLink', urlSchema);