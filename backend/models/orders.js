const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    userid: {type: String},
    username: {type: String},
    products: { type: String},
    finalamount: {type: Number},

});

module.exports = mongoose.model('Order', ordersSchema);