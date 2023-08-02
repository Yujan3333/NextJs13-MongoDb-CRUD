const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
},{timestamps: true});

mongoose.models ={};

export default mongoose.model('Address', AddressSchema);