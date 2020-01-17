const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const spanishaboutSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
})

module.exports = mongoose.model("SpanishAbout", spanishaboutSchema);