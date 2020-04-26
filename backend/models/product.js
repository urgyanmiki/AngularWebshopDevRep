const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id: {type: String},
    name: {type: String, required: false},
    gender: {type: String, required: false},
    type: {type: String, required: false},
    imageurl: {type: String, required: false},
    price: {type: Number, required: false},
    quantity: {type: Number, required: false},
    description: {type: String, required: false},
    
});

module.exports = mongoose.model('Product',productSchema);