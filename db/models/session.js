const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer',
        required: true,
        trim: true
    },
    accessToken: {
        type: String,
        required: true,
        trim: true
    },
    accessTime:{
        type: Number,
        required: true
    },
    refreshToken: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps : true});

sessionSchema.index({userId: 1});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;