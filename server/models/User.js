const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    local: {
        username: {
            type: String,
        },
        mail: {
            type: String,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
        }
    },
    google: {
        id: { type: String },
        name: { type: String },
    },
    facebook: {
        id: { type: String },
        name: { type: String },
    }
})

module.exports = mongoose.model('User', UserSchema);
