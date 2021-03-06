const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var foodSchema = new Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    desc: { type: String, required: true },
    typename: { type: String, required: true },
    typeid: { type: Number, required: true },
    img: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

var Food = mongoose.model('foods', foodSchema);

module.exports = Food