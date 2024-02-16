const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    names: [
        {
            type: String,
            required: true
        },
    ],

    users: [
        {
            name: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
        },
    ],

    dateOrder: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Order", orderSchema)
