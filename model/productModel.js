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
        type: Number,
        required: true,
    },
    picture: {
        type: String,
        default: null,
    },
    quantity: {
        type: Number,
        required: true,
    },
},
    {
        timestamps: true,
    })

module.exports = mongoose.model("Product", productSchema)