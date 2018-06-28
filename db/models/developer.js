const mongoose = require('mongoose');
const {password, validateEmail, checkPassword} = require('db/models_methods/developer');

const developerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        index: true
    },
    lastName: {
        type: String,
        index: true
    },
    company: {
        type: String
    },
    country: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        index: true,
    },
    passwordHash: String,
    salt: String,
    verify: {
        type: Boolean,
        default: false
    },
    recoveryToken: {
        type: String,
        default: null
    },
    status: {
        type: Number,
        default: 0
    },
    deleted: {
        type: Boolean,
        default: false
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }]

}, {
    timestamps: true,
    ensureIndex: true
});

developerSchema.virtual('password').set(password);

developerSchema.methods.checkPassword = checkPassword;

module.exports = mongoose.model('Developer', developerSchema);