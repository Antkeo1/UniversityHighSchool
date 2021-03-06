const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const admissionSchema = new mongoose.Schema({
    title: {
        type: String,       
    },
    uploadedBy: {
        type: ObjectId,
        ref: "User"
    },
    comments: [
        {
            text: String,
            url: String,
            created: {
                type: Date,
                default: Date.now
            },
            updated: {
                type: Date,
                default: Date.now
            },
            uploadedBy: {
                type: ObjectId,
                ref: 'User'
            }
        }
    ]
})

module.exports = mongoose.model("Admission", admissionSchema);