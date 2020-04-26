const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    username: {type:String, required: true, unique: true},
    firstname: {type: String, required: false},
    lastname: {type: String, required: false},
    email: {type:String, required: true, unique: true},
    role: {type: Boolean, required: true, default: false},
    password: {type:String, required: true},
    city: {type:String, required: true},
    address: {type:String, required: true},
    zipcode: {type:Number, required: true},
});

userSchema.plugin(validator);

module.exports = mongoose.model('User',userSchema);