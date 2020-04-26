const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userid: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    products: [{
        productname: String,
        price: Number,
        quantity: Number
        }]
    ,
    paid: {type: Boolean, default: false}

});

module.exports = mongoose.model('Orders', orderSchema);