const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    age: Number,
    email: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

var User = mongoose.model('user', userSchema);

module.exports = User