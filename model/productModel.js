const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    })

module.exports = mongoose.model("product", contactSchema)