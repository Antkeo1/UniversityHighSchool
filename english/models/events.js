// for admin to add events for parents and other visitors to view
// it will have event info such as when, where, event name and a brief discription
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    where: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        
    },
    url2: {
        type: String,
        
    },
    url3: {
        type: String,
        
    },
    url4: {
        type: String,
        
    },
    url5: {
        type: String,
        
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

module.exports = mongoose.model("Event", eventSchema);