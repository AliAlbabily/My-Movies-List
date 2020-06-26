
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    profileObject: {
        imageUrl: { type: String },
        email: { type: String },
        name: {type: String }
    },
    tokenObject: {
        access_token: { type: String },
        expires_at: { type: Number }
    }
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;