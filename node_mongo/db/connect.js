const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/user', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

module.exports = db